import { useContext, useState, useEffect } from "react";
import { MarvelContext } from "../MarvelContext";
import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import { List, ListItem } from "@mui/material";
import { styled } from "@mui/material/styles";
import Button from '@mui/material/Button';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';



const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "85%",
  overflow: "scroll",
  height: "100vh",
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ComicData = ({}) => {
  const {
    marvelComicData,
    marvelComicDetailedData,
    setMarvelComicDetailedData,
    fetchComicDetailed,
    setLocalStorageData,
    localStorageData

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

  const Demo = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));



  console.log(marvelComicDetailedData);

  return Object.keys(marvelComicData).length === 0 ? (
    <div>
      {/* {console.log(Object.keys(marvelHeroeData).length)} */}
      <p>NO HAY NAD</p>
    </div>
  ) : (
    <div className="heroe-data">
      <div className="api-info-display-block">
        <h2>COMICS</h2>

        <div className="comic-list">
          
          {marvelComicData.data.results.map((eachComic: any) => (
         <div style={{display: "flex", flexDirection: "column"}}>
           <Button onClick={ ()=> console.log(eachComic.id + "fav")} key={eachComic.id + "fav"} style={{ width: "20px", height: "20px" }} variant="outlined"><FavoriteBorderIcon></FavoriteBorderIcon></Button>
            <Card
              onClick={() => handleOpen(eachComic.id)}
              key={eachComic.id}
              sx={{ width: 300 }}
            >
              <CardMedia
                component="img"
                height="140"
                image={`${eachComic.thumbnail.path}.${eachComic.thumbnail.extension}`}
                alt="green iguana" />


              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {eachComic.title}
                </Typography>
              </CardContent>
            </Card>
           </div>
              

            // <div
            //   onClick={() => handleOpen(eachComic.id)}
            //   key={eachComic.id}
            //   className="comic-style"
            // >
            //   <img
            //     className="comic-img"
            //     src={`${eachComic.thumbnail.path}.${eachComic.thumbnail.extension}`}
            //     alt="ComicImg"
            //   />
            //   <p className="comic-tittle">{eachComic.title}</p>
            //   <div className="comic-release-info">
            //     <p style={{ fontWeight: "bold", width: "150px" }}>Release </p>
            //     <p style={{ fontWeight: "bold", width: "150px" }}>
            //       {" "}
            //       {eachComic.dates[0].date.slice(0, 10)}
            //     </p>
            //   </div>
            // </div>
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
            <Box sx={{ flexGrow: 1, maxWidth: 1500,  display: "flex", justifyContent: "center" }}>
              <Card sx={{ width: 1200, height: 800, display: "flex"}}>
                <CardMedia
                  component="img"
                  height="800px"
                  width="527px"
                  image={`${marvelComicDetailedData.thumbnail.path}.${marvelComicDetailedData.thumbnail.extension}`}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {marvelComicDetailedData.title}
                  </Typography>

                  <Grid item xs={12} md={6}>
                    <Typography
                      sx={{ mt: 4, mb: 2 }}
                      variant="h6"
                      component="div"
                    >
                      Authors
                    </Typography>
                    <Demo>
                      <List dense={false}>
                        <ListItem
                          style={{ display: "flex", flexDirection: "column"}}
                        >
                          {marvelComicDetailedData.creators.items.map(
                            (eachCreator: any) => (
                              <ListItemText
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "left",
                                }}
                                primary={eachCreator.name}
                                secondary={eachCreator.role}
                              />
                            )
                          )}
                        </ListItem>
                      </List>
                    </Demo>
                  </Grid>

                  <List dense={false}>
                    <ListItem
                      style={{ display: "flex", flexDirection: "row" }}
                    >
                      <ListItemText
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "left",
                        }}
                        primary={marvelComicDetailedData.prices[0].price}
                        secondary="Price"
                      />
                      <ListItemText
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "left",
                        }}
                        primary={marvelComicDetailedData.dates[0].date.slice(
                          0,
                          10
                        )}
                        secondary="On Sale"
                      />
                         <ListItemText
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "left",
                        }}
                        primary={<a href={marvelComicDetailedData.urls[0].url}>BUY</a>}
                      />
                    </ListItem>
                    



                  </List>
                </CardContent>
              </Card>
            </Box>

            // <>
            //   <h1>{marvelComicDetailedData.title}</h1>
            //   <img
            //     className="comic-img"
            //     src={`${marvelComicDetailedData.thumbnail.path}.${marvelComicDetailedData.thumbnail.extension}`}
            //     alt="ComicImg"
            //   />
            //   <p>Price: {marvelComicDetailedData.prices[0].price}</p>
            //   <p>
            //     {" "}
            //     On Sale: {marvelComicDetailedData.dates[0].date.slice(
            //       0,
            //       10
            //     )}{" "}
            //   </p>
            //   <a href={marvelComicDetailedData.urls[0].url}>Buy: </a>
            //   <h1>Creators</h1>
            //   <div>
            //     {marvelComicDetailedData.creators.items.map(
            //       (eachCreator: any) => (
            //         <li key={eachCreator.name}>
            //           {eachCreator.name} <strong>Role:</strong>{" "}
            //           {eachCreator.role}
            //         </li>
            //       )
            //     )}
            //   </div>
            //   <h1>Characters</h1>
            //   <div>
            //     {marvelComicDetailedData.characters.items.map(
            //       (eachCreator: any) => (
            //         <li key={eachCreator.name}>{eachCreator.name}</li>
            //       )
            //     )}
            //   </div>

            //   <a href={`${marvelComicDetailedData.urls[0].url}`}>
            //     {" "}
            //     Visit Oficial Wiki
            //   </a>
            // </>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default ComicData;
