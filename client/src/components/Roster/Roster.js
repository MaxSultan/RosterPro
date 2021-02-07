import React from "react";

export default function Roster(props) {
  const selectItem = () => {
    props.setSelectedRosterId(props.id);
    props.setSelectedRosterName(props.name);
    props.setSelectedRosterYear(props.year);
  };
  return (
    <tr
      className={
        props.selectedRosterId === props.id
          ? "selectedRosterItem"
          : "rosterItem"
      }
      onClick={() => selectItem()}
    >
      <td>{props.name}</td>
      <td>{props.year}</td>
    </tr>
  );
}
