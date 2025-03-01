'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

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
    <div>
      {/* Hero Section */}
      <div
        className="bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://img.freepik.com/free-photo/airplane-miniature-notepad-world-map-laptop-wooden-table_169016-50744.jpg?w=900)',
        }}
      >
        <div className="flex items-center justify-center h-[85vh] bg-black bg-opacity-50">
          <div className="bg-white bg-opacity-80 rounded-lg shadow-lg p-4 w-full max-w-6xl">
            <h1 className="text-4xl font-bold text-center text-white py-4">
              Book Your Trip with Us
            </h1>
            <div className="relative w-full flex flex-col gap-4">
              <div className="flex flex-wrap gap-4">
                {/* From Location */}
                <div className="flex-1">
                  <label className="block text-gray-700">From</label>
                  <input
                    type="text"
                    placeholder="From Location"
                    value={fromLocation}
                    onChange={(e) => setFromLocation(e.target.value)}
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                    className={`w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      isOneWay ? 'bg-gray-100' : ''
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

      {/* Top Destinations Section */}
      <div className="section-two flex flex-col mt-0 py-16 bg-gray-100">
        <h1 className="text-4xl font-extrabold text-center text-indigo-600 -mt-9 mb-6">
          Top Destinations
        </h1>
        <p className="text-lg text-gray-700 text-center mx-auto">
          Explore the world with our curated list of destinations.
        </p>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            'https://img.freepik.com/free-photo/3d-view-sun-sky-from-airplane_23-2150953581.jpg?w=996',
            'https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&auto=format&fit=crop&w=927&q=80',
            'https://img.freepik.com/free-photo/plane-flying-sky_1359-165.jpg?w=996',
          ].map((src, idx) => (
            <div key={idx} className="grid gap-4">
              <Image
                className="h-auto max-w-full rounded-lg object-cover object-center"
                src={src}
                alt={`Gallery ${idx}`}
                width={400}
                height={300}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlightSearch;
