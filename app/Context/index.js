"use client";
import { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [myList, setMyList] = useState([]);
  const [type, setType] = useState("");

  return (
    <GlobalContext.Provider value={{ myList, setMyList, type, setType }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
