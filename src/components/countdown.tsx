export function CountDown({ date }: { date: Date }) {
  const toMexicoLocale = date.toLocaleString('es-MX', {
    timeZone: 'America/Mexico_City',
  });

  return (
    <div className='bg-white shadow-lg rounded-lg p-6 max-w-2xl mx-auto'>
      <h2 className='text-3xl font-bold text-center text-gray-800 mb-6'>
        Countdown to Our Big Day
      </h2>
      <div className='flex text-2xl justify-center'>
        {toMexicoLocale}
        <span className='ml-4 text-indigo-600'>Till Big Day!</span>
      </div>
    </div>
  );
}
