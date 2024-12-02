import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import Pages from "./pages/Pages";
import LoadingBar from "react-top-loading-bar";

function App() {
  // const [progress, setProgress] = useState(0)

  // useEffect(()=>{
  //   setProgress(20)

  //   setTimeout(() => {
  //     setProgress(40)
  //   }, 100);

  //   setTimeout(() => {
  //     setProgress(100)
  //   }, 400);
  // }, [])
  return (
    <>
     {/* <LoadingBar
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      /> */}
      <Navbar />
      <Search />
      <Pages />
    </>
  );
}

export default App;
