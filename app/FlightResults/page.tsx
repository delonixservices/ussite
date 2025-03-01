'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '../component/Navbar';
import Filters from '../component/Filters';

interface Flight {
  id: number;
  airline: string;
  price: string;
  departure: string;
  arrival: string;
  fromLocation: string;
  toDestination: string;
}

interface FlightDetails {
  fromLocation: string;
  toDestination: string;
  numOfPeople: string;
  departureDate: string;
  returnDate: string;
  flights: Flight[];
}

const FlightResultsContent: React.FC = () => {
  const searchParams = useSearchParams();
  const [flightDetails, setFlightDetails] = useState<FlightDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [sortBy, setSortBy] = useState<string>('price');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [flightsPerPage] = useState<number>(5);

  useEffect(() => {
    const from = searchParams.get('fromLocation');
    const to = searchParams.get('toDestination');
    const num = searchParams.get('numOfPeople');
    const depDate = searchParams.get('departureDate');
    const retDate = searchParams.get('returnDate');

    if (from && to) {
      fetchFlights(from, to, num || '1', depDate || '', retDate || '');
    } else {
      setLoading(false);
    }
  }, [searchParams]);

  const fetchFlights = async (
    from: string,
    to: string,
    num: string,
    depDate: string,
    retDate: string
  ) => {
    try {
      const mockData: FlightDetails = {
        fromLocation: from,
        toDestination: to,
        numOfPeople: num,
        departureDate: depDate,
        returnDate: retDate,
        flights: [
          { id: 1, airline: 'Airline A', price: '$500', departure: '2025-03-01 10:00 AM', arrival: '2025-03-01 12:30 PM', fromLocation: 'New York', toDestination: 'London' },
          { id: 2, airline: 'Airline B', price: '$520', departure: '2025-03-01 03:00 PM', arrival: '2025-03-01 05:30 PM', fromLocation: 'New York', toDestination: 'London' },
          { id: 3, airline: 'Airline C', price: '$550', departure: '2025-03-02 07:00 PM', arrival: '2025-03-02 09:30 PM', fromLocation: 'New York', toDestination: 'London' },
        ],
      };

      const filteredFlights = mockData.flights.filter(
        (flight) =>
          flight.fromLocation.toLowerCase() === from.toLowerCase() &&
          flight.toDestination.toLowerCase() === to.toLowerCase()
      );

      setFlightDetails({ ...mockData, flights: filteredFlights });
    } finally {
      setLoading(false);
    }
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  const sortFlights = (flights: Flight[]) => {
    return flights.sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', ''));
        case 'departure':
          return new Date(a.departure).getTime() - new Date(b.departure).getTime();
        default:
          return 0;
      }
    });
  };

  const indexOfLastFlight = currentPage * flightsPerPage;
  const indexOfFirstFlight = indexOfLastFlight - flightsPerPage;
  const currentFlights = flightDetails?.flights.slice(indexOfFirstFlight, indexOfLastFlight);

  const paginate = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= Math.ceil((flightDetails?.flights.length || 0) / flightsPerPage)) {
      setCurrentPage(pageNumber);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        <p className="mt-4 text-blue-500">Loading flight results...</p>
      </div>
    );
  }

  if (!flightDetails || flightDetails.flights.length === 0) {
    return <div className="text-center mt-10">No flight data available. Please refine your search.</div>;
  }

  return (
    <>
      <Navbar />
      <div className="section flex flex-col md:flex-row">
        <div className="hidden md:block w-full md:w-1/4 lg:w-1/5">
          <Filters />
        </div>

        <div className="flex-1 p-4">
          <h2 className="text-xl font-bold mb-4">Flight Results</h2>
          <select onChange={handleSortChange} value={sortBy} className="mb-4 p-2 border rounded">
            <option value="price">Sort by Price</option>
            <option value="departure">Sort by Departure</option>
          </select>
          <div>
            {sortFlights(currentFlights || []).map((flight) => (
              <div key={flight.id} className="p-4 border rounded mb-2 shadow-sm hover:shadow-lg">
                <p className="font-bold">{flight.airline}</p>
                <p>Price: {flight.price}</p>
                <p>
                  Departure: {flight.departure} - Arrival: {flight.arrival}
                </p>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => paginate(currentPage - 1)}
              className="p-2 bg-blue-500 text-white rounded disabled:opacity-50"
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="text-sm">
              Page {currentPage} of {Math.ceil((flightDetails?.flights.length || 0) / flightsPerPage)}
            </span>
            <button
              onClick={() => paginate(currentPage + 1)}
              className="p-2 bg-blue-500 text-white rounded disabled:opacity-50"
              disabled={indexOfLastFlight >= (flightDetails?.flights.length || 0)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const FlightResults: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FlightResultsContent />
    </Suspense>
  );
};

export default FlightResults;
