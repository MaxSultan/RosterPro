import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import Athlete from './Athlete'

export default function Athletes(props) {
    const [athletes, setAthletes] = useState([])

    useEffect(()=> {
        getAthletes(props.list_id)
    },[])

    const getAthletes = (list_id) => {
        Axios.get(`/api/lists/${list_id}/athletes`)
        .then(res => {setAthletes(res.data); console.log(res.data)})
        .catch(err => props.setMessage(err.message))
    }

    const renderAthletes = () => {
        return athletes.map(a => <Athlete {...a}/>)
    }
    
    return athletes.length > 0 ? (
        <table>
            <th colSpan="4">ATHLETES</th>
            <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Weight</th>
                <th>Grade</th>
            </tr>
            <tbody>
                {athletes.length !== 0 && renderAthletes()}
            </tbody>
        </table>
    ) : <h2>No Athletes</h2>
}
