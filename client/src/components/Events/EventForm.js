import React, { useState } from "react";
import Axios from "axios";

export default function EventForm(props) {
  const [name, setName] = useState(props.name ? props.name : "");
  const [place, setPlace] = useState(props.place ? props.place : "");
  const [time, setTime] = useState(props.time ? props.time : "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (props.id) {
      Axios.put(`/api/lists/${props.list_id}/events/${props.id}`, {
        name: name,
        place: place,
        time: time,
      }).then((data) => {
        console.log(data);
        props.setAddingEvent(false);
      });
    } else {
      Axios.post(`/api/lists/${props.list_id}/events`, {
        name: name,
        place: place,
        time: time,
      }).then((data) => console.log(data));
    }
  };

  return (
    <div className="event-form">
      <button onClick={() => props.setAddingEvent(false)}>X</button>
      <form className="center-flex" onSubmit={handleSubmit}>
        <label for="name">Name:</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          name="name"
        />
        <label for="place">Place:</label>
        <input
          value={place}
          onChange={(e) => setPlace(e.target.value)}
          name="place"
        />
        <label for="time">Time:</label>
        <input
          value={time}
          onChange={(e) => setTime(e.target.value)}
          name="time"
          type="datetime-local"
        />
        <button type="submit">{props.id ? "Update" : "Create"}</button>
      </form>
    </div>
  );
}
