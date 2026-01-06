import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import TableComponent from "./components/TableComponent.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TableComponent></TableComponent>
  </StrictMode>,
)
