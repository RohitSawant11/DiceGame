import "./Dice.css"
import { useSelector } from "react-redux";

function Dice() {
    const diceResult = useSelector((state) => state.game.diceResult);
    return <div className="diceRollWrapper">Dice Roll: <span className="rolledDice">{diceResult}</span></div>;
  }
export default Dice;
