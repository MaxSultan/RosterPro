import React, { useEffect, useState } from "react";
import Axios from "axios";
import Athletes from "../Athletes/Athletes";
import EventForm from "../Events/EventForm";

export default function RosterDetails({
  selectedRosterId,
  setMessage,
  setDetails,
}) {
  const [roster, setRoster] = useState("");
  const [addingEvent, setAddingEvent] = useState(false);
  // const { selectedRosterId } = props;

  useEffect(() => {
    Axios.get(`/api/lists/${selectedRosterId}`)
      .then((res) => {
        setRoster(res.data);
      })
      .catch((err) => setMessage(err));
  }, [selectedRosterId]);

  return (
    <div key={roster.id} className="rosterDetails">
      {roster && (
        <>
          <Athletes
            key={roster.id}
            name={roster.name}
            year={roster.year}
            list_id={roster.id}
            setMessage={setMessage}
          />
          <button onClick={() => setDetails(false)}>close</button>
          <button onClick={() => setAddingEvent(true)}>
            Create a New Event
          </button>
        </>
      )}

      {addingEvent && (
        <EventForm setAddingEvent={setAddingEvent} list_id={selectedRosterId} />
      )}
    </div>
  );
}
