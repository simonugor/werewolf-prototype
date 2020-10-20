import React from "react"

function PopUp(props) {
    return(
        <div style={{display: props.display}} className="popup">
            <p className="pop_up_text">{props.popUpText}</p>
            <button className="footerButton" onClick={props.onClick}>{props.text}</button>
        </div>
    )
}

export default PopUp