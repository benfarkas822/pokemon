import React, {useState} from 'react';
import {NavLink} from "react-router-dom";

const findDifficulty = (num) => {
    switch (num) {
        case 3:
            return "easy";
        case 5:
            return "normal";
        case 7:
            return "difficult";
        case 9:
            return "extreme";
    }
}

const WinnerModal = ({setWinnerModalVisible, tries, cardNumber, setModalDismissed}) => {
    const [name, setName] = useState('');
    const [difficulty] = useState(findDifficulty(cardNumber))
    const localFame = JSON.parse(localStorage.getItem('fame')) ?? []

    const saveToList = () => {
        const newArr = [...localFame, {name: name, difficulty: difficulty, tries: tries}]
        localStorage.setItem('fame', JSON.stringify(newArr))
        setWinnerModalVisible(false);
        setModalDismissed(true)
    }

    return (
        <div
            className={'bg-sky-100 h-1/2 w-4/5 lg:h-1/3 lg:w-1/3 absolute top-1/4 left-1/2 -translate-x-1/2 rounded-xl text-center'}>
            <h2 className={'text-yellow-400 text-3xl my-5'}>Congratulations!</h2>
            You won the game on {difficulty} difficulty with {tries} tries!
            <p>
                You can save your score to the hall of Fame!
            </p>
            <div className="flex flex-col items-center gap-5">
                <label htmlFor="name">Name</label>
                <input type="text" id={'name'} className={'w-fit'} value={name} onChange={e => {
                    setName(e.target.value)
                }}/>
                <div className="btn-primary" onClick={() => saveToList()}>Save</div>
            </div>

            <NavLink to={'/hall-of-fame'} className="btn-primary absolute bottom-5 left-5">Visit the hall of fame
            </NavLink>
            <div className="btn-primary absolute bottom-5 right-5" onClick={() => {
                setWinnerModalVisible(false);
                setModalDismissed(true)
            }}>Close
            </div>
        </div>
    );
};

export default WinnerModal;
