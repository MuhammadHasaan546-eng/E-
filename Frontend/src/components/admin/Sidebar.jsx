import { adminSidebarMenues } from "@/config";
import { ChartNoAxesCombined } from "lucide-react";
import { useNavigate } from "react-router-dom";

function menuHandler(path) {
  return (
    <nav className="flex flex-col gap-2 mt-8 ">
      {adminSidebarMenues.map((menu) => (
        <div
          className="flex items-center gap-2 rounded-md px-4 py-2 cursor-pointer"
          key={menu.id}
          onClick={() => navigate(menu.path)}
        >
          {menu.label}
        </div>
      ))}
    </nav>
  );
}

const AdminSidebar = () => {
  const navigate = useNavigate();

  return (
    <>
      <aside className="hidden w-64 flex-col p-6 lg:flex bg-background border-r">
        <div
          className="flex items-center gap-2 justify-center cursor-pointer "
          onClick={() => navigate("/admin/dashboard")}
        >
          <ChartNoAxesCombined size={32} />
          <h1 className="text-2xl font-extrabold text-primary text-nowrap    ">
            Admin Panel
          </h1>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
