import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import CreateRequest from "./CreateRequest";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 🔥 HOME DASHBOARD */}
        <Route path="/home" element={<Home />} />

        {/* 🔥 CREATE REQUEST PAGE */}
        <Route path="/create" element={<CreateRequest />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
