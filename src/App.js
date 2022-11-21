import React, {useState} from 'react';
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home/Home";
import Game from "./pages/Game/Game";


const App = () => {
    const [cardNumber, setCardNumber] = useState(3);
    return (
        <Routes>
            <Route path="/" element={<Home setCardNumber={setCardNumber}/>}/>
            <Route path="/game" element={<Game cardNumber={cardNumber}/>}/>
        </Routes>
    );
};

export default App;
