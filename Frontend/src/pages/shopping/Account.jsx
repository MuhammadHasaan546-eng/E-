import React, { useState } from "react";
import accountBanner from "../../assets/luxury_banner_2_png_1772470392721.png";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Separator } from "../../components/ui/separator";
import {
  ShoppingBag,
  MapPin,
  User,
  LogOut,
  ChevronRight,
  Menu,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/auth-slice";
import { updateProfile } from "../../api/auth/update-profile";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../../components/ui/sheet";
import axios from "axios";
import ShoppingAddress from "../../components/shopping/address";

const ShoppingAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [isUpdating, setIsUpdating] = useState(false);
  const [profileData, setProfileData] = useState({
    username: user?.username || "",
    avatar: user?.avatar || "",
  });
  const [avatarFile, setAvatarFile] = useState(null);

  const handleLogout = () => {
    dispatch(logoutUser()).then((res) => {
      if (res?.payload?.success) {
        toast.success("Logged out successfully");
        navigate("/shop/home");
      }
    });
  };

  const handleImageUploadChange = async (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData({ ...profileData, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = async () => {
    setIsUpdating(true);
    try {
      let finalAvatarUrl = profileData.avatar;

      if (avatarFile) {
        const formData = new FormData();
        formData.append("my_file", avatarFile);
        const uploadRes = await axios.post(
          "http://localhost:3000/api/admin/products/upload-image",
          formData,
        );

        if (uploadRes?.data?.success) {
          finalAvatarUrl = uploadRes.data.result.url;
        } else {
          toast.error("Failed to upload image");
          setIsUpdating(false);
          return;
        }
      }

      dispatch(
        updateProfile({
          userId: user?.id,
          formData: { username: profileData.username, avatar: finalAvatarUrl },
        }),
      ).then((res) => {
        if (res?.payload?.success) {
          toast.success("Profile updated successfully");
          setAvatarFile(null);
        } else {
          toast.error("Failed to update profile");
        }
      });
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setIsUpdating(false);
    }
  };
  const [activeTab, setActiveTab] = useState("orders");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const TABS = [
    { id: "orders", label: "My Orders", icon: ShoppingBag },
    { id: "address", label: "Addresses", icon: MapPin },
    { id: "profile", label: "Profile", icon: User },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "orders":
        return (
          <Card className="border-0 shadow-lg shadow-black/5 bg-white/70 backdrop-blur-sm">
            <CardHeader className="border-b border-slate-100 pb-6 mb-6">
              <CardTitle className="text-2xl font-serif text-slate-800">
                Order History
              </CardTitle>
              <CardDescription className="text-slate-500">
                View and manage your recent purchases.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-16 text-center text-slate-500">
                <div className="h-24 w-24 bg-slate-50 rounded-full flex items-center justify-center mb-6 shadow-inner border border-slate-100">
                  <ShoppingBag size={40} className="text-slate-300" />
                </div>
                <h3 className="text-xl font-medium text-slate-700 tracking-wide mb-2">
                  No orders yet
                </h3>
                <p className="max-w-md text-slate-500 font-light leading-relaxed">
                  When you place an order, it will appear here so you can track
                  its status and review your premium purchases.
                </p>
                <Button className="mt-8 bg-slate-900 text-white hover:bg-slate-800 rounded-full px-10 py-6 transition-transform hover:scale-105 active:scale-95 duration-300 shadow-xl shadow-slate-900/20 tracking-wider">
                  Start Shopping
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      case "address":
        return (
          <Card className="border-0 shadow-lg shadow-black/5 bg-white/70 backdrop-blur-sm">
            <ShoppingAddress />
          </Card>
        );
      case "profile":
        return (
          <Card className="border-0 shadow-lg shadow-black/5 bg-white/70 backdrop-blur-sm">
            <CardHeader className="border-b border-slate-100 pb-6 mb-6">
              <CardTitle className="text-2xl font-serif text-slate-800">
                Account Details
              </CardTitle>
              <CardDescription className="text-slate-500">
                Update your personal information.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8 max-w-2xl">
                <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 pb-4">
                  <div className="h-28 w-28 rounded-full bg-gradient-to-tr from-slate-100 to-slate-200 flex items-center justify-center text-slate-500 text-4xl font-serif shadow-inner border-4 border-white shrink-0 relative group cursor-pointer">
                    {profileData.avatar ? (
                      <img
                        src={profileData.avatar}
                        alt="Avatar"
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : user?.username ? (
                      user.username.substring(0, 2).toUpperCase()
                    ) : (
                      "JD"
                    )}
                    <label
                      htmlFor="avatar-upload"
                      className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                    >
                      <span className="text-white text-xs font-medium tracking-wider">
                        EDIT
                      </span>
                    </label>
                    <input
                      type="file"
                      id="avatar-upload"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUploadChange}
                    />
                  </div>
                  <div className="text-center sm:text-left">
                    <h3 className="text-2xl font-serif text-slate-800 mb-1">
                      {user?.username || "Guest User"}
                    </h3>
                    <p className="text-slate-500 font-light mb-4 text-sm sm:text-base">
                      Premium Member since 2026
                    </p>
                    <Button
                      variant="outline"
                      className="rounded-full text-xs font-bold tracking-widest px-6 h-9 border-slate-200 hover:bg-slate-50"
                      onClick={() =>
                        document.getElementById("avatar-upload").click()
                      }
                    >
                      CHANGE PHOTO
                    </Button>
                  </div>
                </div>

                <Separator className="bg-slate-100" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold tracking-widest text-slate-500 uppercase">
                      Username
                    </label>
                    <input
                      type="text"
                      value={profileData.username}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          username: e.target.value,
                        })
                      }
                      className="w-full border-b-2 border-slate-200 bg-transparent px-0 py-2 text-slate-800 focus:ring-0 focus:border-slate-900 outline-none transition-colors rounded-none placeholder:text-slate-300 font-medium"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-bold tracking-widest text-slate-500 uppercase">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={user?.email || ""}
                      readOnly
                      disabled
                      className="w-full border-b-2 border-slate-100 bg-transparent px-0 py-2 text-slate-400 outline-none cursor-not-allowed font-medium"
                    />
                    <p className="text-[11px] text-slate-400 mt-2 font-medium tracking-wide">
                      To change your email, please{" "}
                      <span className="text-slate-700 underline cursor-pointer">
                        contact support
                      </span>
                      .
                    </p>
                  </div>
                </div>

                <div className="pt-6">
                  <Button
                    onClick={handleSaveProfile}
                    disabled={isUpdating}
                    className="w-full sm:w-auto bg-slate-900 text-white hover:bg-slate-800 rounded-lg px-10 py-6 shadow-lg shadow-slate-900/20 tracking-widest text-xs font-bold"
                  >
                    {isUpdating ? "SAVING..." : "SAVE CHANGES"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-24 font-sans selection:bg-slate-900 selection:text-white">
      <div className="relative w-full h-[350px] md:h-[450px] overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 z-10" />
        <img
          src={accountBanner}
          alt="My Account Luxury Banner"
          className="object-cover w-full h-full object-center transform transition-transform duration-[20s] group-hover:scale-105"
        />
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white px-4 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <span className="text-xs md:text-sm font-bold tracking-[0.3em] uppercase mb-4 text-white/80">
            Personal Space
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif tracking-wide text-center drop-shadow-2xl mb-6 font-light">
            My Account
          </h1>
          <div className="w-24 h-[1px] bg-white/50 mb-6"></div>
          <p className="text-base md:text-lg font-light tracking-wide opacity-90 text-center max-w-xl text-white/90">
            Curate your profile, track your premium orders, and manage your
            delivery addresses in one elegant space.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 -mt-20 z-30 relative max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-10">
          <div className="col-span-1">
            <Card className="border-0 shadow-2xl shadow-black/5 bg-white backdrop-blur-xl rounded-2xl overflow-hidden lg:sticky lg:top-24 z-10">
              <div className="p-8 bg-slate-900 text-white flex flex-col items-center justify-center text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 background-pattern-dots mix-blend-overlay"></div>

                <div className="h-20 w-20 rounded-full bg-slate-800 flex items-center justify-center text-2xl font-serif shrink-0 border border-slate-700 shadow-xl mb-4 relative z-10">
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt="Avatar"
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : user?.username ? (
                    user.username.substring(0, 2).toUpperCase()
                  ) : (
                    "JD"
                  )}
                </div>
                <div className="relative z-10">
                  <h2 className="font-serif text-xl tracking-wide">
                    Hello, {user?.username}
                  </h2>
                  <p className="text-slate-400 text-sm font-medium tracking-wider uppercase mt-1">
                    Premium Member
                  </p>
                </div>
              </div>

              <div className="lg:hidden p-4 border-b border-slate-100 w-full flex justify-between items-center bg-white">
                <span className="font-serif font-medium text-slate-800 flex items-center gap-2">
                  {TABS.find((t) => t.id === activeTab)?.icon &&
                    React.createElement(
                      TABS.find((t) => t.id === activeTab).icon,
                      { size: 18 },
                    )}
                  {TABS.find((t) => t.id === activeTab)?.label}
                </span>
                <Sheet
                  open={isMobileMenuOpen}
                  onOpenChange={setIsMobileMenuOpen}
                >
                  <SheetTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="shrink-0 text-slate-600"
                    >
                      <Menu className="h-6 w-6" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent
                    side="left"
                    className="w-64 sm:w-80 pt-10 flex flex-col"
                  >
                    <nav className="flex flex-col gap-2 mt-8">
                      {TABS.map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => {
                            setActiveTab(tab.id);
                            setIsMobileMenuOpen(false);
                          }}
                          className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-colors ${activeTab === tab.id ? "bg-slate-900 text-white" : "hover:bg-slate-100 text-slate-700"}`}
                        >
                          <tab.icon size={20} />
                          <span className="font-medium">{tab.label}</span>
                        </button>
                      ))}
                    </nav>
                    <div className="mt-auto pb-8">
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full flex items-center justify-center space-x-2 bg-red-50 hover:bg-red-500 hover:text-white text-red-600 rounded-xl px-4 py-3.5 transition-all duration-300"
                      >
                        <LogOut size={18} />
                        <span className="text-sm font-bold tracking-widest uppercase">
                          Logout
                        </span>
                      </button>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>

              <div className="hidden lg:flex flex-col py-2 border-b border-slate-100 lg:border-none">
                {TABS.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex-shrink-0 lg:flex-shrink flex items-center justify-between px-6 lg:px-8 py-5 transition-all duration-300 relative group min-w-[160px] lg:min-w-0 ${
                      activeTab === tab.id
                        ? "text-slate-900 bg-slate-50/50"
                        : "text-slate-500 hover:text-slate-900 hover:bg-slate-50/50"
                    }`}
                  >
                    <div
                      className={`absolute bottom-0 left-6 right-6 h-0.5 lg:h-full lg:w-1 lg:left-0 lg:right-auto lg:top-0 lg:bottom-0 bg-slate-900 transition-all duration-300 ${activeTab === tab.id ? "opacity-100 scale-100" : "opacity-0 scale-y-0 lg:scale-y-0"}`}
                    ></div>

                    <div className="flex items-center gap-4">
                      <tab.icon
                        size={22}
                        className={`transition-colors duration-300 ${activeTab === tab.id ? "text-slate-900" : "text-slate-400 group-hover:text-slate-600"}`}
                        strokeWidth={activeTab === tab.id ? 2 : 1.5}
                      />
                      <span
                        className={`font-medium tracking-wide text-sm ${activeTab === tab.id ? "font-semibold" : ""}`}
                      >
                        {tab.label}
                      </span>
                    </div>
                    <ChevronRight
                      size={18}
                      className={`hidden lg:block transition-all duration-300 ${activeTab === tab.id ? "translate-x-1 text-slate-900 opacity-100" : "opacity-0 -translate-x-2 text-slate-400"}`}
                    />
                  </button>
                ))}
              </div>

              <div className="p-4 hidden lg:block">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center space-x-2 bg-red-50 hover:bg-red-500 hover:text-white text-red-600 rounded-xl px-4 py-3.5 transition-all duration-300 group"
                >
                  <LogOut
                    size={18}
                    className="group-hover:-translate-x-1 transition-transform"
                  />
                  <span className="text-sm font-bold tracking-widest uppercase">
                    Logout
                  </span>
                </button>
              </div>
            </Card>
          </div>

          <div className="col-span-1 lg:col-span-3">
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150 fill-mode-both">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingAccount;
