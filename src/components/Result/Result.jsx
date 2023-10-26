import "./Result.css";
import { useSelector } from "react-redux";


function Result() {
    const roundOutcome = useSelector((state) => state.game.roundOutcome);

    return <div className="resultWrapper">Result:- <span className="result">{roundOutcome}</span></div>;
}

export default Result;