import React, { useEffect, useState } from "react";
import Axios from "axios";
import TextsFromContact from "../components/TextsFromContact";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Home from "./Home";

export default function Dashboard() {
  const [texts, setTexts] = useState([]);
  const [showTexts, setShowTexts] = useState(false);
  const [currentContact, setCurrentContact] = useState("");
  const [rostersVisible, setRostersVisible] = useState(true);

  useEffect(() => {
    Axios.get("/api/all_messages")
      .then((response) => {
        let textsOrganizedByRecipient = {};
        let allRecipients = [];
        response.data.forEach((text) => allRecipients.push(text.to));
        new Set(allRecipients).forEach((recipient) => {
          textsOrganizedByRecipient[recipient] = [];
        });
        response.data.forEach((text) => {
          for (const [key, value] of Object.entries(
            textsOrganizedByRecipient
          )) {
            if (text.to === key) {
              value.push(text);
            }
          }
        });
        setTexts(textsOrganizedByRecipient);
      })
      .catch((error) => console.log(error));
  }, []);

  const displayCurrentContactsTexts = (contact) => {
    setShowTexts(true);
    setCurrentContact(contact);
  };

  const renderTexts = () => {
    console.log(texts);
    return Object.keys(texts).map(function (key) {
      return (
        <div key={key} className="messageItem">
          <h3>{key}</h3>
          <p key={texts[key][texts[key].length - 1].time}>
            {texts[key][texts[key].length - 1].body}
          </p>
          <p>{texts[key][texts[key].length - 1].time}</p>
          <button onClick={() => displayCurrentContactsTexts(key)}>
            show all
          </button>
        </div>
      );
    });
  };

  return (
    <div className="background icon-align">
      <div className="sideIcons">
        <FontAwesomeIcon
          icon="chart-pie"
          size="2x"
          className={rostersVisible && "activeIcon dashIcon"}
        />
        <FontAwesomeIcon icon="info-circle" size="2x" className="dashIcon" />
        <div className="circle dashIcon">
          <FontAwesomeIcon icon="comments" />
        </div>
        <div className="circle dashIcon">
          <FontAwesomeIcon icon="home" />
        </div>
      </div>
      <div className="dash-foreground">
        <header className="dash-header">
          <h1>Dashboard</h1>
          <input placeholder="Search" className="searchBar" />
        </header>
        <div className="mainDash">
          <section className="dashOverview">
            <h2>Overview</h2>
            {rostersVisible && <Home />}
          </section>
          <section className="allTexts">
            <div className="messageTitle">
              <h1>Messages</h1>
            </div>
            {Object.keys(texts).length > 0 && <div>{renderTexts()}</div>}
            <div className="endOfMessages"></div>
          </section>
          {showTexts && (
            <TextsFromContact
              allTexts={texts[currentContact]}
              setShowTexts={setShowTexts}
            />
          )}
        </div>
      </div>
    </div>
  );
}
