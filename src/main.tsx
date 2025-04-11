<<<<<<< HEAD
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Router from './Router'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router/>
  </StrictMode>,
)
=======
import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./adrouter"; // el archivo que me compartiste

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);
>>>>>>> pablo
