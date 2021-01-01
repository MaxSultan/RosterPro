import React, { useState } from "react";
import Draggable from "react-draggable";

export default function Athlete(props) {
  const [previousRank, setPreviousRank] = useState("");

  const selectAthlete = () => {
    props.setSelectedAthleteListId(props.list_id);
    props.setSelectedAthleteId(props.id);
    props.setSelectedAthleteFirstName(props.first_name);
    props.setSelectedAthleteLastName(props.last_name);
    props.setSelectedAthleteGrade(props.grade);
    props.setSelectedAthleteWeight(props.weight);
    props.setSelectedAthleteRank(props.rank);
  };

  async function switchAthletes(listRank) {
    let matchedAthleteArray = await props.allAthletes
      .filter((athlete) => athlete.weight == props.weight)
      .filter((athlete) => athlete.rank === listRank);
    if (matchedAthleteArray.length > 0) {
      let matchingId = matchedAthleteArray[0].id;
      props.editAthlete(props.list_id, matchingId, {
        rank: previousRank,
      });
      let otherCell = document.getElementById(matchingId);
      console.log(otherCell);
    }
    props.editAthlete(props.list_id, props.id, {
      rank: listRank,
    });
    props.rerenderParent();
  }

  const handleStart = (rank) => {
    selectAthlete();
    setPreviousRank(rank);
  };

  const handleStop = (e, id) => {
    console.log(document.getElementById("Varsity").getBoundingClientRect());
    const varsityBounds = document
      .getElementById("Varsity")
      .getBoundingClientRect();
    const jvBounds = document
      .getElementById("Junior Varsity")
      .getBoundingClientRect();
    const thirdStringBounds = document
      .getElementById("3rd String")
      .getBoundingClientRect();
    const fourthStringBounds = document
      .getElementById("4th String")
      .getBoundingClientRect();

    if (e.x > varsityBounds.left && e.x < varsityBounds.right) {
      switchAthletes(1);
      console.log("varsity");
    } else if (e.x > jvBounds.left && e.x < jvBounds.right) {
      switchAthletes(2);
      console.log("junior varsity");
    } else if (e.x > thirdStringBounds.left && e.x < thirdStringBounds.right) {
      switchAthletes(3);
      console.log("3rd string");
    } else if (
      e.x > fourthStringBounds.left &&
      e.x < fourthStringBounds.right
    ) {
      switchAthletes(4);
      console.log("4th string");
    } else {
      alert("the athlete was dragged into an unknown place");
    }
  };

  return (
    <Draggable
      axis="x"
      onStart={() => handleStart(props.rank)}
      onStop={(e) => handleStop(e, props.id)}
      id={props.id}
    >
      <td
        weight={props.weight}
        rank={props.rank}
        id={props.id}
        className={
          props.id === props.selectedAthleteId ? "selectedAthlete" : "athlete"
        }
        onClick={() => selectAthlete()}
      >
        {props.first_name} {props.last_name} {props.weight} {props.grade}
      </td>
    </Draggable>
  );
}
