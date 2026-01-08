import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Table} from "react-bootstrap";
import {TableComponent} from "./component/TableComponent.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <TableComponent/>
  </StrictMode>,
)
