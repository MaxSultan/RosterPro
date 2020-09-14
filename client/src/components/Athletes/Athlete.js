import React from 'react'

export default function Athlete(props) {
    return (
        <tr>
            <td>{props.first_name}</td>
            <td>{props.last_name}</td>
            <td>{props.weight}</td>
            <td>{props.grade}</td>
        </tr>
    )
}
