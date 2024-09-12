'use client';

import React from 'react';
import Slider, { type Settings } from 'react-slick';
import { IKImage } from 'imagekitio-react';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PATHS = ['/cyf-4.jpeg', '/cyf-1.jpeg', '/cyf-2.jpeg', '/cyf-3.jpeg'];

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
      <Slider {...settings}>
        {PATHS.map((_, index) => (
          <div key={index} className='md:px-10'>
            <IKImage
              urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL}
              path={PATHS[index]}
              className='md:max-h-[100vh] object-cover object-[center_top]'
              transformation={[{ width: '1600', height: '1200'}]}
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
