import React, { useState } from "react";

export default function TextsFromContact({ allTexts, setShowTexts }) {
  const showAllTextsFrom = (arr) => {
    return arr.map((text) => (
      <div className="textItem">
        <div>{text.body}</div>
        <p>{text.time}</p>
      </div>
    ));
  };

  {
    return (
      <div class="popupBackground">
        <div className="popup">
          <div className="popupHeader">
            <h1>{allTexts[0].to}</h1>
            <button onClick={() => setShowTexts(false)}>close</button>
          </div>
          {showAllTextsFrom(allTexts)}
        </div>
      </div>
    );
  }
}
