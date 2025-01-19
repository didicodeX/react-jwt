import React, { useEffect, useState } from "react";
import "./Profile.scss";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { NavLink } from "react-router-dom";

const Profile = () => {
  const { user, userData, loading } = useAuth();
  const navigate = useNavigate();
  console.log(userData);

  if (loading) return <div>Loading...</div>;

  if (!user) {
    navigate("/login"); // Redirige si l'utilisateur n'est pas connecté
    return null;
  }

  return (
    <div>
      <h2>Profile</h2>
      <ul>
        <li>Nom: {user.name} </li>
        <li>Email: {user.email} </li>
        <NavLink to="contact" className="mr-15">
          Voir vos contact
        </NavLink>
      </ul>
    </div>
  );
};

export default Profile;
