import React, { useEffect, useState, useReducer } from "react";
import Axios from "axios";
import AthleteForm from "./AthleteForm";
import DeleteConfirmation from "../Roster/DeleteConfirmation";
import WeightClass from "../WeightClass";
import PrintableAthleteList from "./AthleteList.js";
import SendMessageForm from "../Message/SendMessageForm";
import Conversation from "../Message/Conversation";

export default function Athletes(props) {
  const [athletes, setAthletes] = useState([]);
  const [addingAthlete, setAddingAthlete] = useState(false);
  const [deletingAthlete, setDeletingAthlete] = useState(false);
  const [editingAthlete, setEditingAthlete] = useState(false);
  const [selectedAthleteId, setSelectedAthleteId] = useState("");
  const [selectedAthleteFirstName, setSelectedAthleteFirstName] = useState("");
  const [selectedAthleteLastName, setSelectedAthleteLastName] = useState("");
  const [selectedAthleteGrade, setSelectedAthleteGrade] = useState("");
  const [selectedAthleteWeight, setSelectedAthleteWeight] = useState("");
  const [selectedAthleteListId, setSelectedAthleteListId] = useState("");
  const [selectedAthleteRank, setSelectedAthleteRank] = useState("");
  const [selectedAthletePhoneNumber, setSelectedAthletePhoneNumber] = useState(
    ""
  );
  const [showTexts, setShowTexts] = useState(false);

  useEffect(() => {
    getAthletes(props.list_id);
  }, []);

  const getAthletes = (list_id) => {
    Axios.get(`/api/lists/${list_id}/athletes`)
      .then((res) => setAthletes(res.data.sort(compare)))
      .catch((err) => props.setMessage(err.message));
  };

  const addAthlete = (list_id, athleteObj) => {
    Axios.post(`/api/lists/${list_id}/athletes`, athleteObj)
      .then((res) => setAthletes([res.data, ...athletes].sort(compare)))
      .catch((err) => props.setMessage(err.message));
  };

  const deleteAthlete = (list_id, id) => {
    Axios.delete(`/api/lists/${list_id}/athletes/${id}`)
      .then((res) => setAthletes(athletes.filter((a) => a.id !== res.data.id)))
      .catch((err) => props.setMessage(err.message));
  };

  const editAthlete = (list_id, id, athleteObj) => {
    Axios.put(`api/lists/${list_id}/athletes/${id}`, athleteObj)
      .then((res) => {
        const editedAthletes = athletes.map((athlete) => {
          if (athlete.id === res.data.id) return res.data;
          return athlete;
        });
        setAthletes(editedAthletes.sort(compare));
      })
      .catch((err) => props.setMessage(err.message));
  };

  const deselectAthlete = () => {
    setSelectedAthleteId("");
    setSelectedAthleteFirstName("");
    setSelectedAthleteLastName("");
    setSelectedAthleteGrade("");
    setSelectedAthleteWeight("");
    setSelectedAthleteRank("");
    setSelectedAthletePhoneNumber("");
    setEditingAthlete(false);
    setDeletingAthlete(false);
  };

  const deleteItemSelected = (id) => {
    if (id === "") return props.setMessage("Please Select an item to view");
    return setDeletingAthlete(true);
  };

  const renderAthleteOptions = (itemArray, selectedId) => {
    if (itemArray.map((item) => item.id).includes(selectedId)) {
      return (
        <div className="sideBySide left">
          <button
            onClick={() =>
              deleteItemSelected(deletingAthlete, selectedAthleteId)
            }
          >
            Delete Athlete
          </button>
          <button onClick={() => setEditingAthlete(true)}>Edit Athlete</button>
          <button onClick={() => deselectAthlete()}>De-select Athlete</button>
        </div>
      );
    }
  };

  const compare = (a, b) => {
    const athleteA = a.weight;
    const athleteB = b.weight;
    let comparison = 0;
    if (athleteA > athleteB) {
      comparison = 1;
    } else if (athleteA < athleteB) {
      comparison = -1;
    }
    return comparison;
  };

  return athletes.length > 0 ? (
    <>
      <h1>
        {props.name} {props.year} - {parseInt(props.year) + 1}
      </h1>
      <div className="rosterSidebySide">
        <WeightClass />
        <PrintableAthleteList
          key={`${props.list_id}-varsity`}
          allAthletes={athletes}
          setMessage={props.setMessage}
          editAthlete={editAthlete}
          list_id={props.list_id}
          rosterRank={1}
          rosterName="Varsity"
          selectedAthleteId={selectedAthleteId}
          setSelectedAthleteListId={setSelectedAthleteListId}
          setSelectedAthleteId={setSelectedAthleteId}
          setSelectedAthleteFirstName={setSelectedAthleteFirstName}
          setSelectedAthleteLastName={setSelectedAthleteLastName}
          setSelectedAthleteGrade={setSelectedAthleteGrade}
          setSelectedAthleteWeight={setSelectedAthleteWeight}
          setSelectedAthleteRank={setSelectedAthleteRank}
          setAddingAthlete={setAddingAthlete}
          setDeletingAthlete={setDeletingAthlete}
          setEditingAthlete={setEditingAthlete}
          setSelectedAthletePhoneNumber={setSelectedAthletePhoneNumber}
          setShowTexts={setShowTexts}
        />
        <PrintableAthleteList
          key={`${props.list_id}-juniorVarsity`}
          allAthletes={athletes}
          setMessage={props.setMessage}
          editAthlete={editAthlete}
          list_id={props.list_id}
          rosterRank={2}
          rosterName="Junior Varsity"
          selectedAthleteId={selectedAthleteId}
          setSelectedAthleteListId={setSelectedAthleteListId}
          setSelectedAthleteId={setSelectedAthleteId}
          setSelectedAthleteFirstName={setSelectedAthleteFirstName}
          setSelectedAthleteLastName={setSelectedAthleteLastName}
          setSelectedAthleteGrade={setSelectedAthleteGrade}
          setSelectedAthleteWeight={setSelectedAthleteWeight}
          setSelectedAthleteRank={setSelectedAthleteRank}
          setAddingAthlete={setAddingAthlete}
          setDeletingAthlete={setDeletingAthlete}
          setEditingAthlete={setEditingAthlete}
          setSelectedAthletePhoneNumber={setSelectedAthletePhoneNumber}
          setShowTexts={setShowTexts}
        />
        <PrintableAthleteList
          key={`${props.list_id}-3rdString`}
          allAthletes={athletes}
          setMessage={props.setMessage}
          editAthlete={editAthlete}
          list_id={props.list_id}
          rosterRank={3}
          rosterName="3rd String"
          selectedAthleteId={selectedAthleteId}
          setSelectedAthleteListId={setSelectedAthleteListId}
          setSelectedAthleteId={setSelectedAthleteId}
          setSelectedAthleteFirstName={setSelectedAthleteFirstName}
          setSelectedAthleteLastName={setSelectedAthleteLastName}
          setSelectedAthleteGrade={setSelectedAthleteGrade}
          setSelectedAthleteWeight={setSelectedAthleteWeight}
          setSelectedAthleteRank={setSelectedAthleteRank}
          setAddingAthlete={setAddingAthlete}
          setDeletingAthlete={setDeletingAthlete}
          setEditingAthlete={setEditingAthlete}
          setSelectedAthletePhoneNumber={setSelectedAthletePhoneNumber}
          setShowTexts={setShowTexts}
        />
        <PrintableAthleteList
          key={`${props.list_id}-4thString`}
          allAthletes={athletes}
          setMessage={props.setMessage}
          editAthlete={editAthlete}
          list_id={props.list_id}
          rosterRank={4}
          rosterName="4th String"
          selectedAthleteId={selectedAthleteId}
          setSelectedAthleteListId={setSelectedAthleteListId}
          setSelectedAthleteId={setSelectedAthleteId}
          setSelectedAthleteFirstName={setSelectedAthleteFirstName}
          setSelectedAthleteLastName={setSelectedAthleteLastName}
          setSelectedAthleteGrade={setSelectedAthleteGrade}
          setSelectedAthleteWeight={setSelectedAthleteWeight}
          setSelectedAthleteRank={setSelectedAthleteRank}
          setAddingAthlete={setAddingAthlete}
          setDeletingAthlete={setDeletingAthlete}
          setEditingAthlete={setEditingAthlete}
          setSelectedAthletePhoneNumber={setSelectedAthletePhoneNumber}
          setShowTexts={setShowTexts}
        />
        <button onClick={() => setAddingAthlete(true)}>Add Athlete</button>
      </div>
      <section className="rosterCollection"></section>
      {renderAthleteOptions(athletes, selectedAthleteId)}
      {addingAthlete && (
        <AthleteForm
          setMessage={props.setMessage}
          list_id={props.list_id}
          setAddingAthlete={setAddingAthlete}
          addAthlete={addAthlete}
        />
      )}
      {deletingAthlete && (
        <DeleteConfirmation
          deleteAthlete={deleteAthlete}
          selectedAthleteListId={selectedAthleteListId}
          selectedAthleteFirstName={selectedAthleteFirstName}
          selectedAthleteLastName={selectedAthleteLastName}
          selectedAthleteId={selectedAthleteId}
          setDeletingAthlete={setDeletingAthlete}
          setMessage={props.setMessage}
        />
      )}
      {editingAthlete && (
        <AthleteForm
          setMessage={props.setMessage}
          list_id={selectedAthleteListId}
          id={selectedAthleteId}
          firstName={selectedAthleteFirstName}
          lastName={selectedAthleteLastName}
          grade={selectedAthleteGrade}
          weight={selectedAthleteWeight}
          rank={selectedAthleteRank}
          phoneNumber={selectedAthletePhoneNumber}
          setEditingAthlete={setEditingAthlete}
          editAthlete={editAthlete}
        />
      )}
      {showTexts && (
        <div className="textContainer">
          <Conversation phoneNumber={selectedAthletePhoneNumber} />
          <SendMessageForm setShowTexts={setShowTexts} />
        </div>
      )}
    </>
  ) : (
    <>
      <h2>No Athletes</h2>
      <button onClick={() => setAddingAthlete(true)}>Add Athlete</button>
      {addingAthlete && (
        <AthleteForm
          setMessage={props.setMessage}
          list_id={props.list_id}
          setAddingAthlete={setAddingAthlete}
          addAthlete={addAthlete}
        />
      )}
    </>
  );
}
