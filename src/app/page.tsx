import { redirect } from 'next/navigation';
import { ConfirmButton } from '../components/confirm-button';

const GUEST_NAME = '';

export default function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const guestName = searchParams['guest'] || GUEST_NAME;
  async function confirmRsvp(formData: FormData) {
    'use server';

    const rsvp = formData.get('rsvp') as string;
    // call database mock
    const res = await new Promise((resolve) =>
      setTimeout(() => {
        resolve(Math.random() < 0.5 ? 'OK' : 'NOK');
      }, 1000)
    );

    if (res === 'OK') {
      console.log('Gracias por confirmar tu asistencia' + guestName + rsvp);
      redirect('/thank-you?guest=' + guestName);
    } else {
      console.log('No pudimos confirmar tu asistencia' + guestName + rsvp);
      redirect('/oops?guest=' + guestName);
    }
  }

  return (
    <main className='font-custom'>
      <section className='relative h-screen flex items-center justify-center'>
        <div
          className='absolute inset-0 bg-cover bg-center'
          style={{ backgroundImage: "url('/couple.jpg')" }}
        ></div>
        <div className='absolute inset-0 bg-black opacity-50'></div>
        <div className='relative z-10 text-center text-white'>
          <h1 className='text-5xl font-bold mb-4'>Claudia & Fer</h1>
          <h2 className='text-3xl font-bold mb-4'>23/11/2024</h2>
          <p className='text-2xl mb-8'>¡Nos casamos!</p>
          <p className='text-2xl mb-8'>¿Nos acompañarías {guestName}?</p>
          <a
            href='#rsvp'
            className={`bg-amber-200 text-black px-8 py-3 rounded-full
              ${!guestName ? 'hidden' : ''} 
              font-semibold hover:bg-opacity-90 transition duration-300`}
          >
            Confirma tu asistencia
          </a>
        </div>
      </section>
      <section
        id='rsvp'
        className={`py-20 bg-white ${!guestName ? 'hidden' : ''}`}
      >
        <div className='max-w-3xl mx-auto px-4'>
          <h2 className='text-4xl font-bold text-center'>Claudia & Fer</h2>
          <h2 className='text-2xl font-bold text-center mb-10'>23/11/2024</h2>
          <form className='space-y-6' action={confirmRsvp}>
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
      <section id='venue' className='py-20 bg-gray-50'>
        <div className='max-w-6xl mx-auto px-4'>
          <h2 className='text-4xl font-bold text-center mb-10'>
            Wedding Venue
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
