import React from "react";
import { Button } from "../ui/button";
import { LogOut, Menu } from "lucide-react";

const AdminHeader = () => {
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
      <Button className="lg:hidden sm:block ">
        <Menu />
        <span className="sr-only">Toggle menu</span>
      </Button>
      <div className="flex  flex-1 justify-end">
        <Button className="inline-flex items-center gap-2 rounded-md px-4  py-2 text-sm font-medium shadow-md">
          <LogOut />
          <span className="hidden sm:inline">Logout</span>
        </Button>
      </div>
    </header>
  );
};

export default AdminHeader;
