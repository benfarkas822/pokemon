import React, {useEffect, useState} from 'react';
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
        const [pokemons, setPokemons] = useState(createField(cardNumber));
        const [firstItem, setFirstItem] = useState(null);
        const [secondItem, setSecondItem] = useState(null);
        const [pairCounter, setPairCounter] = useState(0);
        const [tries, setTries] = useState(0);
        const [winnerModalVisible, setWinnerModalVisible] = useState(false)

        useEffect(() => {
            if (secondItem !== null) {
                setTimeout(() => {
                    firstItem.image === secondItem.image ? pairFind(firstItem.id, secondItem.id) : pairMissed(firstItem.id, secondItem.id)
                    setFirstItem(null);
                    setSecondItem(null);
                }, 1000)
            }

        }, [secondItem]);

        useEffect(() => {
            pairCounter === cardNumber && setWinnerModalVisible(true)
        }, [pairCounter])

        const flippCard = (id) => {
            setPokemons(prevState => prevState.map(item => (
                    item.id === id ? {...item, isFlipped: !item.isFlipped} : item
                ))
            )
        }
        const disableCard = (id) => {
            setPokemons(prevState => prevState.map(item => (
                    item.id === id ? {...item, isFlippable: false} : item
                ))
            )
        }

        const pairFind = (firstCardId, secondCardId) => {
            disableCard(firstCardId);
            disableCard(secondCardId);
            setPairCounter(prevState => prevState += 1)
            setTries(prevState => prevState += 1)
        }
        const pairMissed = (firstCardId, secondCardId) => {
            flippCard(firstCardId);
            flippCard(secondCardId);
            setTries(prevState => prevState += 1)
        }

        const cardClick = (clickedCard) => {
            firstItem === null ? setFirstItem(clickedCard) : setSecondItem(clickedCard);
            flippCard(clickedCard.id)
        }


        return (
            <div>
                <div className="grid grid-cols-5">
                    {pairCounter}
                    {tries}
                    {pokemons.map(card =>
                        <Card card={card} onClick={() => {
                            cardClick(card)
                        }} key={card.id}/>
                    )}
                </div>


            </div>
        );
    }
;

export default Game;
