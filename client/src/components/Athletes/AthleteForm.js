import React, { useState } from "react";
import { highSchoolWeights } from "../WeightClass";

export default function AthleteForm(props) {
  const [firstName, setFirstName] = useState(
    props.firstName ? props.firstName : ""
  );
  const [lastName, setLastName] = useState(
    props.lastName ? props.lastName : ""
  );
  const [grade, setGrade] = useState(props.grade ? props.grade : "");
  const [weight, setWeight] = useState(props.weight ? props.weight : "");
  const [rank, setRank] = useState(props.rank ? props.rank : 999);
  const [phoneNumber, setPhoneNumber] = useState(
    props.phoneNumber ? props.phoneNumber : ""
  );

  const handleSubmit = (e) => {
    if (props.id) {
      e.preventDefault();
      props.editAthlete(props.list_id, props.id, {
        first_name: firstName,
        last_name: lastName,
        grade: grade,
        weight: weight,
        rank: rank,
        phone_number: phoneNumber,
      });
      props.setMessage(`${firstName} ${lastName} was edited!`);
      props.setEditingAthlete(false);
    } else {
      e.preventDefault();
      props.addAthlete(props.list_id, {
        first_name: firstName,
        last_name: lastName,
        grade: grade,
        weight: weight,
        rank: rank,
        phone_number: phoneNumber,
      });
      props.setMessage(`${firstName} ${lastName} was added!`);
      props.setAddingAthlete(false);
    }
  };

  const weightClassOptions = (weightClasses) => {
    return weightClasses.map((weight) => {
      return <option value={weight}>{weight}</option>;
    });
  };

  return (
    <div>
      <form className="verticalAlign" onSubmit={handleSubmit}>
        <h1>{props.id ? "Edit Athlete" : "Add Athlete"}</h1>
        <label for="firstName">First Name:</label>
        <input
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          name="firstName"
        />
        <label for="lastName">Last Name:</label>
        <input
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          name="lastName"
        />
        <label for="grade">Grade:</label>
        <input
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          name="grade"
        />
        <label for="weight">Weight Class:</label>
        <select
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          name="weight"
        >
          {weightClassOptions(highSchoolWeights)}
        </select>
        <label for="rank">Rank:</label>
        <select
          value={rank}
          onChange={(e) => setRank(e.target.value)}
          name="rank"
        >
          <option value={1}>Varsity</option>
          <option value={2}>JV</option>
          <option value={3}>3rd String</option>
          <option value={4}>4th String</option>
          <option value={5}>5</option>
          <option value={999}>No Rank</option>
        </select>
        <label for="phoneNumber">Phone Number:</label>
        <input
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          name="phoneNumber"
        />
        <button type="submit">Save</button>
        <button
          onClick={
            props.id
              ? () => props.setEditingAthlete(false)
              : () => props.setAddingAthlete(false)
          }
          className="secondaryButton"
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
