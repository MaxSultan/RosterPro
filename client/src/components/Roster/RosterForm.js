import React, { useState } from 'react'

export default function RosterForm(props) {
    const [name, setName] = useState(props.selectedRosterName ? props.selectedRosterName : '')
    const [year, setYear] = useState(props.selectedRosterYear ? props.selectedRosterYear : '')

    const yearOptions = () => {
        var yearList = [];
        for (var i = new Date().getFullYear() - 11; i <= new Date().getFullYear() + 1; i++) {
            yearList.push(i);
        }
        return yearList.map(year => {
            return <option key={year} value={year}>{year}</option>
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (props.selectedRosterId){
            props.editRoster(props.selectedRosterId, {name: name, year: year})
            props.setEditing(false)
            props.setMessage(`Roster ${name} has been updated successfully!`)
        }
        else{
            props.createRoster({name: name, year: year})
            props.setAdding(false)
            props.setMessage(`Roster ${name} was added!`)
        }

    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="verticalAlign form">
            {props.selectedRosterId ? <h1>Edit Roster</h1> : <h1>Add Roster</h1>}
            <label for="name" className="formLabel">Name:</label>
            <input name="name" value={name} onChange={(e) => setName(e.target.value)}/>
            <label for="year" className="formLabel">Year:</label>
            <select name="year" value={year} onChange={(e) => setYear(e.target.value)}>
                {yearOptions()}
            </select>
            <button type="submit">Submit</button>
            <button onClick={props.setAdding ? ()=> props.setAdding(false) : ()=> props.setEditing(false)} className="secondaryButton">Cancel</button>
            </form>
        </div>
    )
}
