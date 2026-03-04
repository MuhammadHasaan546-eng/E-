import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./Sidebar";
import AdminHeader from "./Header";

const AdminLayout = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full">
      <AdminSidebar open={open} onOpenChange={setOpen} />

      <div className="flex flex-1 flex-col">
        <AdminHeader onOpenChange={setOpen} />
        <main className="flex-1 flex-col flex bg-muted/40 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
