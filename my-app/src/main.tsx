import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { Main } from './pages/mainPage.tsx';
import Auth from './components/Auth.tsx';
import Reg from './components/Reg.tsx';

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
