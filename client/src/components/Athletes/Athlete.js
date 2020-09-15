import React from 'react'

export default function Athlete(props) {
    return (
        <tr className={props.id === props.selectedAthleteId ? "selected" : null} onClick={()=> props.selectAthlete(props.id, props.first_name, props.last_name, props.weight, props.grade)}>
            <td>{props.first_name}</td>
            <td>{props.last_name}</td>
            <td>{props.weight}</td>
            <td>{props.grade}</td>
        </tr>
    )
}
