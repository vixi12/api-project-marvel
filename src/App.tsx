import "./App.css";
import FetchHeroe from "./components/FetchHeroe";
import HeroeData from "./components/HeroeDataDisplay";
import ComicData from "./components/ComicData";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="App">
      <FetchHeroe />
      <HeroeData />
      <ComicData />
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default App;
