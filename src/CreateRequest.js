import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateRequest() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const submitRequest = async () => {
    if (!title || !description) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await fetch("https://commuhelp-backend-1.onrender.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
        }),
      });

      if (!response.ok) {
        const text = await response.text();
        alert("Failed: " + text);
        return;
      }

      alert("Help request created successfully!");
      navigate("/home");
    } catch (err) {
      alert("Backend not reachable");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2>Create Help Request</h2>

        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
        />

        <textarea
          placeholder="Describe your problem"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={styles.textarea}
        />

        <button onClick={submitRequest} style={styles.button}>
          Submit Request
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg,#667eea,#764ba2)",
  },
  card: {
    background: "white",
    padding: "30px",
    borderRadius: "14px",
    width: "350px",
    boxShadow: "0 15px 35px rgba(0,0,0,0.2)",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    height: "100px",
    marginBottom: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  button: {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    background: "#667eea",
    color: "white",
    cursor: "pointer",
  },
};

export default CreateRequest;
