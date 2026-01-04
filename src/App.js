import React, { useEffect, useState } from "react";
import logo from "./assets/logo.jpeg";
import "./App.css";

function App() {
  const [requests, setRequests] = useState([]);
  const [message, setMessage] = useState("");
  const [resolved, setResolved] = useState([]);

  // Fetch all community issues
  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = () => {
    fetch("http://localhost:8080/requests")
      .then(res => res.json())
      .then(data => setRequests(data))
      .catch(err => console.error(err));
  };

  // Add new issue
  const submitRequest = () => {
    if (message.trim() === "") return;

    fetch("http://localhost:8080/requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    })
      .then(() => {
        setMessage("");
        fetchRequests();
      });
  };

  // Mark issue as resolved (UI-only)
  const resolveRequest = (index) => {
    if (!resolved.includes(index)) {
      setResolved([...resolved, index]);
    }
  };

  const activeCount = requests.length - resolved.length;

  return (
    <div className="app">
      <img src={logo} alt="CommuHelp Logo" className="logo" />

      <h1>CommuHelp</h1>
      <p className="subtitle">
        A community-driven platform to raise and resolve real-life issues
      </p>

      <div className="input-section">
        <input
          type="text"
          placeholder="Describe your issue (e.g. need notes, medical help, tech support)"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={submitRequest}>Post</button>
      </div>

      <p className="count">
        Active community issues: <strong>{activeCount}</strong>
      </p>

      <h2>Community Issues</h2>

      {requests.length === 0 && (
        <p className="empty">No community issues yet 🌱</p>
      )}

      <ul className="request-list">
        {requests.map((r, i) => (
          <li
            key={i}
            className={`request-item ${
              resolved.includes(i) ? "resolved" : ""
            }`}
          >
            <span>{r.message}</span>

            {!resolved.includes(i) && (
              <button
                className="resolve-btn"
                onClick={() => resolveRequest(i)}
              >
                Mark Resolved
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
