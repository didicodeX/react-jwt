import React, { createContext, useContext, useState, useEffect } from "react";
const BASE_URL = "http://localhost:3000";
// const BASE_URL = "https://api.myaddressesbook.com";
// Création du contexte
const AuthContext = createContext();

// Fournisseur du contexte
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Stocke les informations utilisateur
  const [loading, setLoading] = useState(true); // Indique si la récupération des données est en cours
  const [userData,setUserData] = useState(null)
  const [contactData,setContactData] = useState(null)

  // Récupérer l'utilisateur connecté depuis l'API `/api/me`
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`${BASE_URL}/users/me`, {
          method: "GET",
          credentials: "include", // Inclure les cookies
        });

        if (!response.ok) {
          throw new Error("Non autorisé");
        }

        const userData = await response.json();
        setUserData(userData);
        setUser(userData); // Met à jour les informations utilisateur
      } catch (error) {
        setUser(null); // Aucun utilisateur connecté
      } finally {
        setLoading(false); // Chargement terminé
      }
    };

    const fetchContact = async ()=> {
      try {
        const response = await fetch(`${BASE_URL}/contacts`, {
          method: "GET",
          credentials: "include", // Inclure les cookies
        });

        if (!response.ok) {
          throw new Error("Non autorisé");
        }

        const userData = await response.json();
        setContactData(userData);
      } catch (error) {
        setUser(null); // Aucun utilisateur connecté
      } finally {
        setLoading(false); // Chargement terminé
      }
    }

    fetchUserProfile();
    fetchContact();
  }, []);

  // Déconnexion
  const logout = async () => {
    try {
      await fetch(`${BASE_URL}/users/logout`, {
        method: "POST",
        credentials: "include", // Inclure les cookies
      });
      setUser(null); // Efface l'utilisateur localement
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  };

  const login = async (data) => {
    const response = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: {"Content-Type": "Application/json"},
      body: JSON.stringify(data),
      credentials: "include"
    })

    const userData = await response.json();
    setUserData(userData);
    setUser(userData.user); // Met à jour l'utilisateur dans le contexte
  
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout, login, userData, contactData }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personnalisé pour accéder au contexte
export const useAuth = () => useContext(AuthContext);
