import React from 'react'

export default function DeleteConfirmation(props) {

    const finalDelete = (id) => {
        props.deleteRoster(id)
        props.setDeleting(false)
        props.setDetails(false)
        props.setMessage(`${props.selectedRosterName} was successfully deleted!`)
    }
    return (
        <div>
            <h1>Delete Confirmation</h1>
            <p> Are you sure you want to delete {props.selectedRosterName}?</p>
            <button onClick={()=> finalDelete(props.selectedRosterId)}>Confirm</button>
            <button onClick={()=> props.setDeleting(false)} className="secondaryButton">Cancel</button>
        </div>
    )
}
