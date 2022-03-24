import { useContext, useState} from "react";
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
import Button from "@mui/material/Button";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {toast} from "react-hot-toast";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "85%",
  overflow: "auto",
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
    dispatch,
    localStorageData,
  }: any = useContext(MarvelContext);

  const [open, setOpen] = useState(false);

  const matchOnClick = (key: any) => {
    function validUpc(element: any, index: any, array: any) {
      return element.id === key;
    }

    let selectedObject: any = marvelComicData.data.results.filter(validUpc);

    let selectedComic = selectedObject[0].id;
    return selectedComic;
  };

  const setFavorite = async (key: any) => {
    let comicSelected = matchOnClick(key);


    let exists = localStorageData.map(
      (comic: any) => comic.newState.id === comicSelected
    );

    if (exists.includes(true)) {
      alert("You've already added that comic to favourites");
    } else {
      let DetailedComicDataResponse = await fetchComicDetailed(comicSelected);
      dispatch({
        type: "setState",
        newState: DetailedComicDataResponse.data.results[0],
      });
    }
    
    toast.success("Added!")

  };

  const handleOpen = async (key: any) => {
    const selectedComic = matchOnClick(key);

    const DetailedComicDataResponse = await fetchComicDetailed(selectedComic);
    setMarvelComicDetailedData(DetailedComicDataResponse.data.results[0]);
    setOpen(true);
  };

  const matchOnClickStored = (key: any) => {
    function validUpc(element: any, index: any, array: any) {
      return element.newState.id === key;
    }

    let selectedObject: any = localStorageData.filter(validUpc);

    let selectedComic = selectedObject[0].newState.id;
    return selectedComic;
  };

  const handleOpenStored = async (key: any) => {
    const selectedComic = matchOnClickStored(key);

    const DetailedComicDataResponse = await fetchComicDetailed(selectedComic);
    setMarvelComicDetailedData(DetailedComicDataResponse.data.results[0]);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const Demo = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));


  return Object.keys(marvelComicData).length === 0 ? (
 
    <div style={{display: "flex", flexDirection: "column"}}>
            <h1 style={{textAlign: "center", padding:"2rem"}}>Favorite comics:</h1>
      <div className="comic-list">

        {localStorageData.map((eachComic: any) => (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Card
              onClick={() => handleOpenStored(eachComic.newState.id)}
              key={eachComic.newState.id + "comidId"}
              sx={{ width: 300 }}
            >
              <CardMedia
                component="img"
                height="140"
                image={`${eachComic.newState.thumbnail.path}.${eachComic.newState.thumbnail.extension}`}
                alt="green iguana"
              />

              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {eachComic.newState.title}
                </Typography>
              </CardContent>
            </Card>
          </div>
        ))}
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
            <Box
              sx={{
                flexGrow: 1,
                maxWidth: 1500,
                display: "flex",
                justifyContent: "center",
                overflow: "scroll",
              }}
            >
              <Card sx={{ width: 1200, height: 800, display: "flex" }}>
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
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          {marvelComicDetailedData.creators.items.map(
                            (eachCreator: any) => (
                              <ListItemText
                                key={eachCreator.id + "creator"}
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
                    <ListItem style={{ display: "flex", flexDirection: "row" }}>
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
                        primary={
                          <a href={marvelComicDetailedData.urls[0].url}>BUY</a>
                        }
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Box>
          )}
        </Box>
      </Modal>
    </div>
  ) : (
    <div className="heroe-data">
      <div className="api-info-display-block">
        <h2>COMICS</h2>

        <div className="comic-list">
          {marvelComicData.data.results.map((eachComic: any) => (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Button
                onClick={() => setFavorite(eachComic.id)}
                key={eachComic.id + "fav"}
                style={{ width: "20px", height: "20px" }}
                variant="outlined"
              >
                <FavoriteBorderIcon></FavoriteBorderIcon>
              </Button>
              <Card
                onClick={() => handleOpen(eachComic.id)}
                key={eachComic.id + "Comid-ID"}
                sx={{ width: 300 }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={`${eachComic.thumbnail.path}.${eachComic.thumbnail.extension}`}
                  alt="green iguana"
                />

                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {eachComic.title}
                  </Typography>
                </CardContent>
              </Card>
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
            <Box
              sx={{
                flexGrow: 1,
                maxWidth: 1500,
                display: "flex",
                justifyContent: "center",
                overflow: "scroll",
              }}
            >
              <Card sx={{ width: 1200, height: 800, display: "flex" }}>
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
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          {marvelComicDetailedData.creators.items.map(
                            (eachCreator: any) => (
                              <ListItemText
                                key={eachCreator.id + "creator"}
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
                    <ListItem style={{ display: "flex", flexDirection: "row" }}>
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
                        primary={
                          <a href={marvelComicDetailedData.urls[0].url}>BUY</a>
                        }
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Box>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default ComicData;
