import React from "react"

function Form1(props) {

    function callOnChange(event) {
        props.onChange(event.target.value)
    }

    function callOnClick(event) {
        props.onClick(event)
    }

    const players = props.players.map(player =>{
        return (<p className="label">{player.name}</p>)
    })

    return(
        <form style={{display: props.display}} className="form">
            <input onChange={callOnChange} className="input" type="text" placeholder="Add player" value={props.value}></input>
            <button onClick={callOnClick} className="form_button">+</button>
            {players}
        </form>
    )
}

export default Form1