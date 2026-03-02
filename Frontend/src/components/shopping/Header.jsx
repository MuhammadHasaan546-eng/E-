import { BaggageClaim, HousePlug, LogOut, Menu, UserRound } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
import UserCartWarp from "./cart-wrap";
import { fetchCartItems } from "@/api/shop/cart";

const MenuIcons = () => {
  const location = useLocation();

  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
      {shoppingViewHeaderIcon.map((menuIcon) => {
        const isActive = location.pathname === menuIcon.path;
        return (
          <Link
            key={menuIcon.id}
            to={menuIcon.path}
            className={`relative text-sm font-semibold transition-all duration-300 hover:text-primary ${
              isActive ? "text-primary" : "text-muted-foreground"
            } group`}
          >
            {menuIcon.label}
            <span
              className={`absolute -bottom-1.5 left-0 h-[2px] bg-primary transition-all duration-300 ${
                isActive ? "w-full" : "w-0 group-hover:w-full"
              }`}
            ></span>
          </Link>
        );
      })}
    </nav>
  );
};

const HeaderRightContent = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openCartSheet, setOpenCartSheet] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser());
  };
  useEffect(() => {
    dispatch(fetchCartItems(user.id));
  }, [dispatch]);

  const cartItems = useSelector((state) => state.shopCart.cartItems);
  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-4">
      <Sheet open={openCartSheet} onOpenChange={setOpenCartSheet}>
        <Button
          variant="outline"
          size="icon"
          className="relative hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
          onClick={() => setOpenCartSheet(true)}
        >
          <BaggageClaim className="h-5 w-5" />
          {cartItems?.items?.length > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground ring-2 ring-background animate-in zoom-in duration-300">
              {cartItems.items.length}
            </span>
          )}
          <span className="sr-only">Cart</span>
        </Button>
        <UserCartWarp
          setOpenCartSheet={setOpenCartSheet}
          cartItems={
            cartItems && cartItems.items && cartItems.items.length > 0
              ? cartItems.items
              : []
          }
        />
      </Sheet>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer ring-2 ring-transparent transition-all duration-300 hover:ring-primary hover:shadow-lg">
            <AvatarFallback className="bg-linear-to-br from-primary to-primary/60 text-primary-foreground font-extrabold shadow-inner">
              {user?.username?.charAt(0).toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          side="right"
          className="w-56 mt-2 rounded-xl shadow-xl shadow-primary/5 border-primary/10"
        >
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">Logged in as</p>
              <p className="text-xs leading-none text-muted-foreground font-bold truncate">
                {user?.username}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => navigate("/shop/account")}
            className="cursor-pointer gap-2 transition-colors hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary"
          >
            <UserRound className="h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleLogout}
            className="cursor-pointer gap-2 text-destructive transition-colors hover:bg-destructive/10 hover:text-destructive focus:bg-destructive/10 focus:text-destructive"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

const ShoppinHeader = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl shadow-sm transition-all duration-300">
      <div className="flex h-16 items-center justify-between px-4 md:px-6 max-w-7xl mx-auto relative">
        {/* Logo */}
        <Link
          to="/shop/home"
          className="flex items-center gap-2 group transition-transform duration-300 hover:scale-[1.02]"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
            <HousePlug className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
          </div>
          <span className="font-extrabold text-xl tracking-tight bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            E-commerce
          </span>
        </Link>

        {/* Mobile Sheet Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden hover:bg-primary/10 hover:text-primary transition-colors"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle header menu</span>
            </Button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="w-full max-w-xs p-6 shadow-2xl sm:max-w-sm"
          >
            <SheetHeader className="mb-8">
              <SheetTitle className="text-left flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <HousePlug className="h-4 w-4" />
                </div>
                <span className="font-bold text-lg">Menu</span>
              </SheetTitle>
            </SheetHeader>

            <div className="flex flex-col space-y-6">
              <MenuIcons />
              <div className="h-px w-full bg-border/50 rounded-full" />
              <HeaderRightContent />
            </div>
          </SheetContent>
        </Sheet>

        {/* Desktop Menu */}
        <div className="hidden lg:flex lg:items-center lg:gap-8 lg:absolute lg:left-1/2 lg:-translate-x-1/2">
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
