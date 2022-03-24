import "./App.css";
import FetchByCategory from "./components/FetchByCategory";
import HeroeData from "./components/HeroeDataDisplay"
import ComicData from "./components/ComicData"
import { Modal } from "@mui/material";
import { Toaster } from "react-hot-toast";



function App() {

  



  return <div className="App">
    <FetchByCategory/>
    <HeroeData/>
    <ComicData/>
    <Toaster
  position="top-center"
  reverseOrder={false}
/>
  </div>;
}

export default App;


