import "./Timer.css";
import { useSelector } from "react-redux";


function Timer() {
    const timer = useSelector((state) => state.game.timer);
    const timerStyle = { color: timer < 4 ? "red" : "green" };

    return <div className="timerWrapper">Time Remaining: <span className="timer" style={timerStyle}> {timer} seconds </span></div>;
}
export default Timer;