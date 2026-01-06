import { StrictMode } from 'react'
import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ListComponent from "./component/ListComponent.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ListComponent></ListComponent>
  </StrictMode>
)
