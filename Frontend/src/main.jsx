import { StrictMode } from "react";
import React from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App.jsx";
import store from "./store/store.js";
import AuthLayout from "./components/auth/Layout.jsx";
import AuthLogin from "./pages/auth/Login.jsx";
import AuthRegister from "./pages/auth/Register.jsx";
import AdminLayout from "./components/admin/Layout.jsx";
import AdminDashboard from "./pages/admin/Dashboard.jsx";
import AdminOrder from "./pages/admin/Order.jsx";
import AdminProduct from "./pages/admin/Product.jsx";
import ShoppingLayout from "./components/shopping/Layout.jsx";
import NotFound from "./pages/Error/NotFound.jsx";
import ShoppingHome from "./pages/shopping/Home.jsx";
import ShoppingListing from "./pages/shopping/Listing.jsx";
import ShoppingCheckout from "./pages/shopping/Checkout.jsx";
import ShoppingAccount from "./pages/shopping/Account.jsx";
import CheckedAuth from "./components/common/CheckedAuth.jsx";
import UnAuth from "./pages/unauth/index.jsx";

const isAuthenticated = true;
// const user = {
//   name: "Muhammad Hasaan",
//   role: "user",
// };

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },

  {
    path: "/auth",
    element: (
      <CheckedAuth /* isAuthenticated={isAuthenticated} user={user} */>
        <AuthLayout />
      </CheckedAuth>
    ),
    children: [
      // { index: true, element: <Navigate to="login" /> },
      { path: "login", element: <AuthLogin /> },
      { path: "register", element: <AuthRegister /> },
    ],
  },

  {
    path: "/admin",
    element: (
      <CheckedAuth /* isAuthenticated={isAuthenticated} user={user} */>
        <AdminLayout />
      </CheckedAuth>
    ),
    children: [
      // { index: true, element: <AdminDashboard /> },
      { path: "dashboard", element: <AdminDashboard /> },
      { path: "products", element: <AdminProduct /> },
      { path: "orders", element: <AdminOrder /> },
    ],
  },
  {
    path: "/shop",
    element: (
      <CheckedAuth /* isAuthenticated={isAuthenticated} user={user} */>
        <ShoppingLayout />
      </CheckedAuth>
    ),
    children: [
      {
        path: "home",
        element: <ShoppingHome />,
      },
      { path: "listing", element: <ShoppingListing /> },
      { path: "checkout", element: <ShoppingCheckout /> },
      { path: "account", element: <ShoppingAccount /> },
    ],
  },

  {
    path: "/unauth-page",
    element: <UnAuth />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
