import { Route, Router, Routes } from "react-router-dom";
import AuthLayout from "./components/auth/Layout";
import AuthLogin from "./pages/auth/Login";
import AuthRegister from "./pages/auth/Register";
import AdminLayout from "./components/admin/Layout";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminProduce from "./pages/admin/Product";
import AdminOrder from "./pages/admin/Order";

function App() {
  return (
    <div className="flex flex-col overflow-hidden bg-white ">
      <h1> Header component</h1>

      {/* <Routes>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />} />
        <Route path="dashboard" element={<AdminDashboard />} />

        <Route path="products" element={<AdminProduce />} />

        <Route path="orders" element={<AdminOrder />} />
      </Routes> */}
    </div>
  );
}

export default App;
