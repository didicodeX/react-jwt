import React from "react";
import {useForm} from "react-hook-form"
import * as yup from "yup"
const CreateContact = () => {
  return (
    <div>
      <h2>Creer un nouveau contact</h2>
      <form>
        <input  type="text" name="name" id="name" placeholder="name" />
        <br />
        <input type="email" name="email" id="email" placeholder="email" />
        <br />
        <input type="number" name="phone" id="phone" placeholder="phone" />
        <br />
        <button>Create</button>
      </form>
    </div>
  );
};

export default CreateContact;
