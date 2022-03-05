import { useContext, useState } from "react";
import { MarvelContext } from "../MarvelContext";
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import Button from "@mui/material/Button";
import { width } from "@mui/system";


const FetchByCategory = ({}) => {
  const { fetchHeroes, marvelHeroeData }: any = useContext(MarvelContext);

  const [inputState, setInputState] : any = useState("");

  return (
    <div className = "fetchComp">
      <Box className="api-input"
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
        <Button onClick={() => fetchHeroes(inputState)} variant="contained">
          Fetch
        </Button>
      </Box>
      {console.log(inputState)}

        <div className="api-info-display-block">
          {/* <h3>{marvelHeroeData.data.results[0].name}</h3> */}
        </div>
    </div>
  );
};

export default FetchByCategory;
