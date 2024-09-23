import Image from "next/image";

export function DressCode() {
  return (
    <div className='max-w-6xl mx-auto px-4 py-12'>
      <h2 className='text-4xl font-bold text-center mb-10'>Dresscode</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        <div className='text-center'>
          <h3 className='text-3xl font-semibold mb-4'>Mujeres</h3>
          <div className='mb-4'>
            <Image
              src='/img/dress-code-women.jpg'
              alt='Women dress code'
              width={200}
              height={200}
              loading='lazy'
              className='rounded-lg shadow-lg mx-auto'
            />
          </div>
          <h3 className='text-xl font-semibold mb-4'>Vestido largo</h3>
        </div>
        <div className='text-center'>
          <h3 className='text-3xl font-semibold mb-4'>Hombres</h3>
          <div className='mb-4'>
            <Image
              src='/img/dress-code-men.jpg'
              alt='Men dress code'
              width={200}
              height={200}
              loading='lazy'
              className='rounded-lg shadow-lg mx-auto'
            />
          </div>
          <h3 className='text-xl font-semibold mb-4'>Traje con corbata</h3>
        </div>
      </div>
    </div>
  );
}
