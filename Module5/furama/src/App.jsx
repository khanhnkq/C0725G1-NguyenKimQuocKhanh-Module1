import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HeaderComponent from './components/HeaderComponent'
import FooterComponent from './components/FooterComponent'
import Home from './pages/Home'
import Service from './pages/services/Service.jsx'
import {AddServiceComponent} from "./pages/services/AddService.jsx";
import {EditService} from "./pages/services/EditService.jsx";
import Customer from './pages/customers/Customer.jsx'
import AddCustomer from './pages/customers/AddCustomer.jsx'
import EditCustomer from './pages/customers/EditCustomer.jsx'
import Contract from './pages/contracts/Contract.jsx'
import AddContract from './pages/contracts/AddContract.jsx'

function App() {
    return (
        <Router>
            <div className="d-flex flex-column min-vh-100">
                <HeaderComponent />
                <main className="flex-grow-1">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/services" element={<Service />} />
                        <Route path="/services/add" element={<AddServiceComponent />} />
                        <Route path='/services/edit/:id' element={<EditService />} />
                        <Route path="/customers" element={<Customer />} />
                        <Route path="/customers/add" element={<AddCustomer />} />
                        <Route path="/customers/edit/:id" element={<EditCustomer />} />
                        <Route path="/contracts" element={<Contract />} />
                        <Route path="/contracts/add" element={<AddContract />} />
                    </Routes>
                </main>
                <FooterComponent />
            </div>
        </Router>
    )
}

export default App
