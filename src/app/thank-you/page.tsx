import Head from 'next/head';
import Link from 'next/link';

export default function ThankYou() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <Head>
        <title>Thank You | Our Wedding Invitation</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="text-center px-4">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Thank You!</h1>
          <p className="text-xl text-gray-600 mb-6">
            Weve received your RSVP and were excited to celebrate our special day with you.
          </p>
          <div className="mb-8">
            <svg className="w-16 h-16 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>k
          </div>
          <p className="text-gray-600 mb-6">
            Well be in touch with more details as the big day approaches.
          </p>
          <Link href="/" className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-indigo-700 transition duration-300">
            Back to Home
          </Link>
        </div>
      </main>

      <footer className="mt-8 text-center text-gray-500">
        <p>&copy; 2024 Jane & Johns Wedding. All rights reserved.</p>
      </footer>
    </div>
  );
}
