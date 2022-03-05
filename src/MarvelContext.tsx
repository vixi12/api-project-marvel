import React, { createContext, useState } from "react";


export const MarvelContext = createContext({});



const MarvelContextProvider = ({ children } : any) => {

const [marvelHeroeData, setMarvelHeroeData] = useState({})

  


    const fetchHeroes = async (characterName : String) => {
        try {
          const response = await fetch(
            `https://gateway.marvel.com:443/v1/public/characters?name=spider?ts=1&apikey=62b3a48de764aef294237d6195c9871c&hash=9e71f438546e90c1d56f4fc9f4364bf0`
          );

          const data = await response.json();
          console.log(data)
          setMarvelHeroeData(data);
        } catch (e) {
          console.log(e);
        }
      };

    return (
      <MarvelContext.Provider
        value={{
            fetchHeroes,
            marvelHeroeData,
        }}
      >
        {children}
      </MarvelContext.Provider>
    );
  };

  export default MarvelContextProvider;