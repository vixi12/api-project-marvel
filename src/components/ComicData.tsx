import { useContext } from "react";
import { MarvelContext } from "../MarvelContext";

import * as Ttype from "../types";
import ComicDetail from "./ComicDetail";
import FavoriteComics from "./FavouriteComics";
import Comic from "./Comic";

const ComicData = () => {
  const {
    marvelComicData,

  }: any = useContext(MarvelContext);

  return Object.keys(marvelComicData).length === 0 ? (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h1 style={{ textAlign: "center", padding: "2rem" }}>Favorite Comics</h1>
      <FavoriteComics />
    </div>
  ) : (
    <div className="heroe-data">
      <div className="api-info-display-block">
        <h2>Comics</h2>

        <div className="comic-list">
          {marvelComicData.data.results.map((eachComic: Ttype.comicObject) => (
            <Comic eachComic={eachComic} />
          ))}
        </div>
      </div>
      <ComicDetail />
    </div>
  );
};

export default ComicData;
