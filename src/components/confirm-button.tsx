'use client';

import { useFormStatus } from 'react-dom';

export function ConfirmButton() {
  const { pending } = useFormStatus();

  return (
    <div className='flex justify-center space-x-4'>
      <button
        type='submit'
        disabled={pending}
        className='bg-amber-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-green-600 transition duration-300'
      >
        {pending ? 'Confirmando...' : 'Confirma RSVP'}
      </button>
    </div>
  );
}
