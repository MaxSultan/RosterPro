import React, { useState, useEffect } from "react";
import Rosters from "../components/Roster/Rosters";
import Axios from "axios";
import RosterForm from "../components/Roster/RosterForm";
import DeleteConfirmation from "../components/Roster/DeleteConfirmation";
import RosterDetails from "../components/Roster/RosterDetails";
import Message from "../components/Roster/Message";

export default function Home() {
  const [rosters, setRosters] = useState([]);
  const [adding, setAdding] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [editing, setEditing] = useState(false);
  const [details, setDetails] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedRosterId, setSelectedRosterId] = useState("");
  const [selectedRosterName, setSelectedRosterName] = useState("");
  const [selectedRosterYear, setSelectedRosterYear] = useState("");

  useEffect(() => {
    getRosters();
  }, []);

  const getRosters = () => {
    Axios.get("/api/lists")
      .then((res) => setRosters(res.data))
      .catch((err) => setMessage(err));
  };

  const createRoster = (rosterObj) => {
    Axios.post("/api/lists", rosterObj)
      .then((res) => setRosters([res.data, ...rosters]))
      .catch((err) => setMessage(err));
  };

  const deleteRoster = (id) => {
    Axios.delete(`/api/lists/${id}`)
      .then((res) =>
        setRosters(rosters.filter((roster) => roster.id !== res.data.id))
      )
      .catch((err) => setMessage(err));
  };

  const editRoster = (id, rosterObj) => {
    Axios.put(`/api/lists/${id}`, rosterObj)
      .then((res) => {
        const updatedRosters = rosters.map((r) => {
          if (r.id === res.data.id) return res.data;
          return r;
        });
        setRosters(updatedRosters);
      })
      .catch((err) => setMessage(err));
  };

  const deleteItemSelected = (id) => {
    if (id === "") return setMessage("Please Select an item to delete");
    return setDeleting(true);
  };

  const editItemSelected = (id) => {
    if (id === "") return setMessage("Please Select an item to edit");
    return setEditing(true);
  };

  const detailsItemSelected = (id) => {
    if (id === "") return setMessage("Please Select an item to view");
    return setDetails(!details);
  };

  const deselectItem = () => {
    setSelectedRosterId("");
    setSelectedRosterName("");
    setSelectedRosterYear("");
    setDetails(false);
    setEditing(false);
    setDeleting(false);
  };

  const ItemSelected = (itemArray, selectedId) => {
    if (itemArray.map((item) => item.id).includes(selectedId)) {
      return (
        <div className="center-flex left">
          <div className="sideBySide">
            <button
              onClick={() => deleteItemSelected(deleting, selectedRosterId)}
            >
              Delete Roster
            </button>
            <button onClick={() => editItemSelected(selectedRosterId)}>
              Edit Roster
            </button>
          </div>
          <div className="sideBySide">
            <button onClick={() => detailsItemSelected(selectedRosterId)}>
              {details ? "Hide Roster" : "View Roster"}
            </button>
            <button onClick={() => deselectItem()}>De-select</button>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="home">
      {message !== "" && <Message message={message} />}
      <section className="sideBySide">
        <h1>RosterPro</h1>
        <button onClick={() => setAdding(true)}>Add Roster</button>
      </section>
      <section>
        <div className="center">
          <Rosters
            rosters={rosters}
            selectedRosterId={selectedRosterId}
            setSelectedRosterId={setSelectedRosterId}
            setSelectedRosterName={setSelectedRosterName}
            setSelectedRosterYear={setSelectedRosterYear}
          />
          {ItemSelected(rosters, selectedRosterId)}
          {adding && (
            <RosterForm
              setAdding={setAdding}
              createRoster={createRoster}
              setMessage={setMessage}
            />
          )}
          {editing && (
            <RosterForm
              setEditing={setEditing}
              setMessage={setMessage}
              editRoster={editRoster}
              selectedRosterId={selectedRosterId}
              selectedRosterYear={selectedRosterYear}
              selectedRosterName={selectedRosterName}
            />
          )}
          {deleting && (
            <DeleteConfirmation
              setDetails={setDetails}
              setMessage={setMessage}
              setDeleting={setDeleting}
              selectedRosterId={selectedRosterId}
              selectedRosterYear={selectedRosterYear}
              selectedRosterName={selectedRosterName}
              deleteRoster={deleteRoster}
            />
          )}
        </div>
        {details && (
          <RosterDetails
            setDetails={setDetails}
            selectedRosterId={selectedRosterId}
            setMessage={setMessage}
            setDetails={setDetails}
          />
        )}
      </section>
      <div className="dark-mode-button"></div>
    </div>
  );
}
