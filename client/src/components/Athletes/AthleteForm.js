import React, { useState } from 'react'

export default function AthleteForm(props) {
    const [firstName, setFirstName] = useState(props.firstName ? props.firstName : "")
    const [lastName, setLastName] = useState(props.lastName ? props.lastName : "")
    const [grade, setGrade] = useState(props.grade ? props.grade : "")
    const [weight, setWeight] = useState(props.weight ? props.weight : "")
    const [rank, setRank] = useState(props.rank ? props.rank : 999)

    const handleSubmit = (e) => {
        if(props.id){
            e.preventDefault()
            props.editAthlete(props.list_id, props.id, {first_name: firstName, last_name: lastName, grade: grade, weight: weight, rank: rank})
            props.setMessage(`${firstName} ${lastName} was edited!`)
            props.setEditingAthlete(false)
        }else{
            e.preventDefault()
            props.addAthlete(props.list_id, {first_name: firstName, last_name: lastName, grade: grade, weight: weight, rank: rank})
            props.setMessage(`${firstName} ${lastName} was added!`)
            props.setAddingAthlete(false)
        }
    }

    return (
        <div>
            <form className="verticalAlign" onSubmit={handleSubmit}>
                <h1>{props.id ? "Edit Athlete" : "Add Athlete"}</h1>
                <label for="firstName">First Name:</label>
                <input 
                value={firstName} 
                onChange={(e) => setFirstName(e.target.value)}
                name="firstName"
                />
                <label for="lastName">Last Name:</label>
                <input 
                value={lastName} 
                onChange={(e) => setLastName(e.target.value)}
                name="lastName"
                />
                <label for="grade">Grade:</label>
                <input 
                value={grade} 
                onChange={(e) => setGrade(e.target.value)}
                name="grade"
                />
                <label for="weight">Weight Class:</label>
                <input 
                value={weight} 
                onChange={(e) => setWeight(e.target.value)}
                name="weight"
                />
                <label for="rank">Rank:</label>
                <select
                value={rank} 
                onChange={(e) => setRank(e.target.value)}
                name="rank"
                >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={999}>No Rank</option>
                </select>
                <button type="submit">Save</button>
                <button 
                onClick={props.id ? ()=> props.setEditingAthlete(false) : ()=> props.setAddingAthlete(false)} 
                className="secondaryButton"
                >Cancel</button>
            </form>
        </div>
    )
}
