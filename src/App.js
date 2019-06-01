import React from "react";
import logo from "./logo.svg";
import shuttleLogo from "./shuttleLogo.png";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={shuttleLogo} className="App-logo" alt="logo" />
        <p>Shuttle Tracker Prototype Web application</p>
        <a
          className="App-link"
          href="https://dev.azure.com/Apptelier/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Apptelier
        </a>
      </header>
    </div>
  );
}

export default App;
