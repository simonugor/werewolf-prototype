import React from "react"

function Form2(props) {

    function handleChange(event) {
        props.onChange(event)
    }

    const p = props.players.map(x => {
    return(<form className="select_form">
            <label className="label" htmlFor={x.name}>{x.name}</label>
            <select className="option1" value={x.role} onChange={handleChange} id={x.name}>
                <option style={{display: "none"}}>Select a role</option>
                <option id="Villager">Villager</option>
                <option id="Werewolf">Werewolf</option>
                <option id="Witch">Witch</option>
                <option id="Seer">Seer</option>
            </select>
            </form>)
    })

    return(
        <div className="form" style={{display: props.display}}>
            {p}
        </div>
    )
}

export default Form2