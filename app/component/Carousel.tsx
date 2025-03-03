import { useEffect, useState } from 'react';
import Image from 'next/image';

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    '.images/airplane-boarding-pass_23-2148255991.jpg',
    '.images/people-air-plane-ready-leave_23-2148255995.jpg', 
    '.images/inside-train-closeup-with-blurred-background_23-2148242291.jpg',
    
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]); // Added images.length as dependency

  return (
    <div className="relative w-full h-96 overflow-hidden">
      <div
        className="flex transition-all duration-500"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {images.map((image, index) => (
          <div key={index} className="w-full h-full flex-shrink-0">
            <Image
              src={image}
              alt={`carousel-image-${index}`}
              className="object-cover"
              width={900} // Adjust width as needed
              height={400} // Adjust height as needed
              layout="responsive" // Maintains responsiveness
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
