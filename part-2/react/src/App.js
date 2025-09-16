import React, { useState } from "react";
import "./App.css";

function App() {
  const [names, setNames] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") {
      alert("Please enter at least one name.");
      return;
    }

    const newNames = inputValue
      .split(",")
      .map((name) => ({
        name: name.trim(),
        charCount: name.trim().length,
      }))
      .filter((item) => item.name !== "");
    setNames((prevNames) => [...prevNames, ...newNames]);
    setInputValue("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <div className="container">
      <h1>Name List Manager</h1>
      <div className="input-section">
        <input
          type="text"
          id="nameInput"
          placeholder="Enter names separated by commas (e.g., John, Jane, Bob)"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button id="submitBtn" onClick={handleSubmit}>
          Add Names
        </button>
      </div>
      <table id="nameTable">
        <thead>
          <tr>
            <th>Name</th>
            <th>Character Count</th>
          </tr>
        </thead>
        <tbody id="nameTableBody">
          {names.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.charCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
