



function GameArea() {
  const dispatch = useDispatch();
  const {bettingTime, bets} = useSelector((state) => state.game);


    const placeBetHandler = (position) => {
        if (bettingTime) {
            dispatch(placeBet({ position, amount: 1 }));
        }
    };

    return (
        <div className="mainDiceWrapper">
            {bets.map((bet, index) => (
                <div className="diceWrapper" key={index} >
                    <button className="dice" onClick={() => placeBetHandler(index + 1)} disabled={!bettingTime}>
                        {
                            Array(index + 1).fill(0).map((_, i) => (<span key={i} className="diceValue">{i} </span>))
                        }
                    </button>
                    <p className="diceBetWrapper">Bet: <span className="bettext">${bet}</span></p>
                </div>
            ))}
        </div>
    );
}

export default GameArea;