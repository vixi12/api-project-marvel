import { useContext, FC } from "react";
import { MarvelContext } from "../MarvelContext";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import * as Ttype from "../types";
import { toast } from "react-hot-toast";

interface Props {
  eachComic: {
    id: Number;
    title: String;
    thumbnail: {
      path: String;
      extension: String;
    };
  };
}

const Comic: FC<Props> = ({ eachComic }) => {
  const {
    setOpen,
    setMarvelComicDetailedData,
    fetchComicDetailed,
    marvelComicData,
    localStorageData,
    dispatch
  }: any = useContext(MarvelContext);

  const handleOpen = async (key: Number) => {
    const selectedComic = matchOnClick(key);
    const DetailedComicDataResponse: Ttype.fetchedComic =
      await fetchComicDetailed(selectedComic);

    setMarvelComicDetailedData(DetailedComicDataResponse.data.results[0]);

    setOpen(true);
  };

  const matchOnClick = (key: Number) => {
    let selectedObject: Array<Ttype.comicObject>;
    selectedObject = marvelComicData.data.results.filter(
      (element: { id: Number }) => element.id === key
    );
    let selectedComic = selectedObject[0].id;
    return selectedComic;
  };


  const setFavorite = async (key: Number) => {
    let comicSelected = matchOnClick(key);

    let exists: Array<boolean> = localStorageData.map(
      (comic: Ttype.storedComicObject) => comic.newState.id === comicSelected
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
    toast.success("Added!");
  };

  return (
    <div>
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
    </div>
  );
};

export default Comic;
