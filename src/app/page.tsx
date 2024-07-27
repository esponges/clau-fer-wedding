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
    <main>
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
            className='bg-amber-200 text-black px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition duration-300'
          >
            Confirma tu asistencia
          </a>
        </div>
      </section>
      <section id='rsvp' className='py-20 bg-white'>
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
    </main>
  );
}
