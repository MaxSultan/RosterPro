import React from "react";
import "./App.css";
import Navigation from "./navigation/Navigation.js";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(fas);

function App() {
  return (
    <div className="App">
      <Navigation />
    </div>
  );
}

export default App;
