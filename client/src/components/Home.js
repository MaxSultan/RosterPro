import React, { useState, useEffect } from 'react'
import Rosters from './Roster/Rosters'
import Axios from 'axios'
import RosterForm from './Roster/RosterForm'
import DeleteConfirmation from './Roster/DeleteConfirmation'
import RosterDetails from './Roster/RosterDetails'
import Message from './Roster/Message'

export default function Home() {

    const [rosters, setRosters] = useState([])
    const [adding, setAdding] = useState(false)
    const [deleting, setDeleting] = useState(false)
    const [editing, setEditing] = useState(false)
    const [details, setDetails] = useState(false)
    const [message, setMessage] = useState('')
    const [selectedRosterId, setSelectedRosterId] = useState('')
    const [selectedRosterName, setSelectedRosterName] = useState('')
    const [selectedRosterYear, setSelectedRosterYear] = useState('')

    useEffect(()=> {
        getRosters()
    },[])

    const getRosters = () => {
        Axios.get('/api/lists')
        .then(res => setRosters(res.data))
        .catch(err => setMessage(err))
    }

    const createRoster = (rosterObj) => {
        Axios.post('/api/lists', rosterObj)
        .then(res => setRosters([res.data, ...rosters]))
        .catch(err => setMessage(err))
    }

    const deleteRoster = (id) => {
        Axios.delete(`/api/lists/${id}`)
        .then(res => setRosters(rosters.filter(roster => roster.id !== res.data.id)))
        .catch(err => setMessage(err))
    }

    const editRoster = (id, rosterObj) => {
        Axios.put(`/api/lists/${id}`, rosterObj)
        .then(res => {
            const updatedRosters = rosters.map(r => {
                if(r.id === res.data.id) 
                    return res.data;
                return r;
            })
            setRosters(updatedRosters);
        })
        .catch(err => setMessage(err))
    }

    const deleteItemSelected = (id) => {
        if (id === "")
            return setMessage('Please Select an item to delete')
        return setDeleting(true)
    }

    const editItemSelected = (id) => {
        if (id === "")
            return setMessage('Please Select an item to edit')
        return setEditing(true)
    } 

    const detailsItemSelected = (id) => {
        if (id === "")
            return setMessage('Please Select an item to view')
        return setDetails(!details)
    } 

    const deselectItem = () => {
        setSelectedRosterId('')
        setSelectedRosterName('')
        setSelectedRosterYear('')
        setDetails(false)
    }

    const ItemSelected = (itemArray, selectedId) => {
        if(itemArray.map(item => item.id).includes(selectedId)){
            return(
            <div className="sideBySide left">
                <button onClick={() => deleteItemSelected(deleting, selectedRosterId)}>Delete Roster</button>
                <button onClick={() => editItemSelected(selectedRosterId)}>Edit Roster</button>
                <button onClick={()=> detailsItemSelected(selectedRosterId)}>{details ? 'Hide Roster' : 'View Roster'}</button>
                <button onClick={()=> deselectItem()}>De-select</button>
            </div>
            )
        }
    }

    return (
        <div>
            {message !== '' && <Message message={message} />}
            <section className="sideBySide">
                <h1>RosterPro</h1>
                <button onClick={() => setAdding(true)}>Add Roster</button>
            </section>
            <section className="left">
            <Rosters 
            rosters={rosters}
            selectedRosterId={selectedRosterId}
            setSelectedRosterId={setSelectedRosterId}
            setSelectedRosterName={setSelectedRosterName}
            setSelectedRosterYear={setSelectedRosterYear}
            />
            {ItemSelected(rosters, selectedRosterId)}
            </section>
            {adding && 
            <RosterForm 
            setAdding={setAdding} 
            createRoster={createRoster}
            setMessage={setMessage}
            />}
            {editing && 
            <RosterForm 
            setEditing={setEditing} 
            setMessage={setMessage}
            editRoster={editRoster}
            selectedRosterId={selectedRosterId}
            selectedRosterYear={selectedRosterYear}
            selectedRosterName={selectedRosterName}
            />}
            {deleting && 
            <DeleteConfirmation 
            setDetails={setDetails}
            setMessage={setMessage}
            setDeleting={setDeleting}
            selectedRosterId={selectedRosterId}
            selectedRosterYear={selectedRosterYear}
            selectedRosterName={selectedRosterName}
            deleteRoster={deleteRoster}
            />}
            {details &&
            <RosterDetails
            setDetails={setDetails}
            selectedRosterId={selectedRosterId}
            setMessage={setMessage}
            />}
        </div>
    )
}
