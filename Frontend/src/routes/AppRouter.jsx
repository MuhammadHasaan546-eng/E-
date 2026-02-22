import { chexkAuth } from "@/api/auth/check-auth";
import App from "@/App";
import AdminLayout from "@/components/admin/Layout";
import AuthLayout from "@/components/auth/Layout";
import CheckedAuth from "@/components/common/CheckedAuth";
import ShoppingLayout from "@/components/shopping/Layout";
import AdminDashboard from "@/pages/admin/Dashboard";
import AdminOrder from "@/pages/admin/Order";
import AdminProduct from "@/pages/admin/Product";
import AuthLogin from "@/pages/auth/Login";
import AuthRegister from "@/pages/auth/Register";
import NotFound from "@/pages/Error/NotFound";
import ShoppingAccount from "@/pages/shopping/Account";
import ShoppingCheckout from "@/pages/shopping/Checkout";
import ShoppingHome from "@/pages/shopping/Home";
import ShoppingListing from "@/pages/shopping/Listing";
import UnAuth from "@/pages/unauth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

function AppRouter() {
  const { isAuthenticated, user, isLoading } = useSelector(
    (state) => state.auth,
  );
  console.log("isAuthenticated", isAuthenticated);
  console.log("user", user);
  console.log("isLoading", isLoading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(chexkAuth());
  }, [dispatch]);
  if (isLoading) {
    return <Skeleton className="h-16 w-full rounded-full" />;
  }

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
        // { index: true, element: <Navigate to="login" /> },
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
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default AppRouter;
