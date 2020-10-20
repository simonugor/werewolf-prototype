import React from "react"

function GameText(props) {
    return(
        <div className="gameTextDiv" style={{display: props.display}}>
            <h2 className="gameText1">{props.text}</h2>
        </div>
    )
}

export default GameText