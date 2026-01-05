
import React from 'react'
import './App.css'
import { getAll } from './service/provinceService'

function App() {
  const provinces = getAll();
  const content = provinces.map((c)=>React.createElement("li",null,c.name))
  const list = React.createElement("ul",null,content)
  const title = React.createElement("h1",null,"City List")
  return React.createElement("div",null,title,list)
}

export default App
