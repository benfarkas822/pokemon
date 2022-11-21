import React, {useEffect, useState} from 'react';
import Card from "../../components/Card/Card";
import {cards} from "../../store/cards";
import WinnerModal from "../../components/WinnerModal/WinnerModal";

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
        const [pokemons, setPokemons] = useState(localStorage.getItem('game') ? JSON.parse(JSON.parse(localStorage.getItem('game')).field) : createField(cardNumber));
        const [firstItem, setFirstItem] = useState(null);
        const [secondItem, setSecondItem] = useState(null);
        const [pairCounter, setPairCounter] = useState(localStorage.getItem('game') ? JSON.parse(localStorage.getItem('game')).pairCounter : 0);
        const [tries, setTries] = useState(localStorage.getItem('game') ? JSON.parse(localStorage.getItem('game')).tries : 0);
        const [winnerModalVisible, setWinnerModalVisible] = useState(false);

        useEffect(() => {
            if (secondItem !== null) {
                setTimeout(() => {
                    firstItem.image === secondItem.image ? pairFind(firstItem.id, secondItem.id) : pairMissed(firstItem.id, secondItem.id)
                }, 1000);
                setFirstItem(null);
                setSecondItem(null);
            }

        }, [secondItem]);

        useEffect(() => {
            pairCounter === cardNumber && setWinnerModalVisible(true)
        }, [pairCounter]);

        useEffect(() => {
            localStorage.setItem('game', JSON.stringify({
                field: JSON.stringify(pokemons),
                cardNumber: cardNumber,
                pairCounter: pairCounter,
                tries: tries
            }))
        }, [pokemons])

        const flipCard = (id) => {
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
            flipCard(firstCardId);
            flipCard(secondCardId);
            setTries(prevState => prevState += 1)
        }

        const cardClick = (clickedCard) => {
            firstItem === null ? setFirstItem(clickedCard) : setSecondItem(clickedCard);
            flipCard(clickedCard.id)
        }


        return (
            <div>
                <div className="grid items-center justify-items-center grid-cols-4"
                >
                    {pairCounter}
                    {tries}
                    {pokemons.map(card =>
                        <Card card={card} onClick={() => {
                            cardClick(card)
                        }} key={card.id}/>
                    )}
                </div>
                {winnerModalVisible &&
                    <WinnerModal setWinnerModalVisible={setWinnerModalVisible} tries={tries} cardNumber={cardNumber}/>}


            </div>
        );
    }
;

export default Game;
