import React from 'react'

export default function Athlete(props) {

    const selectAthlete = () => {
        props.setSelectedAthleteListId(props.list_id)
        props.setSelectedAthleteId(props.id)
        props.setSelectedAthleteFirstName(props.first_name)
        props.setSelectedAthleteLastName(props.last_name)
        props.setSelectedAthleteGrade(props.grade)
        props.setSelectedAthleteWeight(props.weight)
    }
    return (
        <tr className={props.id === props.selectedAthleteId ? "selectedAthlete" : "athlete"} onClick={()=> selectAthlete()}>
            <td>{props.first_name}</td>
            <td>{props.last_name}</td>
            <td>{props.weight}</td>
            <td>{props.grade}</td>
        </tr>
    )
}
