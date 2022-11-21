import React, {useState} from 'react';
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home/Home";

function Memory() {
    return null;
}

const App = () => {
  const [cardNumber, setCardNumber] = useState(3);
  return (
      <Routes>
        <Route path="/" element={<Home setCardNumber={setCardNumber}/>}/>
        <Route path="/game" element={<Memory/>}/>
      </Routes>
  );
};

export default App;
