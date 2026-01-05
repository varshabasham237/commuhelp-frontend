import React, { useEffect, useState } from "react";

function Home() {
  const [requests, setRequests] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetch("https://commuhelp-backend-1.onrender.com/auth/login")
      .then((res) => res.json())
      .then((data) => setRequests(data))
      .catch(() => setRequests([]));
  }, []);

  const submitRequest = () => {
    if (!title || !category || !description) {
      alert("Please fill all fields");
      return;
    }

    fetch("https://commuhelp-backend-1.onrender.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        category,
        description,
      }),
    })
      .then(() => {
        setShowModal(false);
        setTitle("");
        setCategory("");
        setDescription("");
        window.location.reload();
      })
      .catch(() => alert("Failed to create request"));
  };

  return (
    <div style={styles.page}>
      {/* HEADER */}
      <div style={styles.header}>
        <h2>CommuHelp</h2>
        <button style={styles.logout}>Logout</button>
      </div>

      {/* HERO CARD */}
      <div style={styles.hero}>
        <h1>Need help from your community?</h1>
        <p>Raise a request and nearby volunteers can assist you.</p>
        <button style={styles.primaryBtn} onClick={() => setShowModal(true)}>
          + Raise Help Request
        </button>
      </div>

      {/* REQUEST LIST */}
      <h3 style={{ marginTop: "40px" }}>Community Requests</h3>

      <div style={styles.grid}>
        {requests.length === 0 && <p>No requests yet.</p>}

        {requests.map((req, index) => (
          <div key={index} style={styles.card}>
            <h4>{req.title}</h4>
            <p style={styles.category}>{req.category}</p>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h3>Raise Help Request</h3>

            <input
              style={styles.input}
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <select
              style={styles.input}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select category</option>
              <option>Garbage</option>
              <option>Medical</option>
              <option>Water</option>
              <option>Electricity</option>
              <option>Other</option>
            </select>

            <textarea
              style={{ ...styles.input, height: "80px" }}
              placeholder="Describe the issue"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <div style={styles.modalActions}>
              <button onClick={() => setShowModal(false)}>Cancel</button>
              <button style={styles.primaryBtn} onClick={submitRequest}>
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ===== STYLES ===== */
const styles = {
  page: {
    padding: "30px",
    fontFamily: "Arial, sans-serif",
    background: "#f6f8fc",
    minHeight: "100vh",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logout: {
    padding: "8px 16px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    background: "#fff",
    cursor: "pointer",
  },
  hero: {
    marginTop: "30px",
    background: "#ffffff",
    padding: "30px",
    borderRadius: "16px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
  },
  primaryBtn: {
    marginTop: "15px",
    padding: "12px 20px",
    borderRadius: "10px",
    border: "none",
    background: "#4f6ef7",
    color: "#fff",
    cursor: "pointer",
    fontSize: "15px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "20px",
    marginTop: "20px",
  },
  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "14px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.04)",
  },
  category: {
    color: "#6b7280",
    fontSize: "14px",
  },
  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    background: "#fff",
    padding: "25px",
    borderRadius: "14px",
    width: "320px",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  modalActions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
    marginTop: "20px",
  },
};

export default Home;
