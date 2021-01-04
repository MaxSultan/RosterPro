import React, { useState, useEffect } from "react";
import Axios from "axios";

export default function Conversation(props) {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    Axios.get("/api/conversation", {
      phone_number: `+1${props.phoneNumber}`,
    }).then(({ data }) => {
      let sortedMessages = data.sort(function (a, b) {
        return a.time - b.time;
      });
      setMessages(sortedMessages);
    });
  }, []);
  const renderMessages = () => {
    return messages.map((message) => {
      return (
        <p
          className={
            props.phoneNumber === message.from
              ? "SMSmessageFrom"
              : "SMSmessageTo"
          }
        >
          {message.body}
        </p>
      );
    });
  };
  return messages.length === 0 ? (
    <div>loading...</div>
  ) : (
    <div>{renderMessages()}</div>
  );
}
