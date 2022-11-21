import React, {useState} from 'react';
import Card from "../../components/Card/Card";
import {cards} from "../../store/cards";

const createField = (size) => {
    const deck = shuffle(cards)
        .slice(0, size)
        .map((imageUrl, i) => ({
            id: i,
            image: "./assets/images/cards/" + imageUrl,
            isFlipped: true,
            isFlippable: true
        }))
        .flatMap(card => [card, {...card, id: card.id + '_pair'}]);

    return shuffle(deck)
}

const shuffle = (arr) => {
    return arr.sort(() => .5 - Math.random());
}

const Game = ({cardNumber}) => {
        const [pokemons, setPokemons] = useState(createField(cardNumber))

        const cardFlip = (id) => {
            setPokemons(prevState => prevState.map(item => (
                    item.id === id ? {...item, isFlipped: !item.isFlipped} : item
                ))
            )
        }


        return (
            <div>
                <div className="grid grid-cols-5">
                    {pokemons.map(card =>
                        <Card card={card} onClick={() => {
                            cardFlip(card.id)
                        }} key={card.id}/>
                    )}
                </div>


            </div>
        );
    }
;

export default Game;
