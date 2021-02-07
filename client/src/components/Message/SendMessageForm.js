import React, { useState } from "react";
import Axios from "axios";

export default function SendMessageForm(props) {
  const [body, setBody] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post(`/api/send_message`, {
      to: props.phoneNumber,
      message_body: body,
    }).then((response) => console.log(response));
  };
  return (
    <form onSubmit={handleSubmit}>
      <label for="body">Body:</label>
      <input
        value={body}
        onChange={(e) => setBody(e.target.value)}
        name="body"
      />
      <button type="submit">Send</button>
      <button onClick={() => props.setShowTexts(false)}>Cancel</button>
    </form>
  );
}
