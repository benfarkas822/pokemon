import React, {useEffect, useState} from 'react';
import Card from "../../components/Card/Card";
import {cards} from "../../store/cards";
import WinnerModal from "../../components/WinnerModal/WinnerModal";
import classes from "./Game.module.scss";
import {NavLink} from "react-router-dom";

const createField = (size) => {
    const deck = shuffle(cards)
        .slice(0, size)
        .map((imageUrl, i) => ({
            id: i + imageUrl,
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

const Game = ({cardNumber, setCardNumber}) => {
        const localGame = localStorage.getItem('game');
        const [pokemons, setPokemons] = useState(localGame ? JSON.parse(JSON.parse(localGame).field) : createField(cardNumber));
        const [firstItem, setFirstItem] = useState(localGame ? JSON.parse(localGame).firstItem : null);
        const [secondItem, setSecondItem] = useState(localGame ? JSON.parse(localGame).secondItem : null);
        const [pairCounter, setPairCounter] = useState(localGame ? JSON.parse(localGame).pairCounter : 0);
        const [tries, setTries] = useState(localGame ? JSON.parse(localGame).tries : 0);
        const [winnerModalVisible, setWinnerModalVisible] = useState(false);
        const [modalDismissed, setModalDismissed] = useState(localGame ? JSON.parse(localGame).modalDismissed : false);
        const [newDeckSize, setNewDeckSize] = useState(3)

        useEffect(() => {
            if (secondItem !== null) {
                setTimeout(() => {
                    (firstItem.image === secondItem.image && firstItem.id !== secondItem.id) ? pairFind(firstItem.id, secondItem.id) : pairMissed(firstItem.id, secondItem.id)
                }, 1000);
                setFirstItem(null);
                setSecondItem(null);
            }

        }, [secondItem]);

        useEffect(() => {
            !modalDismissed && pairCounter === cardNumber && setWinnerModalVisible(true)
        }, [pairCounter]);

        useEffect(() => {
            localStorage.setItem('game', JSON.stringify({
                field: JSON.stringify(pokemons),
                cardNumber: cardNumber,
                pairCounter: pairCounter,
                tries: tries,
                firstItem: firstItem,
                secondItem: secondItem,
                modalDismissed: modalDismissed
            }))
        }, [pokemons, modalDismissed])

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
            <div className={`${classes.game} min-h-screen`}>
                <div className="flex items-center justify-center w-full gap-5 bg-sky-800 py-4 mb-6"><NavLink to={'/'}
                                                                                                             className="btn-primary">Home</NavLink>
                    <select name="deck_size_picker" id="deck_size_picker" className={'select'} onChange={e => {
                        setNewDeckSize(parseInt(e.target.value))
                    }}>
                        <option selected disabled={true} hidden={true} className={'uppercase'}>Deck Size</option>
                        <option value="3">easy</option>
                        <option value="5">normal</option>
                        <option value="7">difficult</option>
                        <option value="9">extreme</option>
                    </select>
                    <div className="btn-primary" onClick={() => {
                        setPokemons(createField(newDeckSize));
                        setCardNumber(newDeckSize)
                        setTries(0);
                        setPairCounter(0);
                        setFirstItem(null);
                        setSecondItem(null);
                        setModalDismissed(false)
                    }}>start new game
                    </div>
                </div>
                <div className="grid grid-cols-3 items-center justify-items-center mb-5 text-yellow-300">
                    <div className={'text-3xl'}>Current tries: {tries}</div>
                    <div className={'text-3xl'}>Pairs found: {pairCounter}</div>
                    <div className="btn-primary" onClick={() => {
                        setPokemons(createField(localGame ? JSON.parse(localGame).cardNumber : cardNumber));
                        setTries(0);
                        setPairCounter(0);
                        setFirstItem(null);
                        setSecondItem(null);
                        setModalDismissed(false)
                    }}>restart
                    </div>
                </div>
                <div className="grid items-center justify-items-center grid-cols-4 gap-5"
                >

                    {pokemons.map(card =>
                        <Card card={card} onClick={() => {
                            cardClick(card)
                        }} key={card.id}/>
                    )}
                </div>
                {winnerModalVisible &&
                    <WinnerModal setWinnerModalVisible={setWinnerModalVisible} tries={tries} cardNumber={cardNumber}
                                 setModalDismissed={setModalDismissed}/>}


            </div>
        );
    }
;

export default Game;
