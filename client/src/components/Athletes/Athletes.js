import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import Athlete from './Athlete'
import AthleteForm from './AthleteForm'
import DeleteConfirmation from '../Roster/DeleteConfirmation'

export default function Athletes(props) {
    const [athletes, setAthletes] = useState([])
    const [addingAthlete, setAddingAthlete] = useState(false)
    const [deletingAthlete, setDeletingAthlete] = useState(false)
    const [selectedAthleteId, setSelectedAthleteId] = useState('')
    const [selectedAthleteFirstName, setSelectedAthleteFirstName] = useState('')
    const [selectedAthleteLastName, setSelectedAthleteLastName] = useState('')
    const [selectedAthleteGrade, setSelectedAthleteGrade] = useState('')
    const [selectedAthleteWeight, setSelectedAthleteWeight] = useState('')
    const [selectedAthleteListId, setSelectedAthleteListId] = useState('')

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

    const deleteAthlete = (list_id, id) => {
        Axios.delete(`/api/lists/${list_id}/athletes/${id}`)
        .then(res => setAthletes(athletes.filter(a => a.id !== res.data.id)))
        .catch(err => props.setMessage(err.message))
    }

    const deselectAthlete = () => {
        setSelectedAthleteId('')
        setSelectedAthleteFirstName('')
        setSelectedAthleteLastName('')
        setSelectedAthleteGrade('')
        setSelectedAthleteWeight('')
    }

    const renderAthletes = () => {
        return athletes.map(a => <Athlete {...a} 
            selectedAthleteId={selectedAthleteId}
            setSelectedAthleteId={setSelectedAthleteId}
            setSelectedAthleteFirstName={setSelectedAthleteFirstName}
            setSelectedAthleteLastName={setSelectedAthleteLastName}
            setSelectedAthleteGrade={setSelectedAthleteGrade}
            setSelectedAthleteWeight={setSelectedAthleteWeight}
            setSelectedAthleteListId={setSelectedAthleteListId}
            />)
    }

    const deleteItemSelected = (id) => {
        if (id === "")
            return props.setMessage('Please Select an item to view')
        return setDeletingAthlete(true)
    } 

    const renderAthleteOptions = (itemArray, selectedId) => {
        if(itemArray.map(item => item.id).includes(selectedId)){
            return(
            <div className="sideBySide left">
                <button onClick={() => deleteItemSelected(deletingAthlete, selectedAthleteId)}>Delete Athlete</button>
                {/* <button onClick={() => editItemSelected(selectedRosterId)}>Edit Athlete</button> */}
                {/* <button onClick={()=> detailsItemSelected(selectedRosterId)}>{details ? 'Hide Athlete' : 'View Athlete'}</button> */}
                <button onClick={()=> deselectAthlete()}>De-select Athlete</button>
            </div>
            )
        }
    }
    
    return athletes.length > 0 ? (
        <>
        <button className="right" onClick={()=> setAddingAthlete(true)}>Add Athlete</button>
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
        {renderAthleteOptions(athletes, selectedAthleteId)}
        {addingAthlete && 
            <AthleteForm 
                setMessage={props.setMessage} 
                list_id={props.list_id} 
                setAddingAthlete={setAddingAthlete} 
                addAthlete={addAthlete}
            />
        }
        {deletingAthlete && 
            <DeleteConfirmation 
                deleteAthlete={deleteAthlete}
                selectedAthleteListId={selectedAthleteListId}
                selectedAthleteFirstName={selectedAthleteFirstName}
                selectedAthleteLastName={selectedAthleteLastName}
                selectedAthleteId={selectedAthleteId}
                setDeletingAthlete={setDeletingAthlete}
                setMessage={props.setMessage}
            />
        }
        </>
    ) : (
    <>
        <h2>No Athletes</h2>
        <button onClick={()=> setAddingAthlete(true)}>Add Athlete</button>
        {addingAthlete && <AthleteForm setMessage={props.setMessage} list_id={props.list_id} setAddingAthlete={setAddingAthlete} addAthlete={addAthlete}/>}
    </>
    )
}
