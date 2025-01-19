import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
// import Contact from "./pages/Profile/Contact/Contact";


const App = lazy(() => import("./App"));
const Homepage = lazy(() => import("./pages/Homepage/Homepage"));
const Signup = lazy(() => import("./pages/Signup/Signup"));
const Singin = lazy(() => import("./pages/Signin/Signin"));
const Profile = lazy(() => import("./pages/Profile/Profile"))
const Contact = lazy(() => import("./pages/Profile/Contact/Contact"))
const CreateContact = lazy(() => import("./pages/Profile/Contact/CreateContact"))

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "signin",
        element: <Singin />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "profile/contact",
        element: <Contact />, // Affiche uniquement le composant Contact pour /profile/contact
        children:[
          {
            path: "create",
            element: <CreateContact/>
          }
        ]
      },
    ],
  },
]);
