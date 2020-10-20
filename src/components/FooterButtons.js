import React from "react"

function FooterButtons(props) {
    return(
        <div className="footerButtonsDiv">
            <button onClick={props.playagain} className="footerButton">Play Again!</button>
            <button onClick={props.rules} className="footerButton">Rules</button>
        </div>
    )
}

export default FooterButtons