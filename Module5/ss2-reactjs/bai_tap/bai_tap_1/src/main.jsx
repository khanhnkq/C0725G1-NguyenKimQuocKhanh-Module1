import React from 'react'
import ReactDOM from 'react-dom/client'


const products = [
  {name:"Nokia",price:100},
  {name:"Iphone",price:200},
  {name:"Samsung",price:300}
]

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<table>
  <tr>
    <th>STT</th>
    <th>Tên sản phẩm</th>
    <th>Giá</th>
  </tr>
  {products.map((p,i)=>(
<tr>
  <td>{i+1}</td>
  <td>{p.name}</td>
  <td>{p.price}</td>
</tr>
  ))}
</table>)
