import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {TableComponent} from "./components/TableComponent.jsx";
import NavbarComponent from "./components/NavbarComponent.jsx";
import {AddComponent} from "./components/AddComponent.jsx";
import DetailComponent from "./components/DetailComponent.jsx";
import UpdateComponent from "./components/UpdateComponent.jsx";
import {Toaster} from "react-hot-toast";

createRoot(document.getElementById('root')).render(

      <BrowserRouter>
          <Toaster position="top-right"
                   reverseOrder={true}/>
          <NavbarComponent></NavbarComponent>
          <Routes>
              <Route path={'soccerplayer/update/:id'} element={<UpdateComponent/>}></Route>
              <Route path="/soccerplayer/add" element={<AddComponent/>}></Route>
              <Route path="/" element={<TableComponent/>}></Route>
              <Route path={'/soccerplayer/detail/:id'} element={<DetailComponent/>}></Route>
          </Routes>
      </BrowserRouter>

)
