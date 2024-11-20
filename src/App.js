import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./components/Login";
import Users from "./pages/Users";
import Tenants from "./pages/Tenants";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import AddTenant from "./pages/AddTenant";
import EditTenant from "./pages/EditTenant";
import ScrollToTop from "./components/ScrollToTop";
import Payment from "./pages/Payment";
import Register from "./components/Register";

function App() {
  return (
    <div>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* <Route path="/" element={<Login />} /> */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/add" element={<AddUser />} />
          <Route path="/users/edit/:id" element={<EditUser />} />
          <Route path="/tenants" element={<Tenants />} />
          <Route path="/tenants/add" element={<AddTenant />} />
          <Route path="/tenants/edit/:id" element={<EditTenant />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
