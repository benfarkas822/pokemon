import React, {useState} from 'react';
import Card from "../../components/Card/Card";
import {cards} from "../../store/cards";

const createField = (size) => {
    const deck = cards.map((imageUrl, i) => ({
        id: i,
        image: "./assets/images/cards/" + imageUrl,
        isFlipped: false,
        isFlippable: true
    }))
    return deck
}

const Game = ({cardNumber}) => {
        const [pokemons, setPokemons] = useState(createField(cardNumber))

        const cardFlip = () => {

        }

        return (
            <div>
                <div className="grid grid-cols-5">
                    {pokemons.map(p =>
                        <Card card={p} onClick={() => {
                            cardFlip()
                        }} key={p.id}/>
                    )}
                </div>


            </div>
        );
    }
;

export default Game;
