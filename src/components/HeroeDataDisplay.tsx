import { useContext } from "react";
import { MarvelContext } from "../MarvelContext";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

const HeroeDataDisplay = ({}) => {
  const { marvelHeroeData }: any = useContext(MarvelContext);

  if (
    Object.keys(marvelHeroeData).length === 0 ||
    Object.keys(marvelHeroeData).length === 1
  ) {
    return null;
  } else {
    return (
      <div className="heroe-data">
        <div className="api-info-display-block">
          <h2>{marvelHeroeData.data.results[0].name}</h2>

          <Card sx={{ width: 700, display: "flex" }}>
            <CardMedia
              component="img"
              height="400"
              image={`${marvelHeroeData.data.results[0].thumbnail.path}.${marvelHeroeData.data.results[0].thumbnail.extension}`}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                {marvelHeroeData.data.results[0].description}
              </Typography>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
};

export default HeroeDataDisplay;
