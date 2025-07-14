import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Utilise le hook du contexte

const Signin = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // Récupération de la fonction `login` depuis le contexte

  // Validation avec Yup
  const validationSchema = yup.object({
    email: yup
      .string()
      .required("Il faut préciser votre email")
      .email("L'email n'est pas valide"),
    password: yup
      .string()
      .required("Il faut préciser votre mot de passe")
      .min(6, "Mot de passe trop court"),
  });

  // Configuration de React Hook Form
  const {
    setError,
    clearErrors,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(validationSchema), // Validation avec Yup
    defaultValues: {
      email: "", // Valeurs initiales
      password: "",
    },
  });

  // Gestion de la soumission
  const submit = handleSubmit(async (data) => {
    try {
      clearErrors();
      await login(data); // Appelle la fonction login du contexte
      navigate("/profile"); // Redirige vers la page profil
    } catch (error) {
      console.error("Erreur lors de la connexion :", error.message);

      // Affiche un message d'erreur global dans le formulaire
      setError("generic", {
        type: "server",
        message: error.message || "Une erreur est survenue lors de la connexion.",
      });
    }
  });

  return (
    <div>
      <h2>Se connecter</h2>
      <form onSubmit={submit}>
        {/* Champ email */}
        <div>
          <input
            {...register("email")}
            type="email"
            placeholder="tanodylane@gmail.com"
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        {/* Champ mot de passe */}
        <div>
          <input
            {...register("password")}
            type="password"
            placeholder="Mot de passe"
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        {/* Message d'erreur général */}
        {errors.generic && <p>{errors.generic.message}</p>}

        {/* Bouton de soumission */}
        <div>
          <button type="submit" disabled={isSubmitting}>
            Se connecter
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signin;
