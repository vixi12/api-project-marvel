import "./App.css";
import FetchByCategory from "./components/FetchByCategory";
import HeroeData from "./components/HeroeDataDisplay"
import ComicData from "./components/ComicData"
import { Modal } from "@mui/material";



function App() {



  return <div className="App">
    <FetchByCategory/>
    <HeroeData/>
    <ComicData/>
  </div>;
}

export default App;
function componentWillMount() {
  throw new Error("Function not implemented.");
}

