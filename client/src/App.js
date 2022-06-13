import './App.css';
import { Routes, Route } from 'react-router-dom';
import LandingPage from "./components/LandingPage.jsx";
import Home from "./components/Home.jsx";
import Detail from "./components/Detail.jsx";
import NewRecipe from "./components/NewRecipe.jsx";





function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<LandingPage />} /> 
        <Route exact path="/home" element={<Home/>} /> 
        <Route exact path="/recipes/:id" element={<Detail/>} />
        <Route exact path="/recipes" element={<NewRecipe/>} />
      </Routes>
    </div>
  );
}

export default App;
