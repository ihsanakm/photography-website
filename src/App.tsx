import "./App.css";
import Header from "./assets/components/Header";
import { Routes, Route } from "react-router";
import Portfolio from "./pages/Portfolio";
import Grid from "./assets/components/Grid";

function App() {
  return (
    <div className=" relative bg-white">
      <Header />
      <Routes>
        <Route path="/" element={<Grid />} />
        <Route path="/portfolio" element={<Portfolio />} />
      </Routes>
    </div>
  );
}

export default App;
