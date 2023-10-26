import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateTimer,
  simulateDiceRoll,
  startNewRound,
  checkResult,
  resetGame,
  updateTimerAndMsg
} from './slice/gameSlice';

import Balance from './components/Balance/Balance';
import Timer from './components/Timer/Timer';
import GameArea from './components/GameArea/GameArea';
import Dice from './components/Dice/Dice';
import Result from './components/Result/Result';

import './App.css';

function App() {
  const dispatch = useDispatch();
  const {
    timer,
    bettingTime,
    diceResult,
    roundOutcome,
    gameStagesId,
    gameStagesMsg
  } = useSelector((state) => state.game);

  const startNewRoundHandler = () => {
    dispatch(startNewRound());
  };

  useEffect(() => {
    if (timer > 0) {
      const timerId = setInterval(() => {
        dispatch(updateTimer());
      }, 1000);

      return () => clearInterval(timerId);
    }

    if (timer === 0) {

      if (bettingTime) {
        dispatch(updateTimerAndMsg("rolling"));
        const timeOut = setTimeout(() => {
          dispatch(simulateDiceRoll());
        }, 2000);

        return () => clearTimeout(timeOut);
      } else if(gameStagesId === 2) {
        dispatch(checkResult());
      } else if (gameStagesId === 3) {
        dispatch(updateTimerAndMsg("idle"));
      }
    }
  }, [timer, dispatch, roundOutcome, diceResult, bettingTime, gameStagesId ]);

  const ResetHandler = () => {
    dispatch(resetGame());
  };

  return (
    <div className='mainContainer'>
      <h1>{gameStagesMsg}</h1>
      <Balance />
      <Timer />
      <GameArea />
      <Dice />
      <Result />
      <div className="buttonWrapper">
        <button className="button" onClick={startNewRoundHandler}>Start New Round</button>
        <button className="button" onClick={ResetHandler}>Reset</button>
      </div>
    </div>
  );
}

export default App;
