import { chexkAuth } from "@/api/auth/check-auth";
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
import { useDispatch, useSelector } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import SearchPage from "@/pages/shopping/Search";
import Loading from "@/components/common/IsLoading";
import { AnimatePresence } from "framer-motion";

function AppRouter() {
  const { isAuthenticated, user, isLoading } = useSelector(
    (state) => state.auth,
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(chexkAuth());
    dispatch(getFeatureImages());
  }, [dispatch]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
    },

    {
      path: "/auth",
      element: (
        <CheckedAuth isAuthenticated={isAuthenticated} user={user}>
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
        <CheckedAuth isAuthenticated={isAuthenticated} user={user}>
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
        <CheckedAuth isAuthenticated={isAuthenticated} user={user}>
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

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <Loading key="loading" />
      ) : (
        <RouterProvider key="router" router={router} />
      )}
    </AnimatePresence>
  );
}

export default AppRouter;
