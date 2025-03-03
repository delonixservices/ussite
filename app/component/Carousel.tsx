import { useEffect, useState } from 'react';
import Image from 'next/image';

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    '/images/phil-mosley-wOK2f2stPDg-unsplash.jpg',
    '/images/pascal-meier-UYiesSO4FiM-unsplash.jpg',
    '/images/airplane-aircraft-travel-trip.jpg',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="flex transition-all duration-500"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="w-full h-[30vh] sm:h-[100vh] md:h-[70vh] flex-shrink-0"
          >
            <Image
              src={image}
              alt={`carousel-image-${index}`}
              className="object-cover"
              width={100}
              height={100}
              layout="responsive"
              objectFit="cover"
            />
          </div>
        ))}
      </div>
      {/* Navigation dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 w-2 rounded-full bg-white cursor-pointer ${
              currentIndex === index ? 'bg-opacity-80' : 'bg-opacity-50'
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
