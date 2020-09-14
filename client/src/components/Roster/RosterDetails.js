import React, { useEffect, useState } from 'react'
import Axios from 'axios'

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
        <div>
            <h2><strong>{roster.name}</strong></h2>
            <p>{roster.year}</p>
        </div>
    )
}
