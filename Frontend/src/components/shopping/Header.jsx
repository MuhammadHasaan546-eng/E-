// import { HousePlug, Menu } from "lucide-react";
// import React from "react";
// import { Link } from "react-router-dom";
// import { Button } from "../ui/button";
// import {
//   Sheet,
//   SheetTrigger,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
// } from "../ui/sheet";
// import { useSelector } from "react-redux";
// import { shoppingViewHeaderIcon } from "@/config";

// const MenuIcons = () => {
//   return (
//     <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
//       {shoppingViewHeaderIcon.map((menuIcon) => (
//         <Link
//           className="text-sm font-medium"
//           key={menuIcon.id}
//           to={menuIcon.path}
//         >
//           {menuIcon.label}
//         </Link>
//       ))}
//     </nav>
//   );
// };

// const ShoppinHeader = () => {
//   const { isAuthenticated } = useSelector((state) => state.auth);
//   return (
//     <header className="sticky top-0 z-40 w-full border-b bg-background">
//       <div className="flex h-16 items-center justify-between px-4 md:px-6">
//         <Link to="/shop/home" className="flex items-center gap-2">
//           <HousePlug className="h-6 w-6" />
//           <span className="font-bold">E-commerce</span>
//         </Link>

//         <Sheet>
//           <SheetTrigger asChild>
//             <Button variant="outline" size="icon" className="lg:hidden">
//               <Menu className="h-6 w-6" />
//               <span className="sr-only">Toggle header menu</span>
//             </Button>
//           </SheetTrigger>

//           <SheetContent side="right" className="w-full max-w-xs"></SheetContent>
//         </Sheet>

//         <div className="hidden lg:block "></div>
//         {isAuthenticated ? <div></div> : null}
//       </div>
//     </header>
//   );
// };

// export default ShoppinHeader;

import { BaggageClaim, HousePlug, LogOut, Menu, UserRound } from "lucide-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderIcon } from "@/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { logoutUser } from "@/api/auth/logout";

const MenuIcons = () => {
  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
      {shoppingViewHeaderIcon.map((menuIcon) => (
        <Link
          className="text-sm font-medium hover:text-primary"
          key={menuIcon.id}
          to={menuIcon.path}
        >
          {menuIcon.label}
        </Link>
      ))}
    </nav>
  );
};

const HeaderRightContent = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-4">
      <Button variant="outline" size="icon">
        <BaggageClaim className="h-6 w-6" />
        <span className="sr-only">Cart </span>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-black text-white cursor-pointer">
            <AvatarFallback className="bg-black font-extrabold">
              {user.username.charAt(0).toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent side="right" className="w-56">
          <DropdownMenuLabel>
            Login in <span className="font-bold"> {user.username}</span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate("/shop/account")}>
            <UserRound /> Profile
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut /> Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

const ShoppinHeader = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link to="/shop/home" className="flex items-center gap-2">
          <HousePlug className="h-6 w-6" />
          <span className="font-bold">E-commerce</span>
        </Link>

        {/* Mobile Sheet Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle header menu</span>
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="w-full max-w-xs p-4">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <HeaderRightContent />

            <MenuIcons />
          </SheetContent>
        </Sheet>

        {/* Desktop Menu */}
        <div className="hidden lg:flex lg:items-center lg:gap-6">
          <MenuIcons />
        </div>

        {/* Auth Section */}

        <div className="hidden lg:block">
          <HeaderRightContent />
        </div>
      </div>
    </header>
  );
};

export default ShoppinHeader;
