'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '../component/Navbar';

interface Flight {
  id: number;
  airline: string;
  price: string;
  departure: string;
  arrival: string;
  fromLocation: string;
  toDestination: string;
}

const About: React.FC = () => {
  const searchParams = useSearchParams();
  const [flight, setFlight] = useState<Flight | null>(null);
  const [numOfPeople, setNumOfPeople] = useState<number>(1);

  useEffect(() => {
    const flightParam = searchParams.get('flight');
    const numOfPeopleParam = searchParams.get('numOfPeople');
    if (flightParam) {
      const decodedFlight = JSON.parse(decodeURIComponent(flightParam));
      setFlight(decodedFlight);
    }
    if (numOfPeopleParam) {
      setNumOfPeople(parseInt(numOfPeopleParam, 10));
    }
  }, [searchParams]);

  if (!flight) {
    return <div className="text-center">Loading flight details...</div>;
  }

  return (
    <>
      <Navbar />
      <div
        className="section"
        style={{
          backgroundImage:
            'url(https://img.freepik.com/free-photo/pouch-map-toy-airplane-blue-background-with-space-writing-text_23-2147958180.jpg?t=st=1740117891~exp=1740121491~hmac=e2fcdfcb5408980389f834de1141a98417ce0d2bd5e3f4612ba8f44f948363e8&w=996)',
        }}
      >
        <div className="container mx-auto p-4">
          <div className="bg-white bg-opacity-60 rounded-lg shadow-lg p-4 w-full max-w-6xl animate__animated animate__fadeIn mt-12">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">Flight Details</h2>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex-1">
                <p><strong>Airline:</strong> {flight.airline}</p>
              </div>
              <div className="flex-1">
                <p><strong>Price:</strong> {flight.price}</p>
              </div>
              <div className="flex-1">
                <p><strong>Departure:</strong> {flight.departure}</p>
              </div>
              <div className="flex-1">
                <p><strong>Arrival:</strong> {flight.arrival}</p>
              </div>
              <div className="flex-1">
                <p><strong>From:</strong> {flight.fromLocation}</p>
              </div>
              <div className="flex-1">
                <p><strong>To:</strong> {flight.toDestination}</p>
              </div>
            </div>

            <h2 className="text-xl font-semibold mb-4 mt-6">Passenger Details</h2>
            <form>
              {Array.from({ length: numOfPeople }, (_, index) => (
                <div key={index} className="mb-6">
                  <h3 className="text-lg font-semibold mb-4">Passenger {index + 1}</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Full Name"
                      className="border border-gray-300 rounded-lg p-2"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Passport Number"
                      className="border border-gray-300 rounded-lg p-2"
                      required
                    />
                    <input
                      type="date"
                      placeholder="Date of Birth"
                      className="border border-gray-300 rounded-lg p-2"
                      required
                    />
                    <input
                      type="number"
                      placeholder="Age"
                      className="border border-gray-300 rounded-lg p-2"
                      required
                    />
                    <input
                      type="tel"
                      placeholder="Contact Number"
                      className="border border-gray-300 rounded-lg p-2"
                      required
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      className="border border-gray-300 rounded-lg p-2"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Address"
                      className="border border-gray-300 rounded-lg p-2 col-span-2"
                      required
                    />
                   
              <div className="grid grid-cols gap-6 mb-6">
                <select
                  className="border border-gray-300 rounded-lg p-2"
                  required
                >
                  <option value="">Select Payment Method</option>
                  <option value="credit_card">Credit Card</option>
                  <option value="debit_card">Debit Card</option>
                  <option value="paypal">PayPal</option>
                  <option value="bank_transfer">Bank Transfer</option>
                </select>
                <input
                  type="text"
                  placeholder="Card Number (if applicable)"
                  className="border border-gray-300 rounded-lg p-2"
                />
              </div>

                  </div>
                </div>
              ))}

              
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
              >
                Confirm Booking
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;