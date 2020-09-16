import React from 'react'

export default function DeleteConfirmation(props) {

    const finalDelete = (id) => {
        if (props.selectedRosterId){
            props.deleteRoster(id)
            props.setDeleting(false)
            props.setDetails(false)
            props.setMessage(`${props.selectedRosterName} was successfully deleted!`)
        } else{
            props.deleteAthlete(props.selectedAthleteId)
            props.setDeletingAthlete(false)
            props.setMessage(`${props.setlectedAthleteFirstName} ${props.selectedAthleteLastName} was successfully deleted!`)
        }
    }
    return (
        <div>
            <h1>Delete Confirmation</h1>
            <p> Are you sure you want to delete {props.selectedRosterName ? props.selectedRosterName : `${props.selectedFirstName} ${props.selectedLastName}`}?</p>
            <button onClick={props.selectedRosterId ? ()=> finalDelete(props.selectedRosterId) : ()=>finalDelete(props.selectedAthleteId)}>Confirm</button>
            <button onClick={()=> props.setDeleting(false)} className="secondaryButton">Cancel</button>
        </div>
    )
}
