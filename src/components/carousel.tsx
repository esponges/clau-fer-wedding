"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import { FixedSizeList as List } from 'react-window';
import { useInView } from 'react-intersection-observer';
import { IKImage } from "imagekitio-react";

const ImageItem = ({ src, index }: { src: string; index: number }) => {
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  return (
    <div ref={ref}>
      {inView ? (
        <IKImage
          urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL}
          path={src}
          transformation={[{ crop: 'fill' }]}
          height={300}
          width={300}
          alt={`Product ${index + 1}`}
        />
      ) : (
        <div className="w-full h-full bg-gray-200 animate-pulse" />
      )}
    </div>
  );
};

const paths = [
  '/cyf-1.jpeg',
  '/cyf-2.jpeg',
  '/cyf-3.jpeg',
]

const Carousel = ({ images = paths, maxSlidesToShow = 5, breakpoints = [] }: {
  images?: string[],
  maxSlidesToShow?: number,
  breakpoints?: { width: number, slides: number }[],
}) => {
  const [slidesToShow, setSlidesToShow] = useState(maxSlidesToShow);
  const [componentWidth, setComponentWidth] = useState(0);

  const defaultBreakpoints = [
    { width: 640, slides: 1 },
    { width: 768, slides: 2 },
    { width: 1024, slides: 3 },
    { width: 1280, slides: 4 },
    { width: Infinity, slides: maxSlidesToShow }
  ];

  const activeBreakpoints = breakpoints.length > 0 ? breakpoints : defaultBreakpoints;

  useEffect(() => {
    const updateSlidesToShow = () => {
      const windowWidth = window.innerWidth;
      const newSlidesToShow = activeBreakpoints?.find(bp => windowWidth <= bp.width)?.slides;
      setSlidesToShow(newSlidesToShow || maxSlidesToShow);
      setComponentWidth(windowWidth);
    };

    updateSlidesToShow();
    window.addEventListener('resize', updateSlidesToShow);
    return () => window.removeEventListener('resize', updateSlidesToShow);
  }, [activeBreakpoints, maxSlidesToShow]);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: slidesToShow,
    adaptiveHeight: true,
  };

  const renderImageItem = useCallback(({ index, style }: {
    index: number,
    style: React.CSSProperties
  }) => (
    <div style={style}>
      <ImageItem src={images[index]} index={index} />
    </div>
  ), [images]);


  return (
    <div className="w-full">
      <Slider {...settings}>
        <List
          height={400}
          itemCount={images.length}
          itemSize={componentWidth / slidesToShow}
          layout="horizontal"
          width={componentWidth}
        >
          {renderImageItem}
        </List>
      </Slider>
    </div>
  );
};

export default Carousel;
