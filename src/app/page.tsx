import Image from 'next/image';
import { ConfirmButton } from './components/confirm-button';

const INVITEE_NAME = 'Paquilla';

export default function Home() {
  async function confirmRsvp(formData: FormData) {
    'use server';

    const rsvp = formData.get('rsvp') as string; 
    const res = await new Promise((resolve) => setTimeout(() => {
      resolve(Math.random() < 0.5 ? 'OK' : 'NOK');
    }, 5000));

    if (res === 'OK') {
      console.log('Gracias por confirmar tu asistencia' + INVITEE_NAME + rsvp);
    } else {
      console.log('No pudimos confirmar tu asistencia' + INVITEE_NAME + rsvp);
    }
  }

  return (
    <main>
      {/* Hero Section */}
      <section className='relative h-screen flex items-center justify-center'>
        <div
          className='absolute inset-0 bg-cover bg-center'
          style={{ backgroundImage: "url('/couple-image.jpg')" }}
        ></div>
        <div className='absolute inset-0 bg-black opacity-50'></div>
        <div className='relative z-10 text-center text-white'>
          <h1 className='text-5xl font-bold mb-4'>Claudia & Fer</h1>
          <h2 className='text-3xl font-bold mb-4'>18/11/2023</h2>
          <p className='text-2xl mb-8'>¡Nos casamos!</p>
          {/* greet the invitee */}
          <p className='text-2xl mb-8'>
            ¿Nos acompañarías {INVITEE_NAME}?
          </p>
          <a
            href='#rsvp'
            className='bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition duration-300'
          >
            Confirma tu asistencia
          </a>
        </div>
      </section>

      {/* RSVP Form Section */}
      <section id='rsvp' className='py-20 bg-white'>
        <div className='max-w-3xl mx-auto px-4'>
          <h2 className='text-4xl font-bold text-center mb-10'>
            Will you attend our wedding?
          </h2>
          <form className='space-y-6' action={confirmRsvp}>
            {/* Dropdown with yes or no */}
            <div>
              <label
                htmlFor='rsvp'
                className='block text-sm font-medium text-gray-700 max-w-[300px] mx-auto'
              >
                Will you attend?
              </label>
              <select
                id='rsvp'
                name='rsvp'
                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 max-w-[300px] mx-auto'
              >
                <option value='yes'>Yes</option>
                <option value='no'>No</option>
              </select>
            </div>
            {/* <div>
              <label
                htmlFor='name'
                className='block text-sm font-medium text-gray-700'
              >
                Full Name
              </label>
              <input
                type='text'
                id='name'
                name='name'
                required
                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
              />
            </div>
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700'
              >
                Email Address
              </label>
              <input
                type='email'
                id='email'
                name='email'
                required
                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
              />
            </div> */}
            <ConfirmButton />
          </form>
        </div>
      </section>
    </main>
  );
}
