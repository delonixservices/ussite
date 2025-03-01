'use client';

import React, { useEffect, useState } from 'react';
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

const FlightResults: React.FC = () => {
  const searchParams = useSearchParams();
  const [flightDetails, setFlightDetails] = useState<FlightDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [fromLocation, setFromLocation] = useState<string>('');
  const [toDestination, setToDestination] = useState<string>('');
  const [numOfPeople, setNumOfPeople] = useState<string>('1');
  const [departureDate, setDepartureDate] = useState<string>('');
  const [returnDate, setReturnDate] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('price');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [flightsPerPage] = useState<number>(5);
  const [showFilters, setShowFilters] = useState<boolean>(false); // State for mobile filter toggle

  useEffect(() => {
    const from = searchParams.get('fromLocation');
    const to = searchParams.get('toDestination');
    const num = searchParams.get('numOfPeople');
    const depDate = searchParams.get('departureDate');
    const retDate = searchParams.get('returnDate');

    if (from && to) {
      setFromLocation(from);
      setToDestination(to);
      setNumOfPeople(num || '1');
      setDepartureDate(depDate || '');
      setReturnDate(retDate || '');
      fetchFlights(from, to, num || '1', depDate || '', retDate || '');
    } else {
      setError('Please provide valid search criteria.');
      setLoading(false);
    }
  }, [searchParams]);

  const fetchFlights = async (from: string, to: string, num: string, depDate: string, retDate: string) => {
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
          { id: 4, airline: 'Airline D', price: '$480', departure: '2025-03-03 06:00 AM', arrival: '2025-03-03 08:30 AM', fromLocation: 'New York', toDestination: 'London' },
          { id: 5, airline: 'Airline E', price: '$600', departure: '2025-03-04 12:00 PM', arrival: '2025-03-04 02:30 PM', fromLocation: 'New York', toDestination: 'Paris' },
          { id: 6, airline: 'Airline F', price: '$630', departure: '2025-03-05 04:00 PM', arrival: '2025-03-05 06:30 PM', fromLocation: 'New York', toDestination: 'Paris' },
          { id: 7, airline: 'Airline G', price: '$700', departure: '2025-03-06 11:00 AM', arrival: '2025-03-06 01:30 PM', fromLocation: 'New York', toDestination: 'Tokyo' },
          { id: 8, airline: 'Airline H', price: '$750', departure: '2025-03-07 09:00 AM', arrival: '2025-03-07 11:30 AM', fromLocation: 'New York', toDestination: 'Tokyo' },
          { id: 9, airline: 'Airline I', price: '$580', departure: '2025-03-08 01:00 PM', arrival: '2025-03-08 03:30 PM', fromLocation: 'New York', toDestination: 'Berlin' },
          { id: 10, airline: 'Airline J', price: '$620', departure: '2025-03-09 05:00 PM', arrival: '2025-03-09 07:30 PM', fromLocation: 'New York', toDestination: 'Berlin' },
        ],
      };

      const filteredFlights = mockData.flights.filter((flight) => {
        return (
          flight.fromLocation.toLowerCase() === from.toLowerCase() &&
          flight.toDestination.toLowerCase() === to.toLowerCase()
        );
      });

      const updatedFlightDetails: FlightDetails = { ...mockData, flights: filteredFlights };
      setFlightDetails(updatedFlightDetails);
    } catch (error) {
      setError('Failed to fetch flight data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchUpdate = () => {
    fetchFlights(fromLocation, toDestination, numOfPeople, departureDate, returnDate);
  };

  const getTodayDate = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
  };

  const isReturnDateValid = (date: string) => {
    if (!departureDate) return true; // If no departure date, allow any return date
    return date >= departureDate; // Return date must be same or after departure date
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  const sortFlights = (flights: Flight[]) => {
    switch (sortBy) {
      case 'price':
        return flights.sort((a, b) => parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', '')));
      case 'departure':
        return flights.sort((a, b) => new Date(a.departure).getTime() - new Date(b.departure).getTime());
      default:
        return flights;
    }
  };

  const indexOfLastFlight = currentPage * flightsPerPage;
  const indexOfFirstFlight = indexOfLastFlight - flightsPerPage;
  const currentFlights = flightDetails?.flights.slice(indexOfFirstFlight, indexOfLastFlight);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-10">
        <p className="text-red-500">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!flightDetails || flightDetails.flights.length === 0) {
    return <div className="text-center mt-10">No flight data available. Please refine your search.</div>;
  }

  return (
    <>
      <Navbar />
      <div className="section flex flex-col md:flex-row  " style={{
          backgroundImage:
            'url(https://img.freepik.com/free-photo/pouch-map-toy-airplane-blue-background-with-space-writing-text_23-2147958180.jpg?t=st=1740117891~exp=1740121491~hmac=e2fcdfcb5408980389f834de1141a98417ce0d2bd5e3f4612ba8f44f948363e8&w=996)',
        }}>
        {/* Mobile Filter Toggle Button */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="md:hidden bg-blue-500 text-white p-2 mx-4 rounded-lg mb-4 mt-16  "
        >
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>

        {/* Filters Section - Hidden on mobile by default */}
        <div className={`${showFilters ? 'block' : 'hidden'} md:block w-full md:w-64 lg:w-72 px-4`}>
          <Filters />
        </div>

        {/* Main Content */}
        <div className="container mx-auto p-12 flex-1 ml-2 mt-4" >
  <div className="max-w-full mx-auto bg-white shadow-md shadow-gray-400 rounded-xl p-3">
    <h2 className="text-xl font-bold text-blue-600 mb-2">Modify Search</h2>
    <div className="flex flex-wrap gap-3 items-center">
      <input
        type="text"
        placeholder="From Location"
        value={fromLocation}
        onChange={(e) => setFromLocation(e.target.value)}
        className="w-full sm:w-1/3 lg:w-1/6 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
        type="text"
        placeholder="To Destination"
        value={toDestination}
        onChange={(e) => setToDestination(e.target.value)}
        className="w-full sm:w-1/3 lg:w-1/6 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
        type="number"
        placeholder="Number of People"
        value={numOfPeople}
        onChange={(e) => setNumOfPeople(e.target.value)}
        className="w-full sm:w-1/3 lg:w-1/6 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
        type="date"
        placeholder="Departure Date"
        value={departureDate}
        onChange={(e) => setDepartureDate(e.target.value)}
        className="w-full sm:w-1/3 lg:w-1/6 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        min={getTodayDate()}
      />
      <input
        type="date"
        placeholder="Return Date"
        value={returnDate}
        onChange={(e) => {
          const selectedDate = e.target.value;
          if (isReturnDateValid(selectedDate)) {
            setReturnDate(selectedDate);
          } else {
            setError('Return date must be on or after the departure date.');
          }
        }}
        className="w-full sm:w-1/3 lg:w-1/6 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        min={departureDate || getTodayDate()}
      />
      <button
        onClick={handleSearchUpdate}
        className="w-full sm:w-1/3 lg:w-1/6 bg-blue-500 text-white font-semibold p-2 rounded-lg hover:bg-blue-600"
      >
        Update Search
      </button>
    </div>
  </div>

          <div className="mb-4 p-4 bg-white shadow rounded-lg mt-4">
            <div className="flex flex-wrap gap-4">
              <p className="flex items-center">
                <strong className="mr-2">From:</strong> {flightDetails.fromLocation}
              </p>
              <p className="flex items-center">
                <strong className="mr-2">To:</strong> {flightDetails.toDestination}
              </p>
              <p className="flex items-center">
                <strong className="mr-2">Number of People:</strong> {flightDetails.numOfPeople}
              </p>
              <p className="flex items-center">
                <strong className="mr-2">Departure Date:</strong> {flightDetails.departureDate}
              </p>
              <p className="flex items-center">
                <strong className="mr-2">Return Date:</strong> {flightDetails.returnDate}
              </p>
            </div>
          </div>
          <div className="flex  justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Available Flights</h2>
            <select
              value={sortBy}
              onChange={handleSortChange}
              className="border border-gray-300 rounded-lg p-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="price">Sort by Price</option>
              <option value="departure">Sort by Departure Time</option>
            </select>
          </div>
          <div className="space-y-4 bg">
            {sortFlights(currentFlights || []).map((flight) => (
              <div
                key={flight.id}
                className="border border-gray-300 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300 bg-white"
              >
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                  <div className="flex items-center mb-2 md:mb-0">
                    <img
                      src="/path-to-airline-icon.png"
                      alt={`${flight.airline} icon`}
                      className="w-6 h-6 mr-2"
                    />
                    <h3 className="text-lg font-semibold text-gray-800">{flight.airline}</h3>
                  </div>
                  <div className="mb-2 md:mb-0 text-sm text-gray-600">
                    <p>
                      <span className="font-medium">Price: </span>${flight.price}
                    </p>
                  </div>
                  <div className="mb-2 md:mb-0 text-sm text-gray-600">
                    <p>
                      <span className="font-medium">Departure: </span>
                      {flight.departure}
                    </p>
                  </div>
                  <div className="mb-2 md:mb-0 text-sm text-gray-600">
                    <p>
                      <span className="font-medium">Arrival: </span>
                      {flight.arrival}
                    </p>
                  </div>
                  <div>
                    <button
                      onClick={() => {
                        const flightInfo = encodeURIComponent(JSON.stringify(flight));
                        const numOfPeopleParam = encodeURIComponent(numOfPeople);
                        window.location.href = `/about?flight=${flightInfo}&numOfPeople=${numOfPeopleParam}`;
                      }}
                      className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors duration-300"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        
        </div>
      </div>
    </>
  );
};

export default FlightResults;