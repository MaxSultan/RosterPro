import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import Athletes from '../Athletes/Athletes'

export default function RosterDetails(props) {
    const [roster, setRoster] = useState('')

    useEffect(()=> {
        Axios.get(`/api/lists/${props.selectedRosterId}`)
        .then(res => {
            console.log(res.data)
            setRoster(res.data)
        })
        .catch(err => props.setMessage(err))
    },[props.selectedRosterId]) 

    return (
        <div key={props.selectedRosterId} className="rosterDetails">
            <h2><strong>{roster.name}</strong></h2>
            <p>Year: {roster.year}</p>
            {roster && <Athletes key={roster.id} list_id={roster.id} setMessage={props.setMessage}/>}
        </div>
    )
}
