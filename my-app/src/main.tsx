import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import App from "./App.tsx";
import { Main } from "./pages/mainPage.tsx";
import Auth from "./components/Auth.tsx";
import Reg from "./components/Reg.tsx";
import ProjectPage from "./pages/projectPage.tsx";
import CleaningSystemPage from "./pages/smth.tsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/reg",
    element: <Reg />,
  },
  {
    path: "/project/:id",
    element: <ProjectPage />,
  },
  {
    path: "/main",
    element: <Main />,
  },
  {
    path: "/smth",
    element: <CleaningSystemPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
