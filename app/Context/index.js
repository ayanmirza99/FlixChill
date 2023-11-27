"use client";
import { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [myList, setMyList] = useState([]);
  const [searchData, setSearchData] = useState();
  const [type, setType] = useState("");
  const [searchModal, setSearchModal] = useState(false);

  return (
    <GlobalContext.Provider
      value={{
        myList,
        setMyList,
        type,
        setType,
        searchModal,
        setSearchModal,
        searchData,
        setSearchData,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
