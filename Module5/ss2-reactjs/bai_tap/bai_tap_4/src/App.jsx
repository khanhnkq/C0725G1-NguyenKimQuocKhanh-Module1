
import './App.css'
import { getAll } from './service/customerService'

function App() {
  const customers = getAll();

  const table = (<>
  <h1>Customer List</h1>
  <table className='table'>
    <thead>
      <tr>
        <td>Id</td>
        <td>Code</td>
        <td>Name</td>
        <td>Address</td>
        <td>Type</td>
      </tr>
    </thead>
    <tbody>
      {customers.map(e=>(
        <tr key={e.id}>
          <td >{e.id}</td>
          <td >{e.code}</td>
          <td >{e.name}</td>
          <td >{e.address}</td>
          <td >{e.type}</td>
        </tr>
      ))}
    </tbody>

  </table>
  </>)

  

  return table
}

export default App
