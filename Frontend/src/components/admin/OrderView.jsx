import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "../ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  ShoppingBag,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  ChevronRight,
  MoreVertical,
  User,
  MapPin,
  CreditCard,
  Download,
  Filter,
} from "lucide-react";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  resetOrderDetails,
  updateOrderStatus as updateStatusAction,
} from "../../store/admin/order-slice";
import { toast } from "sonner";

const AdminOrdersView = () => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const dispatch = useDispatch();
  const { orderList, orderDetails } = useSelector((state) => state.adminOrder);

  useEffect(() => {
    dispatch(getAllOrdersForAdmin());
  }, [dispatch]);

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return <CheckCircle2 className="h-4 w-4" />;
      case "shipped":
        return <Truck className="h-4 w-4" />;
      case "processing":
      case "pending":
        return <Clock className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  const getStatusVariant = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return "default";
      case "processing":
      case "pending":
        return "secondary";
      case "shipped":
        return "outline";
      default:
        return "outline";
    }
  };

  const handleOpenDetails = (orderId) => {
    dispatch(getOrderDetailsForAdmin(orderId));
  };

  const handleUpdateStatus = (id, orderStatus) => {
    dispatch(updateStatusAction({ id, orderStatus })).then((data) => {
      if (data?.payload?.success) {
        toast.success("Order status updated successfully", {
          position: "bottom-center",
        });
        dispatch(getAllOrdersForAdmin());
        dispatch(getOrderDetailsForAdmin(id));
      } else {
        toast.error("Failed to update order status");
      }
    });
  };

  useEffect(() => {
    if (orderDetails !== null) {
      setIsDetailsOpen(true);
    }
  }, [orderDetails]);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
        <div>
          <h1 className="text-3xl font-serif text-slate-900 tracking-tight">
            Order Management
          </h1>
          <p className="text-slate-500 text-sm mt-1 font-light italic">
            Oversee every luxury transaction across your platform.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="rounded-full border-slate-200 h-11 px-6 text-xs font-bold tracking-widest text-slate-600 hover:bg-slate-50 transition-all gap-2"
          >
            <Filter className="h-4 w-4" />
            FILTER
          </Button>
          <Button className="bg-slate-900 text-white rounded-full h-11 px-6 text-xs font-bold tracking-widest hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20 gap-2">
            <Download className="h-4 w-4" />
            EXPORT DATA
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-900">
                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                  Order ID
                </th>
                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                  Date
                </th>
                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                  Status
                </th>
                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                  Amount
                </th>
                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 text-right">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {orderList && orderList.length > 0 ? (
                orderList.map((order) => (
                  <tr
                    key={order?._id}
                    className="group hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="px-8 py-6">
                      <span
                        className="font-bold text-slate-900 tracking-tight group-hover:underline cursor-pointer"
                        onClick={() => handleOpenDetails(order?._id)}
                      >
                        {order?._id}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-slate-500 font-medium">
                      {order?.orderDate.split("T")[0]}
                    </td>
                    <td className="px-8 py-6">
                      <Badge
                        variant={getStatusVariant(order?.orderStatus)}
                        className="px-3 py-1 gap-2 border-slate-200 bg-white text-slate-900 hover:bg-slate-900 hover:text-white transition-all capitalize"
                      >
                        {getStatusIcon(order?.orderStatus)}
                        {order?.orderStatus}
                      </Badge>
                    </td>
                    <td className="px-8 py-6 font-black text-slate-900">
                      ${order?.totalAmount.toFixed(2)}
                    </td>
                    <td className="px-8 py-6 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full hover:bg-slate-100"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="rounded-2xl border-slate-100 shadow-xl p-2 min-w-[160px]"
                        >
                          <DropdownMenuLabel className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-3 py-2">
                            Order Actions
                          </DropdownMenuLabel>
                          <DropdownMenuSeparator className="bg-slate-50" />
                          <DropdownMenuItem
                            onClick={() => handleOpenDetails(order?._id)}
                            className="rounded-xl px-3 py-2 cursor-pointer focus:bg-slate-50 gap-2"
                          >
                            <ChevronRight className="h-4 w-4" /> View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleUpdateStatus(order?._id, "shipped")
                            }
                            className="rounded-xl px-3 py-2 cursor-pointer focus:bg-slate-50 gap-2 text-blue-600"
                          >
                            <Truck className="h-4 w-4" /> Mark as Shipped
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleUpdateStatus(order?._id, "delivered")
                            }
                            className="rounded-xl px-3 py-2 cursor-pointer focus:bg-slate-50 gap-2 text-green-600"
                          >
                            <CheckCircle2 className="h-4 w-4" /> Mark as
                            Delivered
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-8 py-12 text-center text-slate-400"
                  >
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Sheet
        open={isDetailsOpen}
        onOpenChange={() => {
          setIsDetailsOpen(false);
          dispatch(resetOrderDetails());
        }}
      >
        <SheetContent
          side="right"
          className="w-full sm:max-w-xl border-0 shadow-2xl p-0 bg-slate-50 overflow-y-auto custom-scrollbar"
        >
          {orderDetails && (
            <div className="flex flex-col min-h-full">
              <div className="bg-slate-900 p-10 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 p-10 opacity-10">
                  <ShoppingBag size={180} />
                </div>
                <div className="relative z-10 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                      <CheckCircle2 className="h-4 w-4 text-slate-400" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-400">
                      Order Management
                    </span>
                  </div>
                  <SheetTitle className="text-4xl font-serif tracking-wide text-white break-all">
                    {orderDetails?._id}
                  </SheetTitle>
                  <SheetDescription className="text-slate-400 font-light text-base">
                    Comprehensive breakdown for order processing
                  </SheetDescription>
                </div>
              </div>

              <div className="p-10 space-y-10 flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-6">
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                      <User className="h-3.5 w-3.5" /> CUSTOMER INFO
                    </h4>
                    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-1">
                      <p className="font-bold text-slate-900 text-lg capitalize">
                        {orderDetails?.addressInfo?.pincode}
                      </p>
                      <p className="text-slate-500 font-medium text-sm italic">
                        Contact: {orderDetails?.addressInfo?.phone}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5" /> SHIPPING ADDRESS
                    </h4>
                    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                      <p className="text-slate-700 leading-relaxed font-medium">
                        {orderDetails?.addressInfo?.address},{" "}
                        {orderDetails?.addressInfo?.city}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                    <Package className="h-3.5 w-3.5" /> ORDER BREAKDOWN
                  </h4>
                  <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
                    <div className="divide-y divide-slate-50">
                      {orderDetails?.cartItems?.map((item, idx) => (
                        <div
                          key={idx}
                          className="p-6 flex justify-between items-center group transition-colors hover:bg-slate-50/50"
                        >
                          <div className="flex flex-col">
                            <span className="font-bold text-slate-900 uppercase tracking-tight text-sm">
                              {item.title}
                            </span>
                            <span className="text-xs text-slate-500 mt-1 font-medium italic">
                              Qty: {item.quantity} × ${item.price?.toFixed(2)}
                            </span>
                          </div>
                          <span className="font-black text-slate-900 text-lg tabular-nums">
                            ${(item.quantity * item.price).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="bg-slate-900 p-8 flex justify-between items-end">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500">
                          Order Revenue
                        </span>
                        <span className="text-4xl font-black text-white ml-[-2px] tracking-tight tabular-nums">
                          ${orderDetails?.totalAmount.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex flex-col items-end gap-3">
                        <Badge
                          variant="outline"
                          className="bg-slate-800 border-slate-700 text-white gap-2 px-3 py-1.5 h-auto rounded-xl uppercase"
                        >
                          <CreditCard className="h-3.5 w-3.5 text-slate-400" />
                          {orderDetails?.paymentMethod}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                    UPDATE STATUS
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      onClick={() =>
                        handleUpdateStatus(orderDetails?._id, "processing")
                      }
                      className="rounded-2xl h-14 bg-white text-slate-900 border-2 border-slate-100 hover:border-slate-900 transition-all font-bold tracking-widest text-[10px] uppercase shadow-sm"
                      disabled={orderDetails?.orderStatus === "processing"}
                    >
                      PROCESSING
                    </Button>
                    <Button
                      onClick={() =>
                        handleUpdateStatus(orderDetails?._id, "shipped")
                      }
                      className="rounded-2xl h-14 bg-white text-slate-900 border-2 border-slate-100 hover:border-slate-900 transition-all font-bold tracking-widest text-[10px] uppercase shadow-sm"
                      disabled={orderDetails?.orderStatus === "shipped"}
                    >
                      SHIPPED
                    </Button>
                    <Button
                      onClick={() =>
                        handleUpdateStatus(orderDetails?._id, "delivered")
                      }
                      className="rounded-2xl h-14 bg-white text-slate-900 border-2 border-slate-100 hover:border-slate-900 transition-all font-bold tracking-widest text-[10px] uppercase md:col-span-2 shadow-sm"
                      disabled={orderDetails?.orderStatus === "delivered"}
                    >
                      DELIVERED
                    </Button>
                  </div>
                </div>
              </div>

              <SheetFooter className="p-10 bg-white border-t border-slate-100">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsDetailsOpen(false);
                    dispatch(resetOrderDetails());
                  }}
                  className="rounded-2xl h-14 flex-1 font-bold tracking-widest text-xs uppercase"
                >
                  CLOSE VIEW
                </Button>
              </SheetFooter>
            </div>
          )}
        </SheetContent>
      </Sheet>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}</style>
    </div>
  );
};

export default AdminOrdersView;
