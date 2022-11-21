import React, {useState} from 'react';

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

const WinnerModal = ({setWinnerModalVisible, tries, cardNumber}) => {
    const [name, setName] = useState('');
    const [difficulty, setDifficulty] = useState(findDifficulty(cardNumber))

    return (
        <div className={'bg-sky-300 h-1/2 w-screen lg:h-1/3 lg:w-1/3 absolute top-1/4 left-1/2 -translate-x-1/2'}>
            <div>Congratulations!</div>
            You won the game on {difficulty} difficulty with {tries} tries!
            <p>
                You can save your score to the hall of Fame!
            </p>
            <label htmlFor="name">Name</label>
            <input type="text" id={'name'} value={name} onChange={e => {
                setName(e.target.value)
            }}/>
            <div className="" onClick={() => {
                setWinnerModalVisible(false)
            }}>Close
            </div>
        </div>
    );
};

export default WinnerModal;
