import { useContext, useState, useEffect } from "react";
import { MarvelContext } from "../MarvelContext";
import * as React from "react";

const FetchByCategory = ({}) => {
  const { marvelHeroeData }: any = useContext(MarvelContext);

  if (
    Object.keys(marvelHeroeData).length === 0 ||
    Object.keys(marvelHeroeData).length === 1
  ) {
    return (
      <div>
        <p>NO HAY NADA</p>
      </div>
    );
  } else {
    return (
      <div className="heroe-data">
        <div className="api-info-display-block">
          <h3 className="title">{marvelHeroeData.data.results[0].name}</h3>
          <div className="heroe-main-info">
            <div className="heroe-img-div">
              <img
                className="heroe-img"
                src={`${marvelHeroeData.data.results[0].thumbnail.path}.${marvelHeroeData.data.results[0].thumbnail.extension}`}
                alt="HeroeImg"
              />
            </div>
            {marvelHeroeData.data.results[0].description === "" ? null : (
              <div className="heroe-desc-div">
                <p className="heroe-desc">
                  {marvelHeroeData.data.results[0].description}
                </p>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <p>
                    <a href={marvelHeroeData.data.results[0].urls[0].url}>
                      {marvelHeroeData.data.results[0].urls[0].type}
                    </a>
                  </p>
                  <p>
                    <a href={marvelHeroeData.data.results[0].urls[1].url}>
                      {marvelHeroeData.data.results[0].urls[1].type}
                    </a>
                  </p>
                  <p>
                    <a href={marvelHeroeData.data.results[0].urls[2].url}>
                      {marvelHeroeData.data.results[0].urls[2].type}
                    </a>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      //  <div className="api-info-display-block">
      //       <h3 className="title">Comics</h3>
      //       <div className="comic-list">
      //         {marvelHeroeData.data.results[0].comics.items.map(
      //           (eachComic: any) => (
      //             <li key={eachComic.name}>{eachComic.name}</li>
      //           )
      //         )}
      //       </div>
      //     </div>

      //     <div className="api-info-display-block">
      //       <h3 className="title">Series</h3>

      //           </div>*
    );
  }
};

export default FetchByCategory;
