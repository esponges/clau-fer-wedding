import Head from 'next/head';
import Link from 'next/link';

export default function ThankYou({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const guestName = searchParams['name'];
  const guestId = searchParams['guest'];

  return (
    <main>
      <div className='min-h-screen bg-gray-100 flex flex-col justify-center items-center font-dancing'>
        <Head>
          <title>¡Gracias! | Nuestra Boda</title>
          <link rel='icon' href='/favicon.ico' />
        </Head>

        <main className='text-center px-4'>
          <div className='bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto'>
            <h1 className='text-4xl font-bold text-gray-800 mb-4'>
              ¡Gracias {guestName}!
            </h1>
            <p className='text-xl text-gray-600 mb-6'>
              Hemos recibido tu confirmación. ¡Nos vemos pronto!
            </p>
            <div className='mb-8'>
              <svg
                className='w-16 h-16 text-green-500 mx-auto'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
            </div>
            <p className='text-gray-600 mb-6'>
              Seguiremos en contacto para más detalles.
            </p>
            <Link
              href={`/?guest=${guestId}`}
              className='inline-block bg-amber-400 text-white px-6 py-3 rounded-full font-semibold hover:bg-amber-700 transition duration-300'
            >
              Regresar
            </Link>
          </div>
        </main>

        <footer className='mt-8 text-center text-gray-500'>
          <p>&copy; 2024 Claudia & Fer.</p>
        </footer>
      </div>
    </main>
  );
}
