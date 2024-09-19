import { redirect } from 'next/navigation';
import postgres from 'postgres';
import nodemailer from 'nodemailer';
import Image from 'next/image';

import { ConfirmButton } from '../components/confirm-button';
import { CountDown } from '@/components/countdown';
import Carousel from '@/components/carousel';
import { Gifts } from '@/components/gifts';

const GUEST_NAME = '';

type GuestData = {
  id: string;
  name: string;
  status: 'pending' | 'rejected' | 'confirmed';
  pax: number;
  new_id: number;
};

async function getGuestData(id?: string): Promise<GuestData | null> {
  'use server';

  if (!id) {
    return null;
  }

  try {
    const sqlClient = postgres(process.env.POSTGRES_DB_CONNECTION_STRING || '');

    const data = await sqlClient`
      SELECT * FROM guests
      WHERE new_id = ${id}
    `;

    const guest = data[0] as GuestData;

    // transform to capitalized only the first letter
    const name = guest.name
      .split(' ')
      .map((word) => word !== 'Y' ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() : word.toLowerCase())
      .join(' ');

    return {
      ...guest,
      name,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function confirmRsvp(formData: FormData) {
  'use server';

  const rsvp = formData.get('rsvp') as string;
  const status = rsvp === 'yes' ? 'confirmed' : 'rejected';
  const id = formData.get('id') as string;
  const guest = formData.get('guest') as string;

  let redirectUrl = '';
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
    redirectUrl = `/thank-you?guest=${id}&name=${guest}`;
  } catch (error) {
    console.error(error);
    redirectUrl = '/oops?guest=' + id;
  } finally {
    // redirection in server components must be done through the `finally` block
    // https://stackoverflow.com/a/77738506/13772033
    redirect(redirectUrl);
  }
}

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const guestId = searchParams['guest'] || GUEST_NAME;
  const guestData = await getGuestData(guestId);

  return (
    <main className='font-dancing'>
      <section className='relative h-screen flex items-end justify-center overflow-hidden pb-16'>
        <Image
          src='/img/couple-2.jpg'
          alt='Couple background'
          fill
          objectFit='cover'
          quality={100}
          priority
          className='z-0'
        />
        <div className='absolute inset-0 bg-black opacity-20 z-10'></div>
        <div className='relative z-20 text-center text-white max-w-3xl px-4'>
          <h1 className='text-4xl font-bold mb-4'>Claudia & Fer</h1>
          <h2 className='text-xl font-bold mb-4'>23/11/2024</h2>
          <p className='md:text-5xl text-2xl'>¡Nos casamos!</p>
          <div className='max-w-6xl mx-auto px-4'>
            <CountDown date={new Date('2024-11-23T19:00:00')} />
          </div>
          {guestData?.name ? (
            <p className='text-2xl mb-8'>
              ¿Nos acompañaría{(guestData.pax || 0) > 1 ? 'n' : 's'}{' '}
              {guestData.name}?
            </p>
          ) : null}
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
      <section
        id='rsvp'
        className={`py-20 bg-white ${!guestData?.name ? 'hidden' : ''}`}
      >
        <div className='max-w-3xl mx-auto px-4'>
          <h2 className='text-4xl font-bold text-center'>{guestData?.name}</h2>
          <h2 className='text-2xl mt-4 font-bold text-center mb-10'>
            {guestData && guestData.pax > 1
              ? `${guestData?.pax} pases`
              : '1 pase'}
          </h2>
          <h3 className='text-md font-bold text-center mb-10'>
            * No niños
          </h3>
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
      <section className='relative h-screen flex items-end justify-center overflow-hidden pt-24'>
        <Image
          src='/img/couple-4.jpg'
          alt='Couple smilling'
          layout='fill'
          objectFit='cover'
          quality={100}
          loading='lazy'
          className='z-0'
        />
        <div className='absolute inset-0 z-10'></div>
        <div className='relative z-20 text-center text-white max-w-3xl px-4'>
          <h1 className='text-2xl font-bold mb-12'>
            Cuando te das cuenta de que quieres pasar el resto de tu vida con
            alguien, deseas que el resto de tu vida empiece lo antes posible.
          </h1>
        </div>
      </section>
      <section id='venue' className='py-20 bg-gray-50'>
        <div className='max-w-6xl mx-auto px-4'>
          <h2 className='text-4xl font-bold text-center mb-10'>Locación</h2>
          <div className='flex flex-col md:flex-row gap-8 items-center font-sans'>
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
                <strong>Horario:</strong> 5:30 PM - 01:00 AM
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
      <section id='gift' className='py-20 bg-gray-200 text-center font-sans'>
        <Gifts />
      </section>
      <section id='dress-code' className='bg-gray-50'>
        <div className='max-w-6xl mx-auto px-4 py-12'>
          <h2 className='text-4xl font-bold text-center mb-10'>
            Dresscode
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            <div className='text-center'>
              <h3 className='text-3xl font-semibold mb-4'>Mujeres</h3>
              <div className='mb-4'>
                <Image
                  src='/img/dress-code-women.jpg'
                  alt='Women dress code'
                  width={200}
                  height={200}
                  loading='lazy'
                  className='rounded-lg shadow-lg mx-auto'
                />
              </div>
              <h3 className='text-xl font-semibold mb-4'>Vestido largo</h3>
            </div>
            <div className='text-center'>
              <h3 className='text-3xl font-semibold mb-4'>Hombres</h3>
              <div className='mb-4'>
                <Image
                  src='/img/dress-code-men.jpg'
                  alt='Men dress code'
                  width={200}
                  height={200}
                  loading='lazy'
                  className='rounded-lg shadow-lg mx-auto'
                />
              </div>
              <h3 className='text-xl font-semibold mb-4'>Traje con corbata</h3>
            </div>
          </div>
        </div>
      </section>
      <section id='gallery' className='pb-20 bg-gray-50'>
        <div className='md:container mx-auto md:px-4'>
          <Carousel />
        </div>
      </section>
    </main>
  );
}
