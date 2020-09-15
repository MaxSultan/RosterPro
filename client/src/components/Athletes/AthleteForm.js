import React, { useState } from 'react'

export default function AthleteForm(props) {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [grade, setGrade] = useState("")
    const [weight, setWeight] = useState("")

    const handleSubmit = () => {
        props.addAthlete(props.list_id, {first_name: firstName, last_name: lastName, grade: grade, weight: weight})
        props.setMessage(`${firstName} ${lastName} was added!`)
        props.setAddingAthlete(false)
    }

    return (
        <div>
            <form className="verticalAlign" onSubmit={handleSubmit}>
                <h1>{props.athleteId ? "Edit Athlete" : "Add Athlete"}</h1>
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
                <button type="submit">Save</button>
                <button 
                onClick={()=> props.setAddingAthlete(false)} 
                className="secondaryButton"
                >Cancel</button>
            </form>
        </div>
    )
}
