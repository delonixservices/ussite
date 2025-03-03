'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Carousel from '../component/Carousel';
import Image from 'next/image';
import Footer from '../component/Footer';

const FlightSearch = () => {
  const [fromLocation, setFromLocation] = useState('');
  const [toDestination, setToDestination] = useState('');
  const [flightDate, setFlightDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [numOfPeople, setNumOfPeople] = useState(1);
  const [isOneWay, setIsOneWay] = useState(true);

  const router = useRouter();
  const minDate = new Date().toISOString().split('T')[0];

  const handleSearch = () => {
    if (fromLocation && toDestination && numOfPeople > 0) {
      router.push(
        `/FlightResults?fromLocation=${fromLocation}&toDestination=${toDestination}&numOfPeople=${numOfPeople}&flightDate=${flightDate}&returnDate=${isOneWay ? '' : returnDate}`
      );
    } else {
      alert('Please fill in all required fields correctly before searching!');
    }
  };
  

  return (
    <>
    <div>
    {/* Hero Section */}
    <div
      className="bg-cover bg-center "
      style={{
        backgroundImage:
          "url(/images/airplane-flying-clouds-sunset-light.jpg)",
         
      }}
    >
      <div className="flex items-center justify-center h-[95vh] bg-black bg-opacity-50 ">
        <div className="bg-white bg-opacity-80 rounded-lg shadow-lg p-4 w-full max-w-6xl mt-12 m-12">
          <h1 className="text-4xl font-bold text-center text-indigo-600 py-4">
            Book Your Trip with Us
          </h1>
          <div className="relative w-full flex flex-col gap-4">
            <div className="flex flex-wrap flex-col md:flex-row gap-4">
              {/* From Location */}
              <div className="flex-1">
                <label className="block text-gray-700">From</label>
                <input
                  type="text"
                  placeholder="From Location"
                  value={fromLocation}
                  onChange={(e) => setFromLocation(e.target.value)}
                  className="w-full p-4 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              {/* To Destination */}
              <div className="flex-1">
                <label className="block text-gray-700">Destination</label>
                <input
                  type="text"
                  placeholder="To Destination"
                  value={toDestination}
                  onChange={(e) => setToDestination(e.target.value)}
                  className="w-full p-4 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              {/* Number of People */}
              <div className="flex-1">
                <label className="block text-gray-700">No. of People</label>
                <input
                  type="number"
                  placeholder="Number of People"
                  value={numOfPeople}
                  onChange={(e) => setNumOfPeople(Number(e.target.value))}
                  className="w-full p-4 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              {/* Flight Date */}
              <div className="flex-1">
                <label className="block text-gray-700">Flight Date</label>
                <input
                  type="date"
                  value={flightDate}
                  onChange={(e) => setFlightDate(e.target.value)}
                  min={minDate}
                  className="w-full p-4 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              {/* Return Date */}
              <div className="flex-1">
                <label className="block text-gray-700">Return Date</label>
                <input
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  min={flightDate || minDate}
                  disabled={isOneWay}
                  className={`w-full p-4 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    isOneWay ? "bg-gray-100" : ""
                  }`}
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              {/* Trip Type */}
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="tripType"
                  checked={isOneWay}
                  onChange={() => setIsOneWay(true)}
                  className="form-radio"
                />
                <label className="text-gray-700">One Way</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="tripType"
                  checked={!isOneWay}
                  onChange={() => setIsOneWay(false)}
                  className="form-radio"
                />
                <label className="text-gray-700">Round Trip</label>
              </div>
            </div>
            <button
              onClick={handleSearch}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700"
            >
              Search Flights
            </button>
          </div>
        </div>
      </div>
    </div>
    
  </div>
  <div className="mt-8 px-4">
  <h2 className="text-3xl font-semibold text-indigo-600 text-center">
    Why Book with Us?
  </h2>
  <p className="text-gray-700 text-center mt-4 leading-relaxed">
    At our booking platform, we strive to make your travel dreams come true. Our platform is designed 
    to provide a seamless and hassle-free booking experience, offering access to a wide range of flight 
    options at unbeatable prices. Whether you&apos;re traveling for business, leisure, or a family vacation, 
    we ensure you find the best deals tailored to your preferences.  
    </p>
   
</div>

<div className="flex flex-col md:flex-row items-center bg-gray-100 p-8 rounded-lg shadow-lg">
  {/* Left Content */}
  <div className="flex-1 text-center md:text-left space-y-6">
    <h2 className="text-2xl md:text-4xl font-bold text-indigo-600">
      Discover the World with Us
    </h2>
    <p className="text-gray-700">
      Whether it is sandy beaches, bustling cities, or serene mountains, your next adventure 
      is just a few clicks away. We provide tailored travel plans that suit your preferences 
      and budget. Let us take care of the details while you focus on creating unforgettable 
      memories.
    </p>
    <p className="text-gray-700">
      With exclusive deals, flexible options, and 24/7 customer support, your travel experience 
      will be seamless and enjoyable. Join millions of happy travelers and explore the best 
      destinations worldwide with our trusted platform.
    </p>
    <button className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 shadow-md transition duration-300 transform hover:scale-105">
      Start Your Journey
    </button>
  </div>

  {/* Right Image with Animation */}
  <div className="flex-1 mt-6 md:mt-0 relative animate-float">
    <Image
      src="/images/beautiful-girl-standing-airport.jpg"
      alt="Travel Adventure"
      className="w-full h-auto rounded-lg shadow-lg"
      width={600}
      height={400}
    />
  </div>
</div>
<div className=" p-4">
<Carousel/>
</div>
<Footer/>
  </>
  );
};

export default FlightSearch;
