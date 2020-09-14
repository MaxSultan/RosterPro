import React from 'react'

const  Message = (props) => (
        <div className="message" key={props.message}>
            {props.message}
        </div>
)

export default Message
