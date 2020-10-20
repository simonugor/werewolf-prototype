import React from "react"

function NightForm(props) {

    function handleChange(event) {
        props.onChange(event)
    }

    function kill(event) {
        props.handleKill(event)
    }

    const p = props.players.map(x => {
        if (x.role === "Villager" && x.alive === true) {
            return (<option id={x.name}>{x.name}</option>)
        }
        return ("")
    })

    return(
        <div style={{display: props.display}} className="form">
            <form>
                <label className="label">Who did Werewolves decide to kill?</label>
                <select className="option1" onChange={handleChange} id="tokill" value={props.value}>
                    <option style={{display: "none"}}>Select who to kill</option>
                    {p}
                </select>
                <br />
                <button className="button" id="kill_button" onClick={kill}>Kill</button>
            </form>
        </div>
    )
}

export default NightForm