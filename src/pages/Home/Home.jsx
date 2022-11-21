import React, {useEffect, useState} from 'react';
import {NavLink} from "react-router-dom";
import classes from "./Home.module.scss"

const Home = ({setCardNumber}) => {

    const [deckSize, setDeckSize] = useState(3);

    useEffect(() => {
            setCardNumber(deckSize)
        }, [deckSize]
    )

    return (
        <>

            <div className={`${classes.home} min-h-screen flex justify-center items-center`}>
                <div className="flex flex-col">
                    <img src="./assets/images/pokemon-title.png" alt="Pokemon Title"/>
                    <div className={'flex gap-5'}>
                        <select name="deck_size_picker" id="deck_size_picker" className={'select'} onChange={e => {
                            setDeckSize(parseInt(e.target.value))
                        }}>
                            <option selected disabled={true} hidden={true}>Deck Size</option>
                            <option value="3">easy</option>
                            <option value="5">normal</option>
                            <option value="7">difficult</option>
                            <option value="9">extreme</option>
                        </select>
                        <NavLink to={'/game'} className={'btn-primary'}>Start New Game</NavLink>
                    </div>
                </div>


            </div>
        </>
    )
        ;
}

export default Home;
