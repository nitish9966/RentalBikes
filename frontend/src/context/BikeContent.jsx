// src/context/BikeContext.jsx
import { createContext, useContext, useState } from "react";

const BikeContext = createContext();

export const useBikeContext = () => useContext(BikeContext);

export const BikeProvider = ({ children }) => {
  const [bikes, setBikes] = useState([]);

  const addBike = (bike) => {
    setBikes((prevBikes) => [...prevBikes, bike]);
  };

  return (
    <BikeContext.Provider value={{ bikes, addBike }}>
      {children}
    </BikeContext.Provider>
  );
};
