import React from "react"

function DayForm(props) {

    function handleChange(event) {
        props.onChange(event)
    }

    function kick(event) {
        props.handleKick(event)
    }

    const p = props.players.map(player => {
        if (player.alive === true) {
            return (<option id={player.name}>{player.name}</option>)
        }
        return ""
    })

    return(
        <div className="form" style={{display: props.display}}>
            <form>
                <label className="label">Who did Villagers decided to kick?</label>
                <select className="option1" id="tokick" onChange={handleChange}>
                    <option style={{display: "none"}}>Select who to kill</option>
                    {p}
                </select>
                <br />
                <button className="button" id="kick_button" onClick={kick}>Kick</button>
            </form>
        </div>
    )
}

export default DayForm