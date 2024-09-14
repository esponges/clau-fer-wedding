'use client';

import { IKImage } from 'imagekitio-react';

export function Gifts() {
  return (
    <div className='max-w-6xl mx-auto px-4'>
      <h2 className='text-4xl font-bold text-center mb-10'>Mesa de Regalos</h2>
      <div className='mb-4'>
        <IKImage
          urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL}
          path={'/gift.png'}
          className='mx-auto'
          transformation={[{ width: '100', height: '100' }]}
          height={100}
          width={100}
          loading='lazy'
          alt='Gift'
        />
      </div>
      <h3 className='text-2xl font-semibold mb-4'>
        La mesa de regalos es la 12345678
      </h3>
    </div>
  );
}
