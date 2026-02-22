import { ChartSpline, LayoutDashboard, ShoppingBasket } from "lucide-react";

export const registerFromControls = [
  {
    name: "userName",
    label: "User",
    placeholder: "Enter your name",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const loginFromControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const adminSidebarMenues = [
  {
    id: 1,
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    id: 2,
    label: "Products",
    path: "/admin/products",
    icon: <ShoppingBasket />,
  },
  {
    id: 3,
    label: "Orders",
    path: "/admin/orders",
    icon: <ChartSpline />,
  },
  {
    id: 4,
    label: "Users",
    path: "/admin/users",
  },
];
