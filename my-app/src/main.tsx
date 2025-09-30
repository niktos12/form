import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { Main } from './mainPage.tsx';
import Auth from './Auth.tsx';
import Reg from './Reg.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path:"/auth",
    element:<Auth/>
  },
  {
    path:"/reg",
    element:<Reg/>
  },
  {
    path:"/main",
    element:<Main/>
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
