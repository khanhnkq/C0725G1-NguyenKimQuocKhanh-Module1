import React from 'react'
import ReactDOM from 'react-dom/client'
const nokia = {
  name:"Nokia",
  price:100,
  amount:10
} 
const iphone = {
  name:"Iphone",
  price:200,
  amount:10
} 
const samsung = {
  name:"Samsung",
  price:100,
  amount:10
} 

const products = [nokia,iphone,samsung]

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<table>
  <tr>
    <th>STT</th>
    <th>Product name</th>
    <th>Price</th>
  </tr>
  {products.map((p,i)=>(
<tr>
  <td>{i+1}</td>
  <td>{p.name}</td>
  <td>{p.price}</td>
</tr>
  ))}
</table>)
