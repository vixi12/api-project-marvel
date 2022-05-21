import { useContext, useState } from "react";
import { MarvelContext } from "../MarvelContext";
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { toast } from "react-hot-toast";

import Button from "@mui/material/Button";

const FetchByCategory = () => {
  const {
    fetchHeroes,
    setMarvelHeroeData,
    fetchComics,
    setMarvelComicData,
  }: any = useContext(MarvelContext);

  const [inputState, setInputState]: any = useState("");

  const handleFetch = async () => { 
    const response = await fetchHeroes(inputState);
    console.log(response)
    if (!response.data.count) {
      console.log("AQUI")
      toast.error("Ups, theres no character with that name");
    } else {
      const responseComics = await fetchComics(response.data.results[0].id);

      if (!responseComics.data.count) {
        toast.error("Ups, theres no comic to show with that name");
      }

      setMarvelHeroeData(response);

      setMarvelComicData(responseComics);
    }
  };

  return (
    <div className="fetchComp">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <h1> Welcome to your Comic Wiki</h1>
        <p>Please, introduce the name of your desired character from Marvel</p>
        <span>Note: Type the name of the character as in the example</span>
        <span>Ex: Captain America</span>
      </div>
      <Box
        className="api-input"
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          value={inputState}
          onChange={(event) => {
            setInputState(event.target.value);
          }}
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
        />
        <Button onClick={handleFetch} variant="contained">
          Fetch
        </Button>
      </Box>
    </div>
  );
};

export default FetchByCategory;
