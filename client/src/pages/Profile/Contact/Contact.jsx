import React from "react";
import { useAuth } from "../../../context/AuthContext";
import { NavLink, Outlet } from "react-router-dom";

const Contact = () => {
  const { contactData, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  console.log(contactData.data);
  const contacts = contactData.data;

  // const BASE_URL = "http://localhost:3000";
  // const fetchContact = async () => {
  //   try {
  //     const response = fetch(`${BASE_URL}/contacts`, {
  //       method: "GET",
  //       credentials: "include",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     if (!response.ok) {
  //       throw new Error(`Erreur HTTP : ${response.status}`);
  //     }

  //     const data = await response.json();
  //     console.log(data);
  //     return data;
  //   } catch (error) {
  //     console.error(
  //       "Erreur lors de la reputation des contacts : ",
  //       error.message
  //     );
  //   }
  // };

  // fetchContact().then((data) => console.log("Contacts recuperes :", data));

  return (
    <>
      <p>Voici vos contact</p>
      <NavLink to="create">
      <button>Creer un nouveau contact</button>
      </NavLink>
      <ul>
        {contacts.map((contact, i) => (
          <div key={i}>
            <li>{contact.name}</li>
            <li>{contact.email}</li>
            <li>(506) {contact.phone}</li>
            <p>Date de creation {contact.createdAt} </p>
          </div>
        ))}
      </ul>
      <Outlet/>
    </>
  );
};

export default Contact;
