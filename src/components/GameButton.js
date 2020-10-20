import React from "react"

function GameButton(props) {

    function countPlayers() {
        if (props.players.length > 5) {
            props.onClick()
        } else {
            props.callPopUp()
        }
    }

    return(
        <div style={{display: props.display}} className="buttonDiv">
            <button onClick={countPlayers} className="button">{props.buttonText}</button>
        </div>
    )
}

export default GameButton