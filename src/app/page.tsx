import { redirect } from 'next/navigation';
import postgres from 'postgres';
import nodemailer from 'nodemailer';
import Image from 'next/image';

import { ConfirmButton } from '../components/confirm-button';
import { CountDown } from '@/components/countdown';
import Carousel from '@/components/carousel';

const GUEST_NAME = '';

type GuestData = {
  id: string;
  name: string;
  status: 'pending' | 'rejected' | 'confirmed';
  pax: number;
};

async function getGuestData(uuid?: string): Promise<GuestData | null> {
  'use server';

  if (!uuid) {
    return null;
  }

  try {
    const sqlClient = postgres(process.env.POSTGRES_DB_CONNECTION_STRING || '');

    const data = await sqlClient`
      SELECT * FROM guests
      WHERE id = ${uuid}
    `;

    const guest = data[0] as GuestData;

    return guest;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const guestId = searchParams['guest'] || GUEST_NAME;
  const guestData = await getGuestData(guestId);

  console.log({ guestData });

  async function confirmRsvp(formData: FormData) {
    'use server';

    const rsvp = formData.get('rsvp') as string;
    const status = rsvp === 'yes' ? 'confirmed' : 'rejected';
    const id = formData.get('id') as string;
    const guest = formData.get('guest') as string;

    let redirectPath: string = '';
    try {
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_APP_PASS,
        },
      });

      const mailOptions = {
        from: 'clau-y-fer@gmail.com',
        to:
          process.env.CONFIRMATION_EMAIL?.split(';') || process.env.GMAIL_USER,
        subject: status === 'confirmed' ? 'RSVP Confirmada' : 'RSVP Rechazada',
        text:
          status === 'confirmed'
            ? `${guest} ha confirmado su invitación`
            : `${guest} ha rechazado su invitación`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

      const sqlClient = postgres(
        process.env.POSTGRES_DB_CONNECTION_STRING || ''
      );
      await sqlClient`
        UPDATE guests
        SET status = ${status}
        WHERE id = ${id}
      `;

      console.log('Upserted ' + id);
      redirectPath = `/thank-you?guest=${id}&status=${status}`;
    } catch (error) {
      console.error(error);
      redirectPath = '/oops?guest=' + id;
    } finally {
      redirect(redirectPath);
    }
  }

  return (
    <main className='font-custom'>
      <section className='relative h-screen flex items-center justify-center overflow-hidden'>
        <Image
          src='/couple.jpg'
          alt='Couple background'
          layout='fill'
          objectFit='cover'
          quality={100}
          // visible during the first load
          priority
          className='z-0'
        />
        <div className='absolute inset-0 bg-black opacity-50 z-10'></div>
        <div className='relative z-20 text-center text-white max-w-3xl px-4'>
          <h1 className='text-5xl font-bold mb-4'>Claudia & Fer</h1>
          <h2 className='text-3xl font-bold mb-4'>23/11/2024</h2>
          <p className='text-2xl mb-8'>¡Nos casamos!</p>
          <p className='text-2xl mb-8'>
            ¿Nos acompañaría{(guestData?.pax || 0) > 1 ? 'n' : 's'}{' '}
            {guestData?.name}?
          </p>
          {guestData?.name && (
            <a
              href='#rsvp'
              className='bg-amber-200 text-black px-8 py-3 rounded-full 
                       font-semibold hover:bg-opacity-90 transition duration-300 inline-block'
            >
              Confirma tu asistencia
            </a>
          )}
        </div>
      </section>
      <section id='countdown' className='py-20 bg-gray-100'>
        <div className='max-w-6xl mx-auto px-4'>
          <CountDown date={new Date('2024-11-23T19:00:00')} />
        </div>
      </section>
      <section
        id='rsvp'
        className={`py-20 bg-white ${!guestData?.name ? 'hidden' : ''}`}
      >
        <div className='max-w-3xl mx-auto px-4'>
          <h2 className='text-4xl font-bold text-center'>Claudia & Fer</h2>
          <h2 className='text-2xl font-bold text-center mb-10'>23/11/2024</h2>
          <form className='space-y-6' action={confirmRsvp}>
            <input
              type='hidden'
              name='id'
              value={guestData?.id}
              className='hidden'
            />
            <input
              type='hidden'
              name='guest'
              value={guestData?.name}
              className='hidden'
            />
            <div>
              <label
                htmlFor='rsvp'
                className='block text-sm font-medium text-gray-700 max-w-[300px] mx-auto'
              >
                ¿Asistirás?
              </label>
              <select
                id='rsvp'
                name='rsvp'
                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 max-w-[300px] mx-auto'
              >
                <option value='yes'>Sí</option>
                <option value='no'>Lo siento, no podré</option>
              </select>
            </div>
            <ConfirmButton />
          </form>
        </div>
      </section>
      <section id='gallery' className='py-20 bg-gray-50'>
        <div className='mx-auto px-4'>
          <Carousel />
        </div>
      </section>
      <section id='venue' className='py-20 bg-gray-50'>
        <div className='max-w-6xl mx-auto px-4'>
          <h2 className='text-4xl font-bold text-center mb-10'>
            Locación
          </h2>
          <div className='flex flex-col md:flex-row gap-8 items-center'>
            <div className='md:w-1/2'>
              <h3 className='text-2xl font-semibold mb-4'>La Veta Eventos</h3>
              <p className='mb-4'>
                C. Volcán Ajusco 4830, Colli Urbano, 45070 Zapopan, Jal.
              </p>
              <p className='mb-4'>
                {/* Join us for a magical evening at The Grand Ballroom, where we'll
                exchange vows and celebrate our love with friends and family. */}
                Acompáñanos a una gran noche en La Veta Eventos.
              </p>
              <p className='mb-4'>
                <strong>Fecha:</strong> 23 de Noviembre, 2024
                <br />
                <strong>Horario:</strong> 5:00 PM - 11:00 PM
              </p>
            </div>
            <div className='md:w-1/2 px-4'>
              <iframe
                width='100%'
                height='450'
                loading='lazy'
                allowFullScreen
                className='rounded-lg shadow-lg mx-auto'
                src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
                  &q=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_WEDDING_LOCATION}`}
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
