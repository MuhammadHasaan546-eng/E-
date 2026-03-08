import React from "react";
import { Button } from "../ui/button";
import { LogOut, Menu } from "lucide-react";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/api/auth/logout";
import { useNavigate } from "react-router-dom";
const AdminHeader = ({ onOpenChange }) => {
  const dispatch = useDispatch();
  const Navgate = useNavigate();
  const handleLogout = () => {
    dispatch(logoutUser());
    Navgate("/");
  };
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 bg-background border-b">
      <Button className="lg:hidden" onClick={() => onOpenChange(true)}>
        <Menu />
        <span className="sr-only">Toggle menu</span>
      </Button>

      <div className="flex flex-1 justify-end" onClick={handleLogout}>
        <Button className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium shadow-md">
          <LogOut />
          <span className="hidden sm:inline">Logout</span>
        </Button>
      </div>
    </header>
  );
};

export default AdminHeader;
