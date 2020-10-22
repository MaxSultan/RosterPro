import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import Athlete from './Athlete'
import AthleteForm from './AthleteForm'
import DeleteConfirmation from '../Roster/DeleteConfirmation'

export default function Athletes(props) {
    const [athletes, setAthletes] = useState([])
    const [addingAthlete, setAddingAthlete] = useState(false)
    const [deletingAthlete, setDeletingAthlete] = useState(false)
    const [editingAthlete, setEditingAthlete] = useState(false)
    const [selectedAthleteId, setSelectedAthleteId] = useState('')
    const [selectedAthleteFirstName, setSelectedAthleteFirstName] = useState('')
    const [selectedAthleteLastName, setSelectedAthleteLastName] = useState('')
    const [selectedAthleteGrade, setSelectedAthleteGrade] = useState('')
    const [selectedAthleteWeight, setSelectedAthleteWeight] = useState('')
    const [selectedAthleteListId, setSelectedAthleteListId] = useState('')
    const [selectedAthleteRank, setSelectedAthleteRank] = useState('')

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

    const editAthlete = (list_id, id, athleteObj) => {
        Axios.put(`api/lists/${list_id}/athletes/${id}`, athleteObj)
        .then(res => {
            const editedAthletes = athletes.map(athlete => {if(athlete.id === res.data.id) return res.data
                return athlete
            })
            setAthletes(editedAthletes)
        })
        .catch(err => props.setMessage(err.message))
    }

    const deselectAthlete = () => {
        setSelectedAthleteId('')
        setSelectedAthleteFirstName('')
        setSelectedAthleteLastName('')
        setSelectedAthleteGrade('')
        setSelectedAthleteWeight('')
        setSelectedAthleteRank('')
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
            setSelectedAthleteRank={setSelectedAthleteRank}
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
                <button onClick={() => setEditingAthlete(true)}>Edit Athlete</button>
                <button onClick={()=> deselectAthlete()}>De-select Athlete</button>
            </div>
            )
        }
    }
    
    return athletes.length > 0 ? (
        <>
        <div className="rosterHeader">
            <div>
                <h1>{props.name}</h1>
                <p>Year: {props.year}</p>
            </div>
            <button onClick={()=> setAddingAthlete(true)}>Add Athlete</button>
        </div>
        
        <table id="Athletes">
            <th colSpan="4">ALL ATHLETES</th>
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
        {editingAthlete &&
            <AthleteForm 
            setMessage={props.setMessage} 
            list_id={selectedAthleteListId} 
            id={selectedAthleteId}
            firstName={selectedAthleteFirstName}
            lastName={selectedAthleteLastName}
            grade={selectedAthleteGrade}
            weight={selectedAthleteWeight}
            rank={selectedAthleteRank}
            setEditingAthlete={setEditingAthlete} 
            editAthlete={editAthlete}
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
