
import { useState } from "react"
export default function Player ({ name , symbol , activePlayer}) {

  const [currName, setCurrName] = useState(name);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditclick = () => {
    setIsEditing(prevIsEditing => !prevIsEditing);
  };

  const handleOnChange = (event) => {
    console.log("Value",currName);
    setCurrName(event.target.value);
  };

    return (
        <li className={activePlayer ? 'active' : undefined}>
            <span className="player">
                {!isEditing && <span className="player-name"> {currName}</span>}
                {isEditing && <input type="text" required value={currName} onChange={handleOnChange}/> }
                <span className = "player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditclick}>{isEditing ? 'Save' : 'Edit' }</button>
        </li>
    );
}