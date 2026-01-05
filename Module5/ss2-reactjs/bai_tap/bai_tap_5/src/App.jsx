
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

function App() {

  return (
    <>
    <div className='container'>
      <div className='mb-3'></div>
    <h3 className='form-label'>Sign in</h3>
    <div className='mb-3'></div>
    <form className='form-control' action={""} method='get'>
      <h5 className='form-label'>Username</h5>
      <input type="text" className='form-control' id='username' name='username' />
      <div className='mb-3'></div>
      <h5 className='form-label'>Password</h5>
      <input type="text" className='form-control' id='password' name='password'/>
      <div className='mb-3'></div>
      <button className='btn btn-success'>Sign in</button>
    </form>
    </div>
    
    </>
  )
}

export default App
