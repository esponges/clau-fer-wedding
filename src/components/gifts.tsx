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
      <h3 className='text-2xl md:w-1/2 mx-auto font-semibold mb-4'>
        Para nosotros tu presencia es nuestro mejor regalo, pero si deseas
        hacernos   un obsequio, aquí está nuestro número de cuenta: <br /><br />
        
        BBVA<br />
        Cuenta: 287 888 4897 <br />
        CLABE: 012 320 02878884897 5
      </h3>
    </div>
  );
}
