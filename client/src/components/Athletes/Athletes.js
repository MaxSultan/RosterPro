import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import Athlete from './Athlete'
import AthleteForm from './AthleteForm'
import DeleteConfirmation from '../Roster/DeleteConfirmation'
import Varsity from './Varsity'
import JV from './JV'
import ThirdString from './3rdString';
import FourthString from './4thString';
import WeightClass from '../WeightClass'


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
    const [showAllAthletes, setShowAllAthletes] = useState(true)
    const [showVarsity, setShowVarsity] = useState(false)
    const [showJV, setShowJV] = useState(false)

    useEffect(()=> {
        getAthletes(props.list_id)
    },[])

    const getAthletes = (list_id) => {
        Axios.get(`/api/lists/${list_id}/athletes`)
        .then(res => setAthletes(res.data.sort(compare)))
        .catch(err => props.setMessage(err.message))
    }

    const addAthlete = (list_id, athleteObj) => {
        Axios.post(`/api/lists/${list_id}/athletes`, athleteObj)
        .then(res => setAthletes([res.data, ...athletes].sort(compare)))
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
            setAthletes(editedAthletes.sort(compare))
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

    const highSchoolWeights = [106,113,120,132,138,145,152,160,170,182,195,220,285];

    const renderWeights = (weightsArr) => {
        return weightsArr.map(weight => (
            <tr>
                <td>{weight}</td>
            </tr>
        ))
    }

    const compare = (a, b) => {
        const athleteA = a.weight;
        const athleteB = b.weight;
        let comparison = 0;
        if (athleteA > athleteB) {
          comparison = 1;
        } else if (athleteA < athleteB) {
          comparison = -1;
        }
        return comparison;
      }

    const viewAllAthletes = () => {
        setShowAllAthletes(true)
        setShowVarsity(false)
        setShowJV(false)
    }
    const viewVarsity = () => {
        setShowAllAthletes(false)
        setShowVarsity(true)
        setShowJV(false)
    }
    const viewJV = () => {
        setShowAllAthletes(false)
        setShowVarsity(false)
        setShowJV(true)
    }
    
    return athletes.length > 0 ? (
        <>
        <div className="rosterHeader">
                <table id="">
                    <th colSpan="5">
                        <tr>
                            <h1>{props.name} {props.year} - {parseInt(props.year) + 1}</h1>
                        </tr>
                    </th>
                   
                    <tbody>
                        
                        <div className="rosterSidebySide">
                            <WeightClass/>
                            <Varsity key={props.list_id} setMessage={props.setMessage} list_id={props.list_id}/>
                            <JV key={props.list_id} setMessage={props.setMessage} list_id={props.list_id}/>
                            <ThirdString key={props.list_id} setMessage={props.setMessage} list_id={props.list_id}/>
                            <FourthString key={props.list_id} setMessage={props.setMessage} list_id={props.list_id}/>
                        </div>
                    </tbody>
                </table>
            <button onClick={()=> setAddingAthlete(true)}>Add Athlete</button>
        </div>
        <section className="rosterCollection">
        </section>
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
