'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Carousel from '../component/Carousel';
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
    if (fromLocation && toDestination && numOfPeople) {
      router.push(
        `/FlightResults?fromLocation=${fromLocation}&toDestination=${toDestination}&numOfPeople=${numOfPeople}&flightDate=${flightDate}&returnDate=${isOneWay ? '' : returnDate}`
      );
    } else {
      alert('Please fill in the "From Location" and "To Destination" before searching!');
    }
  };

  return (
    <div>
      <div
        className="bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://img.freepik.com/free-photo/airplane-miniature-notepad-world-map-laptop-wooden-table_169016-50744.jpg?w=900)',
        }}
      >
        <div className="flex items-center justify-center h-[85vh] bg-black bg-opacity-50">
          <div className="bg-white bg-opacity-80 rounded-lg shadow-lg p-4 w-full max-w-6xl animate__animated animate__fadeIn">
            <h1 className="text-4xl font-bold text-center text-white py-4">
              Book Your Trip with Us
            </h1>
            <div className="relative w-full flex flex-col gap-4">
              <div className="flex flex-wrap gap-4">
                {/* From Location Input */}
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
                {/* To Destination Input */}
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
                {/* number of people */}
                <div className="flex-1">
                  <label className="block text-gray-700">No. of People</label>
                  <input
                    type="text"
                    placeholder="numOfPeople"
                    value={numOfPeople}
                    onChange={(e) => {
                      const value = e.target.value;
                      setNumOfPeople(value === "" ? 0 : Number(value)); // Handle empty input
                    }}
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
                    className={`w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${isOneWay ? 'bg-gray-100' : ''}`}
                  />
                </div>
              </div>
              <div className="flex items-center gap-4">
                {/* One Way / Round Trip Selection */}
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
      <div className="section-two flex flex-col mt-0 py-16 bg-gray-100 animate-fade-in">
        <h1 className="text-4xl font-extrabold text-center text-indigo-600 -mt-9 mb-6">
          Top Destinations
        </h1>
        <p className="text-lg text-gray-700 text-center mx-auto">
          From vibrant cities and charming villages to pristine beaches and hidden gems, the world is full of incredible places to explore. Whether you’re seeking adventure, relaxation, or cultural immersion, our curated list of the best destinations will spark your wanderlust. We’ve handpicked must-visit spots to inspire your next journey and make your travel dreams a reality. From the cobblestone streets of historic towns to the serenity of remote islands, get ready to experience the world like never before. So, pack your bags, grab your passport, and let these breathtaking places reignite your love for travel!
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 m-">
        <div className="grid gap-4">
          <div>
            <img
              className="h-auto max-w-full rounded-lg object-cover object-center"
              src="https://img.freepik.com/free-photo/3d-view-sun-sky-from-airplane_23-2150953581.jpg?t=st=1739864842~exp=1739868442~hmac=db479e363d016a7bc006afbebdc606d0ff0ff7b9daf9df2ba2867fbd5344f5d2&w=996;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1950&amp;q=80"
              alt="gallery-photo"
            />
          </div>
          <div>
            <img
              className="h-auto max-w-full rounded-lg object-cover object-center"
              src="https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=927&amp;q=80"
              alt="gallery-photo"
            />
          </div>
          <div>
            <img
              className="h-auto max-w-full rounded-lg object-cover object-center"
              src="https://img.freepik.com/free-photo/plane-flying-sky_1359-165.jpg?t=st=1739864917~exp=1739868517~hmac=dfb6a5399f64c76498922773c78b34224bafd393bafd9da6fc24f7cf42159fa4&w=996&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=2940&amp;q=80"
              alt="gallery-photo"
            />
          </div>
        </div>
        <div className="grid gap-4">
          <div>
            <img
              className="h-auto max-w-full rounded-lg object-cover object-center"
              src="https://images.unsplash.com/photo-1552960562-daf630e9278b?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=687&amp;q=80"
              alt="gallery-photo"
            />
          </div>
          <div>
            <img
              className="h-auto max-w-full rounded-lg object-cover object-center"
              src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=80"
              alt="gallery-photo"
            />
          </div>
          <div>
            <img
              className="h-auto max-w-full rounded-lg object-cover object-center"
              src="https://docs.material-tailwind.com/img/team-3.jpg"
              alt="gallery-photo"
            />
          </div>
        </div>
        <div className="grid gap-4">
          <div>
            <img
              className="h-auto max-w-full rounded-lg object-cover object-center"
              src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=2940&amp;q=80"
              alt="gallery-photo"
            />
          </div>
          <div>
            <img
              className="h-auto max-w-full rounded-lg object-cover object-center"
              src="https://docs.material-tailwind.com/img/team-3.jpg"
              alt="gallery-photo"
            />
          </div>
          <div>
            <img
              className="h-auto max-w-full rounded-lg object-cover object-center"
              src="https://images.unsplash.com/photo-1552960562-daf630e9278b?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=687&amp;q=80"
              alt="gallery-photo"
            />
          </div>
        </div>
        <div className="grid gap-4">
          <div>
            <img
              className="h-auto max-w-full rounded-lg object-cover object-center"
              src="https://images.unsplash.com/photo-1552960562-daf630e9278b?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=687&amp;q=80"
              alt="gallery-photo"
            />
          </div>
          <div>
            <img
              className="h-auto max-w-full rounded-lg object-cover object-center"
              src="https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=927&amp;q=80"
              alt="gallery-photo"
            />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between mt-0 py-16 bg-gray-100 animate-fade-in flex-col lg:flex-row">
        <div className="w-full lg:w-1/2">
          <img
            src="https://img.freepik.com/free-photo/plane-airport-sunset_268835-3075.jpg?t=st=1739866419~exp=1739870019~hmac=efbc95a79b15625fa2fa78da215dab18b823cde9165cb20eb5d1fbc44e361314&w=996"
            alt="Thailand"
            className="w-full h-auto object-cover"
          />
        </div>
        <div className="w-full lg:w-1/2 pl-8 mt-12 lg:mt-0">
          <h1 className="text-4xl font-extrabold text-center text-indigo-600 -mt-9 mb-6">
            Explore the Wonders of Thailand
          </h1>
          <p className="text-lg text-gray-700  text-left">
            Thailand is a vibrant destination known for its warmth, hospitality, and rich blend of cultures, earning its nickname as "The Land of Smiles." Whether you're seeking relaxation, adventure, or cultural exploration, Thailand offers something for everyone.
            Our diverse range of Thailand trip packages caters to various tastes and budgets. From family vacations and escorted tours to honeymoon getaways, adventure-filled expeditions, budget-friendly escapes, and city breaks—there's a perfect package waiting for you.
            Thailand offers an exciting array of activities, including shopping, vibrant nightlife, stunning beaches, and unique cultural experiences. Whatever your preferences, you'll find endless ways to make your holiday truly unforgettable.
          </p>
        </div>
      </div>


      <div className="section-five py-10 bg-gray-100">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Card 1: Europe Flights */}
          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <img
                className="rounded-t-lg"
                src="https://img.freepik.com/free-photo/closeup-shot-plane-wing-pinkish-sky_181624-2074.jpg?t=st=1739872931~exp=1739876531~hmac=05acb56fb832943ef094f3d7eb25f023ccade306a5686f78fa85723d87baf7a1&w=996"
                alt="Europe Flights"
              />
            </a>
            <div className="p-5">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-indigo-600">
                  Flights to Europe
                </h5>
              </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Explore the rich culture, history, and beautiful landscapes of Europe with affordable flights to major cities like Paris, London, and Rome.
              </p>
            </div>
          </div>

          {/* Card 2: Asia Flights */}
          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <img
                className="rounded-t-lg"
                src="https://img.freepik.com/free-photo/closeup-shot-plane-wing-pinkish-sky_181624-2074.jpg?t=st=1739872931~exp=1739876531~hmac=05acb56fb832943ef094f3d7eb25f023ccade306a5686f78fa85723d87baf7a1&w=996"
                alt="Asia Flights"
              />
            </a>
            <div className="p-5">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-indigo-600">
                  Flights to Asia
                </h5>
              </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Discover the best flights to top Asian destinations like Tokyo, Bangkok, and Singapore. Book your next getaway to Asia today.
              </p>
            </div>
          </div>

          {/* Card 3: Americas Flights */}
          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <img
                className="rounded-t-lg"
                src="https://img.freepik.com/free-photo/closeup-shot-plane-wing-pinkish-sky_181624-2074.jpg?t=st=1739872931~exp=1739876531~hmac=05acb56fb832943ef094f3d7eb25f023ccade306a5686f78fa85723d87baf7a1&w=996"
                alt="Americas Flights"
              />
            </a>
            <div className="p-5">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-indigo-600">
                  Flights to the Americas
                </h5>
              </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Fly to iconic destinations across North and South America, including New York, Cancun, and Rio de Janeiro. Book your dream trip today.
              </p>
            </div>
          </div>

          {/* Card 4: Africa Flights */}
          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <img
                className="rounded-t-lg"
                src="https://img.freepik.com/free-photo/closeup-shot-plane-wing-pinkish-sky_181624-2074.jpg?t=st=1739872931~exp=1739876531~hmac=05acb56fb832943ef094f3d7eb25f023ccade306a5686f78fa85723d87baf7a1&w=996"
                alt="Africa Flights"
              />
            </a>
            <div className="p-5">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-indigo-600">
                  Flights to Africa
                </h5>
              </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Embark on a once-in-a-lifetime adventure to Africa with flights to Johannesburg, Nairobi, and Cape Town. Explore safaris, beaches, and rich cultures.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="section-six ml-4 mr-4 shadow-xl p-4">
        <Carousel />

      </div>

      <div className="section-seven">
        <Footer />
      </div>


    </div>


  );
};

export default FlightSearch;
