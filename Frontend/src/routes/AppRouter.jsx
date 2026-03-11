import { getFeatureImages } from "@/api/common/feature";

import App from "@/App";
import AdminLayout from "@/components/admin/Layout";
import AuthLayout from "@/components/auth/Layout";
import CheckedAuth from "@/components/common/CheckedAuth";
import ShoppingLayout from "@/components/shopping/Layout";
import AdminDashboard from "@/pages/admin/Dashboard";
import AdminOrder from "@/pages/admin/Order";
import AdminProduct from "@/pages/admin/Product";
import AdminFeatures from "@/pages/admin/Features";
import AuthLogin from "@/pages/auth/Login";
import AuthRegister from "@/pages/auth/Register";
import NotFound from "@/pages/Error/NotFound";
import ShoppingAccount from "@/pages/shopping/Account";
import ShoppingCheckout from "@/pages/shopping/ShoppingCheckout";
import ShoppingHome from "@/pages/shopping/Home";
import ShoppingListing from "@/pages/shopping/Listing";
import PaypalReturnPage from "@/pages/shopping/PaypalReturnPage";
import PaymentSuccessPage from "@/pages/shopping/PaymentSuccessPage";
import UnAuth from "@/pages/Error/index";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SearchPage from "@/pages/shopping/Search";
import { chexkAuth } from "@/api/auth/check-auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },

  {
    path: "/auth",
    element: (
      <CheckedAuth>
        <AuthLayout />
      </CheckedAuth>
    ),
    children: [
      { path: "login", element: <AuthLogin /> },
      { path: "register", element: <AuthRegister /> },
    ],
  },

  {
    path: "/admin",
    element: (
      <CheckedAuth>
        <AdminLayout />
      </CheckedAuth>
    ),
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "dashboard", element: <AdminDashboard /> },
      { path: "products", element: <AdminProduct /> },
      { path: "orders", element: <AdminOrder /> },
      { path: "features", element: <AdminFeatures /> },
    ],
  },
  {
    path: "/shop",
    element: (
      <CheckedAuth>
        <ShoppingLayout />
      </CheckedAuth>
    ),
    children: [
      {
        path: "home",
        element: <ShoppingHome />,
      },
      { index: true, element: <Navigate to="home" replace /> },
      { path: "listing", element: <ShoppingListing /> },
      { path: "checkout", element: <ShoppingCheckout /> },
      { path: "account", element: <ShoppingAccount /> },
      { path: "paypal-return", element: <PaypalReturnPage /> },
      { path: "payment-success", element: <PaymentSuccessPage /> },
      { path: "search", element: <SearchPage /> },
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

function AppRouter() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(chexkAuth());
    dispatch(getFeatureImages());
  }, [dispatch]);

  return <RouterProvider router={router} />;
}

export default AppRouter;
