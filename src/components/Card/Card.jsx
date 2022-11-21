import React from "react";
import classes from './Card.module.scss';
import bg from "./card-back.png";


const Card = ({card, onClick}) => {
    return (
        <div className={classes['container']} onClick={() => onClick()}>
            <div
                className={`${classes.card} ${(card.isFlipped ? classes.flipped : '')} ${(card.isFlippable) ? '' : 'pointer-events-none'}`}>
                <img className={classes.side} src={card.image}/>
                <div className={`${classes.side} ${classes.back}`}>
                    <img src={bg}/>
                </div>
            </div>
        </div>

    );
}

export default Card;
