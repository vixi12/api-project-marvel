import React, { createContext, useState, useEffect, useReducer } from "react";
import toast from "react-hot-toast";

export const MarvelContext = createContext({});

const MarvelContextProvider = ({ children }: any) => {
  const [marvelHeroeData, setMarvelHeroeData] = useState({});
  const [open, setOpen] = useState<boolean>(false);
  const [marvelComicData, setMarvelComicData] = useState([]);
  const [marvelComicDetailedData, setMarvelComicDetailedData] = useState([]);

  const localStorageReducer = (state: any, action: any) => {
    switch (action.type) {
      case "setState":
        return [...state, action];
      default:
        return state;
    }
  };

  const [localStorageData, dispatch] = useReducer(
    localStorageReducer,
    [],
    () => {
      const localData = localStorage.getItem("localStorageData");
      return localData ? JSON.parse(localData) : [];
    }
  );

  useEffect(() => {
    localStorage.setItem("localStorageData", JSON.stringify(localStorageData));
  }, [localStorageData]);

  const fetchHeroes = async (characterName: String) => {
    try {
      const response = await fetch(
        `https://gateway.marvel.com:443/v1/public/characters?name=${characterName}&ts=1&apikey=62b3a48de764aef294237d6195c9871c&hash=9e71f438546e90c1d56f4fc9f4364bf0`
      );
      return response.json();
    } catch (e) {
      console.error(e);
      toast.success("Something went wrong :(");
    }
  };

  const fetchComics = async (charId: String) => {
    try {
      const response = await fetch(
        `https://gateway.marvel.com:443/v1/public/characters/${charId}/comics?ts=1&apikey=62b3a48de764aef294237d6195c9871c&hash=9e71f438546e90c1d56f4fc9f4364bf0`
      );

      return response.json();
    } catch (e) {
      console.error(e);
    }
  };

  const fetchComicDetailed = async (comicId: String) => {
    try {
      const response = await fetch(
        `https://gateway.marvel.com:443/v1/public/comics/${comicId}?ts=1&apikey=62b3a48de764aef294237d6195c9871c&hash=9e71f438546e90c1d56f4fc9f4364bf0`
      );

      return response.json();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <MarvelContext.Provider
      value={{
        open,
        fetchHeroes,
        fetchComics,
        fetchComicDetailed,
        setMarvelHeroeData,
        setMarvelComicData,
        setMarvelComicDetailedData,
        dispatch,
        setOpen,
        marvelHeroeData,
        marvelComicData,
        marvelComicDetailedData,
        localStorageData,
      }}
    >
      {children}
    </MarvelContext.Provider>
  );
};

export default MarvelContextProvider;
