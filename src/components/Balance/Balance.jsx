import "./Balance.css";
import { useSelector } from "react-redux";

function Balance() {
    const balance = useSelector((state) => state.game.balance);

    return <div className="balanceWrapper">Balance:  <span className="balance">${balance}</span></div>;
}

export default Balance