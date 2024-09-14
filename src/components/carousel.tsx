'use client';

import React from 'react';
import Slider, { type Settings } from 'react-slick';
import { IKImage } from 'imagekitio-react';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const PATHS = [
  '/carousel-4.jpg',
  '/carousel-1.jpg',
  '/carousel-2.jpg',
  '/carousel-3.jpg',
];

const Carousel = () => {
  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className='w-full'>
      <IKImage
        urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL}
        path='full-sized.jpg'
        className='md:max-h-[100vh] p-10 object-cover object-[center_bottom]' 
        transformation={[{ width: '1200', height: '1600' }]}
        width={1200}
        height={1600}
        loading='lazy'
        alt='Clau&fer-full-sized'
      />
      <Slider {...settings}>
        {PATHS.map((_, index) => (
          <div key={index} className='md:px-10'>
            <IKImage
              urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL}
              path={PATHS[index]}
              className='md:max-h-[100vh] object-cover object-[center_top]'
              transformation={[{ width: '1600', height: '1200' }]}
              height={1200}
              width={1600}
              loading={index > 0 ? 'lazy' : undefined}
              alt={`Clau&fer-${index + 1}`}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
