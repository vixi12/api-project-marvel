import { useContext } from "react";
import { MarvelContext } from "../MarvelContext";
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

const ComicDetail = () => {
  const { marvelComicDetailedData, open, setOpen }: any =
    useContext(MarvelContext);

  const handleClose = () => setOpen(false);

  const Demo = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {Object.keys(marvelComicDetailedData).length === 0 ? (
            null
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

export default ComicDetail;
