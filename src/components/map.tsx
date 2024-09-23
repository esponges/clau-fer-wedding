export function Map() {
  return (
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
  );
}
