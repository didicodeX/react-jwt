 import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { createUser } from "../../api/user";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const validationSchema = yup.object({
    name: yup
      .string()
      .required("Il faut preciser votre nom")
      .min(2, "entree un vrai nom s'il vous"),
    email: yup
      .string()
      .required("Il faut preciser votre email")
      .email("L'email n'est pas valide"),
    password: yup
      .string()
      .required("Il faut preciser votre mot de passe")
      .min(6, "Mot de passe trop court"),
  });

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const {
    setError,
    clearErrors,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    initialValues,
    resolver: yupResolver(validationSchema),
  });

  const submit = handleSubmit(async (user) => {
    console.log("Données soumises :", user); // Ajouter ceci pour voir les données
    try {
      clearErrors();
      await createUser(user); // Appelle l'API avec les données de l'utilisateur
      navigate("/signin");
    } catch (message) {
      setError("generic", { type: "generic", message });
    }
  });
  

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={submit}>
        <div>
          <input
            {...register("name")}
            type="text"
            name="name"
            placeholder="Dylane lamene jean dupont"
          />
          {errors.name && <p>{errors.name.message}</p>}
        </div>
        <div>
          <input
            {...register("email")}
            type="email"
            placeholder="tanodylane@gmail.com"
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <input className={errors.password ? "errors" : ""}
            {...register("password")}
            type="password"
            placeholder="1237#$53"
          />
          {errors.password && <p className={errors ? "errors" : ""}>{errors.password.message}</p>}
        </div>
        <div>
          {/* <button disabled={isSubmitting}/>S'inscrire</button> */}
          <button disabled={isSubmitting} >S'inscrire</button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
