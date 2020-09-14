import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import Athlete from './Athlete'
import AthleteForm from './AthleteForm'

export default function Athletes(props) {
    const [athletes, setAthletes] = useState([])
    const [addingAthlete, setAddingAthlete] = useState(false)

    useEffect(()=> {
        getAthletes(props.list_id)
    },[])

    const getAthletes = (list_id) => {
        Axios.get(`/api/lists/${list_id}/athletes`)
        .then(res => setAthletes(res.data))
        .catch(err => props.setMessage(err.message))
    }

    const addAthlete = (list_id, athleteObj) => {
        Axios.post(`/api/lists/${list_id}/athletes`, athleteObj)
        .then(res => setAthletes([res.data, ...athletes]))
        .catch(err => props.setMessage(err.message))
    }

    const renderAthletes = () => {
        return athletes.map(a => <Athlete {...a}/>)
    }
    
    return athletes.length > 0 ? (
        <>
        <button onClick={()=> setAddingAthlete(true)}>Add Athlete</button>
        <table id="Athletes">
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
        {addingAthlete && <AthleteForm list_id={props.list_id} setAddingAthlete={setAddingAthlete} addAthlete={addAthlete}/>}
        </>
    ) : (
    <>
        <h2>No Athletes</h2>
        <button onClick={()=> setAddingAthlete(true)}>Add Athlete</button>
        {addingAthlete && <AthleteForm list_id={props.list_id} setAddingAthlete={setAddingAthlete} addAthlete={addAthlete}/>}
    </>
    )
}
