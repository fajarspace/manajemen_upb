import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./layouts/NotFound";
import Login from "./components/dosen/Login";
import Dashboard from "./components/dosen/Dashboard";
import Profile from "./components/dosen/profile/Profile";
import Register from "./components/dosen/Register";
import PengajuanPenelitian from "./components/dosen/penelitian/PengajuanPenelitian";
import RiwayatPenelitian from "./components/dosen/penelitian/RiwayatPenelitian";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route
            path="/pengajuan/penelitian"
            element={<PengajuanPenelitian />}
          />
          <Route path="/riwayat/penelitian" element={<RiwayatPenelitian />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
