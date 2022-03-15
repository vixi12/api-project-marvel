import { useContext, useState, useEffect } from "react";
import { MarvelContext } from "../MarvelContext";
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import Button from "@mui/material/Button";
import { width } from "@mui/system";

const FetchByCategory = ({}) => {
  const { fetchHeroes, marvelHeroeData, setMarvelHeroeData, fetchComics, setMarvelComicData }: any =
    useContext(MarvelContext);

  const [inputState, setInputState]: any = useState("");

  const handleFetch = async () => {
    const response = await fetchHeroes(inputState);
    const responseComics = await fetchComics(response.data.results[0].id);

    function validComics(element: any, index: any, array: any) {
      return element.description !== "" && element.description !== null;
    }

    const filteredResponse = responseComics.data.results.filter(validComics)
    // console.log(filteredResponse, "AQUI")
    // console.log(response, responseComics);
    setMarvelHeroeData(response);
    console.log(response)
    setMarvelComicData(responseComics)
  };

  // useEffect(() => {

  // },[marvelHeroeData]);

  return (
    <div className="fetchComp">
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
      {console.log(inputState)}
    </div>
  );
};

export default FetchByCategory;
