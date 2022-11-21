import React, {useState} from 'react';
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home/Home";
import Game from "./pages/Game/Game";
import HallOfFame from "./pages/HallOfFame/HallOfFame";


const App = () => {
    const [cardNumber, setCardNumber] = useState(3);
    return (
        <Routes>
            <Route path="/" element={<Home setCardNumber={setCardNumber}/>}/>
            <Route path="/hall-of-fame" element={<HallOfFame/>}/>
            <Route path="/game" element={<Game cardNumber={cardNumber} setCardNumber={setCardNumber}/>}/>
        </Routes>
    );
};

export default App;
