import Head from 'next/head';
import Link from 'next/link';

export default function Oops({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const guestName = searchParams['guest'];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <Head>
        <title>Oops! Something went wrong | Our Wedding Invitation</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="text-center px-4">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto">
          <h1 className="text-4xl font-bold text-red-600 mb-4">Oops!</h1>
          <p className="text-xl text-gray-600 mb-6">
            Something went wrong while processing your RSVP.
          </p>
          <div className="mb-8">
            <svg className="w-16 h-16 text-red-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-gray-600 mb-6">
            Were sorry for the inconvenience. Please try again later or contact us directly.
          </p>
          <div className="space-y-4">
            <Link href={`/?guest=${guestName}`} className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-indigo-700 transition duration-300">
              Back to Home
            </Link>
            <p className="text-gray-500">
              If the problem persists, please email us at <a href="mailto:contact@janeandjohn.com" className="text-indigo-600 hover:underline">contact@janeandjohn.com</a>
            </p>
          </div>
        </div>
      </main>

      <footer className="mt-8 text-center text-gray-500">
        <p>&copy; 2024 Jane & Johns Wedding. All rights reserved.</p>
      </footer>
    </div>
  );
}
