import React, { useState } from "react";

interface PriceRange {
  min: number;
  max: number;
}

const Filters: React.FC = () => {
  const [stops, setStops] = useState<string[]>([]);
  const [price, setPrice] = useState<PriceRange>({ min: 844, max: 4167 });
  const [airlines, setAirlines] = useState<string[]>([]);
  const [departureTime, setDepartureTime] = useState<string[]>([]);

  const toggleOption = (
    state: string[],
    setState: React.Dispatch<React.SetStateAction<string[]>>,
    option: string
  ) => {
    if (state.includes(option)) {
      setState(state.filter((item) => item !== option));
    } else {
      setState([...state, option]);
    }
  };

  return (
    <div
      className="p-4 border rounded-lg w-80 bg-white shadow-md text-white bg-black bg-opacity-50 mt-20"
      style={{
        backgroundImage: `url('https://i.pinimg.com/736x/d0/f2/f3/d0f2f3ac62f68ce82ea37f34331c2bd3.jpg ')`,
      
      }}
    >
      <h2 className="text-lg font-bold mb-4">Filter Your Results</h2>

      {/* Stops */}
      <div className="mb-6">
        <h3 className="text-base font-semibold mb-2">Stop</h3>
        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="form-checkbox"
              checked={stops.includes("One Stop")}
              onChange={() => toggleOption(stops, setStops, "One Stop")}
            />
            <span>One Stop</span>
          </label>
          <label className="flex items-center space-x-2 mt-2">
            <input
              type="checkbox"
              className="form-checkbox"
              checked={stops.includes("Two+ Stop")}
              onChange={() => toggleOption(stops, setStops, "Two+ Stop")}
            />
            <span>Two+ Stop</span>
          </label>
        </div>
      </div>

      {/* Price */}
      <div className="mb-6">
        <h3 className="text-base font-semibold mb-2">Price</h3>
        <div className="flex items-center justify-between">
          <span>${price.min}</span>
          <input
            type="range"
            min="844"
            max="4167"
            value={price.min}
            className="w-full mx-2"
            onChange={(e) =>
              setPrice({ ...price, min: Number(e.target.value) })
            }
          />
          <span>${price.max}</span>
        </div>
      </div>

      {/* Airlines */}
      <div className="mb-6">
        <h3 className="text-base font-semibold mb-2">Airlines</h3>
        {["Tap Portugal", "American Airlines", "Virgin Atlantic"].map(
          (airline) => (
            <label key={airline} className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={airlines.includes(airline)}
                onChange={() => toggleOption(airlines, setAirlines, airline)}
              />
              <span>{airline}</span>
            </label>
          )
        )}
      </div>

      {/* Departure Time */}
      <div className="mb-6">
        <h3 className="text-base font-semibold mb-2">Departure Time </h3>
        {["Early Morning", "Morning", "Afternoon", "Evening"].map((time) => (
          <label key={time} className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="form-checkbox"
              checked={departureTime.includes(time)}
              onChange={() =>
                toggleOption(departureTime, setDepartureTime, time)
              }
            />
            <span>{time}</span>
          </label>
        ))}
      </div>

      {/* Reset Filter */}
      <button
        onClick={() => {
          setStops([]);
          setPrice({ min: 844, max: 4167 });
          setAirlines([]);
          setDepartureTime([]);
        }}
        className="w-full py-2 text-center bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
      >
        Reset Filter
      </button>
    </div>
  );
};

export default Filters;
