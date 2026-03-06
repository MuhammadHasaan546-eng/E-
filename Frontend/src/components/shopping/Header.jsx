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

const MenuIcons = ({ setOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();

  function handleNavigate(getCurrentItem) {
    if (setOpen) setOpen(false);
    sessionStorage.removeItem("filter");

    if (
      getCurrentItem.id !== "home" &&
      getCurrentItem.id !== "products" &&
      getCurrentItem.id !== "search"
    ) {
      sessionStorage.setItem(
        "filter",
        JSON.stringify({ categories: [getCurrentItem.id] }),
      );
      navigate(`/shop/listing?categories=${getCurrentItem.id}`);
    } else {
      navigate(getCurrentItem.path);
    }
  }

  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-8 lg:flex-row">
      {shoppingViewHeaderIcon.map((menuIcon) => {
        const isActive =
          location.pathname === menuIcon.path &&
          (menuIcon.id === "home"
            ? !location.search
            : location.search.includes(`categories=${menuIcon.id}`));

        return (
          <div
            key={menuIcon.id}
            onClick={() => handleNavigate(menuIcon)}
            className={`cursor-pointer relative text-sm font-medium transition-all duration-300 hover:text-primary ${
              isActive ? "text-primary font-bold" : "text-muted-foreground"
            } group`}
          >
            {menuIcon.label}
            <span
              className={`absolute -bottom-1.5 left-0 h-[2px] bg-primary transition-all duration-500 rounded-full ${
                isActive ? "w-full" : "w-0 group-hover:w-full"
              }`}
            ></span>
          </div>
        );
      })}
    </nav>
  );
};

const HeaderRightContent = ({ setOpen }) => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openCartSheet, setOpenCartSheet] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser());
    if (setOpen) setOpen(false);
  };
  useEffect(() => {
    dispatch(fetchCartItems(user.id));
  }, [dispatch]);

  const cartItems = useSelector((state) => state.shopCart.cartItems);
  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-5">
      <Sheet open={openCartSheet} onOpenChange={setOpenCartSheet}>
        <Button
          variant="outline"
          size="icon"
          className="relative h-10 w-10 rounded-xl border-primary/10 hover:bg-primary/5 hover:text-primary transition-all duration-300 hover:shadow-lg active:scale-95"
          onClick={() => setOpenCartSheet(true)}
        >
          <BaggageClaim className="h-[1.1rem] w-[1.1rem]" />
          {cartItems?.items?.length > 0 && (
            <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground ring-4 ring-background shadow-sm animate-in zoom-in duration-500">
              {cartItems?.items?.length}
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
          <Avatar className="h-10 w-10 cursor-pointer ring-offset-2 ring-2 ring-transparent transition-all duration-500 hover:ring-primary hover:shadow-xl hover:scale-110 active:scale-95">
            <AvatarFallback className="bg-linear-to-br from-primary via-primary/80 to-primary/60 text-primary-foreground font-black shadow-inner tracking-tighter">
              {user?.username?.charAt(0).toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          side="bottom"
          align="end"
          className="w-64 mt-3 rounded-2xl shadow-2xl border-primary/5 backdrop-blur-xl bg-background/95 p-2 animate-in slide-in-from-top-2 duration-300"
        >
          <DropdownMenuLabel className="font-normal px-4 py-3">
            <div className="flex flex-col space-y-1">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Account
              </p>
              <p className="text-sm font-bold truncate text-primary whitespace-nowrap">
                {user.username}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-primary/5 mx-2" />
          <div className="p-1">
            <DropdownMenuItem
              onClick={() => {
                navigate("/shop/account");
                if (setOpen) setOpen(false);
              }}
              className="cursor-pointer gap-3 rounded-xl px-3 py-2.5 transition-all duration-200 hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary group"
            >
              <UserRound className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
              <span className="font-medium">Profile Details</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleLogout}
              className="mt-1 cursor-pointer gap-3 rounded-xl px-3 py-2.5 text-destructive transition-all duration-200 hover:bg-destructive/10 hover:text-destructive focus:bg-destructive/10 focus:text-destructive group"
            >
              <LogOut className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
              <span className="font-medium">Sign Out</span>
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

const ShoppinHeader = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/5 bg-background/60 backdrop-blur-2xl transition-all duration-500">
      <div className="flex h-20 items-center justify-between px-6 md:px-10 max-w-screen-2xl mx-auto relative">
        <Link
          to="/shop/home"
          className="flex items-center gap-3 group transition-all duration-500"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/20 text-primary-foreground transition-all duration-500 group-hover:rotate-15 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-primary/30">
            <HousePlug className="h-6 w-6" />
          </div>
          <div className="flex flex-col -space-y-1">
            <span className="font-black text-2xl tracking-tighter bg-linear-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              KOKHAN
            </span>
            <span className="text-[10px] uppercase tracking-widest font-black text-muted-foreground/60 pl-0.5">
              E-Store
            </span>
          </div>
        </Link>

        <Sheet open={openMenu} onOpenChange={setOpenMenu}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden h-10 w-10 rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-300"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle header menu</span>
            </Button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="w-full max-w-xs p-8 shadow-2xl sm:max-w-sm rounded-l-[2rem] border-primary/5 backdrop-blur-xl bg-background/95"
            aria-describedby={undefined}
            onCloseAutoFocus={(e) => e.preventDefault()}
          >
            <SheetHeader className="mb-12">
              <SheetTitle className="text-left flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20 text-primary-foreground">
                  <HousePlug className="h-5 w-5" />
                </div>
                <div className="flex flex-col -space-y-1">
                  <span className="font-black text-xl tracking-tighter">
                    KOKHAN
                  </span>
                  <span className="text-[8px] uppercase tracking-[0.2em] font-black text-muted-foreground/60">
                    Navigation
                  </span>
                </div>
              </SheetTitle>
            </SheetHeader>

            <div className="flex flex-col space-y-8">
              <MenuIcons setOpen={setOpenMenu} />
              <div className="h-px w-full bg-linear-to-r from-transparent via-primary/10 to-transparent" />
              <HeaderRightContent setOpen={setOpenMenu} />
            </div>
          </SheetContent>
        </Sheet>

        <div className="hidden lg:flex lg:items-center lg:gap-10 lg:absolute lg:left-1/2 lg:-translate-x-1/2">
          <MenuIcons />
        </div>

        <div className="hidden lg:block">
          <HeaderRightContent />
        </div>
      </div>
    </header>
  );
};

export default ShoppinHeader;
