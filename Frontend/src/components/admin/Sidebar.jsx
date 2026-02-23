import {
  ChartNoAxesCombined,
  User,
  ChartSpline,
  LayoutDashboard,
  ShoppingBasket,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const adminSidebarMenues = [
  {
    id: 1,
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard size={20} />,
  },
  {
    id: 2,
    label: "Products",
    path: "/admin/products",
    icon: <ShoppingBasket size={20} />,
  },
  {
    id: 3,
    label: "Orders",
    path: "/admin/orders",
    icon: <ChartSpline size={20} />,
  },
  {
    id: 4,
    label: "Users",
    path: "/admin/users",
    icon: <User size={20} />,
  },
];

const MenuItems = ({ onNavigate }) => {
  return (
    <nav className="flex flex-col gap-2 mt-8 overflow-y-auto">
      {adminSidebarMenues.map((item) => (
        <div
          key={item.id}
          onClick={() => onNavigate(item.path)}
          className="flex items-center gap-3 cursor-pointer 
                     hover:bg-accent hover:text-primary 
                     transition-all duration-300 rounded-md p-3"
        >
          {item.icon}
          <span className="text-lg font-semibold">{item.label}</span>
        </div>
      ))}
    </nav>
  );
};

const AdminSidebar = ({ open, onOpenChange }) => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
    onOpenChange(false); // mobile drawer close
  };

  return (
    <>
      {/* Mobile Sidebar */}
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="left" className="w-64 p-6">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b border-gray-200">
              <SheetTitle className="flex items-center gap-2">
                <ChartNoAxesCombined size={28} />
                Admin Panel
              </SheetTitle>
            </SheetHeader>

            <MenuItems onNavigate={handleNavigate} />
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <aside className="hidden w-64 flex-col p-6 lg:flex bg-background border-r">
        <div
          className="flex items-center gap-2 justify-center cursor-pointer"
          onClick={() => navigate("/admin/dashboard")}
        >
          <h1 className="text-2xl font-extrabold text-primary">Admin Panel</h1>
        </div>

        <MenuItems onNavigate={navigate} />
      </aside>
    </>
  );
};

export default AdminSidebar;
