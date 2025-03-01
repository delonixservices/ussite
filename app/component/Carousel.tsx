import { useEffect, useState } from 'react';

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    'https://img.freepik.com/free-photo/closeup-shot-airplane-wing-mountains_181624-40966.jpg?t=st=1739879236~exp=1739882836~hmac=7087c78c6c92496d74bffe89b07f2266c2185c132fcd02597bd83449e15030bf&w=900',
    'https://img.freepik.com/free-photo/people-air-plane-ready-leave_23-2148255995.jpg?t=st=1739878012~exp=1739881612~hmac=05c7b4a49eadc7b2685977789de87f5363558620d3eac94c7f86e2496a33897a&w=900',
    'https://img.freepik.com/free-photo/inside-train-closeup-with-blurred-background_23-2148242291.jpg?t=st=1739878022~exp=1739881622~hmac=a308560d455b2cacb502b04f5f56b6d4e7efc58d547990b6f6732b2431e00ec4&w=996',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-96 overflow-hidden"> {/* Increased height here */}
      <div
        className="flex transition-all duration-500"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {images.map((image, index) => (
          <div key={index} className="w-full h-full flex-shrink-0">
            <img
              src={image}
              alt={`carousel-image-${index}`}
              className="object-cover w-full h-full"
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
            className={`h-2 w-2 rounded-full bg-white cursor-pointer ${currentIndex === index ? 'bg-opacity-80' : 'bg-opacity-50'}`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
