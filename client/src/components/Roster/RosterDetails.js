import React, { useEffect, useState } from "react";
import Axios from "axios";
import Athletes from "../Athletes/Athletes";

export default function RosterDetails(props) {
  const [roster, setRoster] = useState("");

  useEffect(() => {
    Axios.get(`/api/lists/${props.selectedRosterId}`)
      .then((res) => {
        setRoster(res.data);
      })
      .catch((err) => props.setMessage(err));
  }, [props.selectedRosterId]);

  return (
    <div key={roster.id} className="rosterDetails">
      {roster && (
        <>
          <Athletes
            key={roster.id}
            name={roster.name}
            year={roster.year}
            list_id={roster.id}
            setMessage={props.setMessage}
          />
          {/* <div className="rosters">
                <Varsity key={roster.id} setMessage={props.setMessage} list_id={roster.id}/>
                <JV key={roster.id} setMessage={props.setMessage} list_id={roster.id}/>
            </div> */}
        </>
      )}
    </div>
  );
}
