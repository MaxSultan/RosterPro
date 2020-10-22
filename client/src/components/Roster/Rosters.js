import React, { useState } from 'react'
import Roster from './Roster'

export default function Rosters(props) {

    const renderRosters = () => {
        return props.rosters.map(roster => <Roster key={roster.id} {...roster} 
            setSelectedRosterId={props.setSelectedRosterId}
            setSelectedRosterName={props.setSelectedRosterName}
            setSelectedRosterYear={props.setSelectedRosterYear}
            selectedRosterId={props.selectedRosterId}
            />)
    }

    return props.rosters.length === 0 ? (
        <div>
            <h1>Current Rosters</h1>
            <p>No Current Rosters</p>
        </div>
    ) :
    (
        <table id="rosters">
            <th colSpan="2">Current Rosters</th>
            <tbody>
                    {renderRosters()}
            </tbody>
        </table>
    )
}