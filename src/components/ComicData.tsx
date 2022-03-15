import { useContext, useState, useEffect } from "react";
import { MarvelContext } from "../MarvelContext";
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "85%",
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ComicData = ({}) => {
  const {
    marvelComicData,
    marvelHeroeData,
    marvelComicDetailedData,
    setMarvelComicDetailedData,
    fetchComicDetailed,
  }: any = useContext(MarvelContext);

  const [open, setOpen] = React.useState(false);
  const [comicSelected, setComicSelected] = useState();

  const handleOpen = async (key: any) => {
    let misc = key;
    function validUpc(element: any, index: any, array: any) {
      return element.id === misc;
    }
    let selectedObject: any = marvelComicData.data.results.filter(validUpc);
    // console.log(selectedObject);
    let selectedComic = selectedObject[0].id;
    // console.log(selectedComic);

  
   
    const DetailedComicDataResponse = await fetchComicDetailed(selectedComic);
    setMarvelComicDetailedData(DetailedComicDataResponse.data.results[0]);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  console.log(marvelComicDetailedData);

  return Object.keys(marvelComicData).length === 0 ? (
    <div>
      {/* {console.log(Object.keys(marvelHeroeData).length)} */}
      <p>NO HAY NAD</p>
    </div>
  ) : (
    <div className="heroe-data">
      <div className="api-info-display-block">
        <h1>COMICS</h1>
        {/* {console.log(Object.keys(marvelComicData).length)} */}
        <div className="comic-list">
          {marvelComicData.data.results.map((eachComic: any) => (
            <div
              onClick={() => handleOpen(eachComic.id)}
              key={eachComic.id}
              className="comic-style"
            >
              <img
                className="comic-img"
                src={`${eachComic.thumbnail.path}.${eachComic.thumbnail.extension}`}
                alt="ComicImg"
              />
              <p className="comic-tittle">{eachComic.title}</p>
              {/* <div className="comic-release-info">
                <p style={{ fontWeight: "bold", width: "150px" }}>Release </p>
                <p style={{ fontWeight: "bold", width: "150px" }}>
                  {" "}
                  {eachComic.dates[0].date.slice(0, 10)}
                </p>
              </div> */}
           
            </div>
          ))}
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {Object.keys(marvelComicDetailedData).length === 0 ? (
            <p>Hola</p>
          ) : (
            <>
              <h1>{marvelComicDetailedData.title}</h1>
              <img
                className="comic-img"
                src={`${marvelComicDetailedData.thumbnail.path}.${marvelComicDetailedData.thumbnail.extension}`}
                alt="ComicImg"
              />
              <p>
                Price: {marvelComicDetailedData.prices[0].price}
              </p>
              <p> On Sale: {marvelComicDetailedData.dates[0].date.slice(0, 10)} </p>
              <a href={marvelComicDetailedData.urls[0].url}>Buy: </a>
              <h1>Creators</h1>
              <div>
                {marvelComicDetailedData.creators.items.map(
                  (eachCreator: any) => (
                    <li key={eachCreator.name}>{eachCreator.name} <strong>Role:</strong> {eachCreator.role}</li>
                  )
                )}
              </div>
              <h1>Characters</h1>
              <div>
                {marvelComicDetailedData.characters.items.map(
                  (eachCreator: any) => (
                    <li key={eachCreator.name}>{eachCreator.name}</li>
                  )
                )}

              </div>

              <a href={`${marvelComicDetailedData.urls[0].url}`}> Visit Oficial Wiki</a>

            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default ComicData;
