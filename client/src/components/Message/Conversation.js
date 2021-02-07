import React, { useState, useEffect } from "react";
import Axios from "axios";

export default function Conversation(props) {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    Axios.get("/api/conversation", {
      phone_number: `+1${props.phoneNumber}`,
    }).then(({ data }) => {
      let sortedMessages = data.sort(function (a, b) {
        return new Date(a.time) - new Date(b.time);
      });
      setMessages(sortedMessages);
    });
  }, [props.phoneNumber]);
  const renderMessages = () => {
    return messages.map((message) => {
      return (
        <>
          <p className="messageTime">{new Date(message.time).toString()}</p>
          <div
            className={
              message.from === `+1${props.phoneNumber}`
                ? "smsMessageTo"
                : "smsMessageFrom"
            }
          >
            {message.body}
          </div>
        </>
      );
    });
  };
  return messages.length === 0 ? (
    <div>loading...</div>
  ) : (
    <div>{renderMessages()}</div>
  );
}
