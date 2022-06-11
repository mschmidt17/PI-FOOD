import './App.css';
import { Routes, Route } from 'react-router-dom';
import LandingPage from "./components/LandingPage.jsx";
import Home from "./components/Home.jsx";




function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} /> 
        <Route path="/Home" element={<Home/>} />    
      </Routes>
    </div>
  );
}

export default App;
