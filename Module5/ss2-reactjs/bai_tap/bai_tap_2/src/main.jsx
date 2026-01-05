import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'


const vehicles = [
  {id:"VH-001",number:"59-F1",owner:"Khanh",manufactureDate:new Date("2024-01-15").toLocaleDateString("vi-VN")},
  {id:"VH-002",number:"92-F1",owner:"QNam",manufactureDate:new Date("2024-01-15").toLocaleDateString("vi-VN")},
  {id:"VH-003",number:"43-F1",owner:"DNang",manufactureDate:new Date("2024-01-15").toLocaleDateString("vi-VN")}
]

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<table className='table'>
  <thead><tr>
    <th>Id</th>
    <th>Biển kiểm soát</th>
    <th>Chủ sở hữu</th>
    <th>Ngày sản xuất</th>
  </tr></thead>
  <tbody>{vehicles.map((v)=>(
<tr key={v.id}>
  <td>{v.id}</td>
  <td>{v.number}</td>
  <td>{v.owner}</td>
  <td>{v.manufactureDate}</td>
</tr>
  ))}</tbody>
  
</table>)
