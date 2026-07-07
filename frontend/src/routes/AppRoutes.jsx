import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ProfilePage from "../pages/ProfilePage";
import HomePage from "../pages/HomePage";
import CommunityPage from "../pages/CommunityPage";
import AddTechNotePage from "../pages/AddTechNotePage";
import EditTechNotePage from "../pages/EditTechNotePage";
import ProtectedRoutes from "./ProtectedRoutes";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      
      <Route element={<ProtectedRoutes />}>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/add" element={<AddTechNotePage />} />
        <Route path="/edit" element={<EditTechNotePage />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
