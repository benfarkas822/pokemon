import React, {useEffect, useState} from 'react';
import {NavLink} from "react-router-dom";
import classes from "./HallOfFame.module.scss"

const HallOfFame = () => {
    const localFame = JSON.parse(localStorage.getItem("fame"));
    console.log(localFame)
    return (
        <>

            <div className={`${classes.home} min-h-screen flex justify-center items-center`}>
                <div className="flex flex-col bg-sky-200 w-2/3 rounded-lg p-8 text-xl">
                    <div className={'grid grid-cols-3 gap-5 justify-items-center'}>
                        <div className="text-xl">Name</div>
                        <div className="text-xl">Difficulty</div>
                        <div className="text-xl">Tries</div>
                        {localFame.map(winner => <>
                            <div className="text-xl">{winner.name}</div>
                            <div className="text-xl">{winner.difficulty}</div>
                            <div className="text-xl">{winner.tries}</div>
                        </>)}
                    </div>
                    <NavLink className="btn-primary" to={'/'}>Home</NavLink>
                </div>
            </div>
        </>
    )
        ;
}

export default HallOfFame;
