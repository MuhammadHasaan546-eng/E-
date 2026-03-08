import React from "react";
import { useDispatch } from "react-redux";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "../ui/sheet";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  ShoppingBag,
  Package,
  CheckCircle2,
  User,
  MapPin,
  CreditCard,
  Calendar,
  Wallet,
  Truck,
  Clock,
} from "lucide-react";
import {
  updateOrderStatus,
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
} from "@/api/admin/order/order";
import { resetOrderDetails } from "@/store/shop/order-slice";
import { toast } from "sonner";

const AdminOrderDetailsSheet = ({
  isDetailsOpen,
  setIsDetailsOpen,
  orderDetails,
}) => {
  const dispatch = useDispatch();

  const handleUpdateStatus = (id, orderStatus) => {
    dispatch(updateOrderStatus({ id, orderStatus })).then((data) => {
      if (data.payload.success) {
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

  return (
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
            {/* Header Section */}
            <div className="bg-slate-900 p-6 sm:p-10 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 sm:p-10 opacity-10">
                <ShoppingBag className="h-[120px] w-[120px] sm:h-[180px] sm:w-[180px]" />
              </div>
              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                      <ShoppingBag className="h-4 w-4 text-slate-400" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-400">
                      Order Overview
                    </span>
                  </div>
                  <Badge
                    variant="outline"
                    className="bg-slate-800/50 border-slate-700 text-white gap-2 px-3 py-1 text-xs uppercase"
                  >
                    {orderDetails.orderStatus === "delivered" ? (
                      <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                    ) : orderDetails.orderStatus === "shipped" ? (
                      <Truck className="h-3 w-3 text-blue-400" />
                    ) : (
                      <Clock className="h-3 w-3 text-amber-400" />
                    )}
                    {orderDetails.orderStatus}
                  </Badge>
                </div>
                <SheetTitle className="text-2xl sm:text-4xl font-serif tracking-wide text-white break-all">
                  #{orderDetails._id.slice(-8)}
                </SheetTitle>
                <div className="flex flex-wrap items-center gap-4 text-slate-400 text-xs font-medium">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    {orderDetails.orderDate.split("T")[0]}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CreditCard className="h-3.5 w-3.5" />
                    {orderDetails.paymentMethod}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Wallet className="h-3.5 w-3.5" />
                    {orderDetails.paymentStatus || "Paid"}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-10 space-y-8 sm:space-y-10 flex-1">
              {/* Customer & Shipping Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                    <User className="h-3.5 w-3.5" /> CUSTOMER INFO
                  </h4>
                  <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-2 h-full">
                    <p className="font-bold text-slate-900 text-lg capitalize">
                      {orderDetails.addressInfo.pincode || "Guest User"}
                    </p>
                    <p className="text-slate-500 font-medium text-sm">
                      Phone:{" "}
                      <span className="text-slate-900">
                        {orderDetails.addressInfo.phone}
                      </span>
                    </p>
                    {orderDetails.addressInfo.notes && (
                      <p className="text-slate-500 font-medium text-sm mt-2 border-t border-slate-50 pt-2">
                        Note: {orderDetails.addressInfo.notes}
                      </p>
                    )}
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5" /> SHIPPING ADDRESS
                  </h4>
                  <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm h-full flex flex-col justify-center">
                    <p className="text-slate-700 leading-relaxed font-medium">
                      {orderDetails.addressInfo.address}
                    </p>
                    <p className="text-slate-900 font-bold mt-1">
                      {orderDetails.addressInfo?.city}
                    </p>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="space-y-4">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                  <Package className="h-3.5 w-3.5" /> ORDER ITEMS (
                  {orderDetails.cartItems?.length})
                </h4>
                <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
                  <div className="divide-y divide-slate-50">
                    {orderDetails.cartItems?.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-4 sm:p-6 flex items-center gap-4 group transition-colors hover:bg-slate-50/50"
                      >
                        {/* Item Image Placeholder */}
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-100 rounded-2xl flex items-center justify-center shrink-0 overflow-hidden">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Package className="h-6 w-6 text-slate-300" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h5 className="font-bold text-slate-900 text-sm sm:text-base truncate">
                            {item.title}
                          </h5>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                            <span className="text-xs text-slate-500 font-medium">
                              Qty:{" "}
                              <span className="text-slate-900 font-bold">
                                {item.quantity}
                              </span>
                            </span>
                            <span className="text-xs text-slate-500 font-medium">
                              Price:{" "}
                              <span className="text-slate-900 font-bold">
                                ${item.price.toFixed(2)}
                              </span>
                            </span>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="font-black text-slate-900 text-base sm:text-lg tabular-nums">
                            ${(item.quantity * item.price).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Summary Footer */}
                  <div className="bg-slate-50 p-6 sm:p-8 border-t border-slate-100">
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between text-sm text-slate-500 font-medium">
                        <span>Subtotal</span>
                        <span>${orderDetails.totalAmount.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm text-slate-500 font-medium">
                        <span>Shipping</span>
                        <span className="text-emerald-500 font-bold">Free</span>
                      </div>
                    </div>
                    <div className="flex items-end justify-between border-t border-slate-200 pt-6">
                      <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                        Total Amount
                      </span>
                      <span className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight tabular-nums">
                        ${orderDetails.totalAmount.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Update Actions */}
              <div className="space-y-4">
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                  Update Order Status
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Button
                    onClick={() =>
                      handleUpdateStatus(orderDetails._id, "processing")
                    }
                    disabled={orderDetails.orderStatus === "processing"}
                    className="rounded-[1.2rem] h-14 bg-white text-slate-900 border-2 border-slate-100 
                 hover:border-amber-400 hover:bg-amber-50/50 hover:text-amber-700 
                 transition-all duration-300 font-black tracking-widest text-[10px] uppercase shadow-sm
                 disabled:opacity-40 disabled:grayscale"
                  >
                    Processing
                  </Button>

                  <Button
                    onClick={() =>
                      handleUpdateStatus(orderDetails._id, "shipped")
                    }
                    disabled={orderDetails.orderStatus === "shipped"}
                    className="rounded-[1.2rem] h-14 bg-white text-slate-900 border-2 border-slate-100 
                 hover:border-blue-400 hover:bg-blue-50/50 hover:text-blue-700 
                 transition-all duration-300 font-black tracking-widest text-[10px] uppercase shadow-sm
                 disabled:opacity-40 disabled:grayscale"
                  >
                    Shipped
                  </Button>

                  <Button
                    onClick={() =>
                      handleUpdateStatus(orderDetails._id, "delivered")
                    }
                    disabled={orderDetails.orderStatus === "delivered"}
                    className="rounded-[1.2rem] h-14 bg-slate-900 text-white border-0
                 hover:bg-emerald-600 hover:scale-[1.02] active:scale-95
                 transition-all duration-300 font-black tracking-widest text-[10px] uppercase 
                 shadow-lg shadow-emerald-500/10 disabled:bg-slate-100 disabled:text-slate-400"
                  >
                    Delivered
                  </Button>
                </div>
              </div>
            </div>

            <SheetFooter className="p-6 sm:p-10 bg-white border-t border-slate-100 mt-auto shrink-0">
              <Button
                variant="outline"
                onClick={() => {
                  setIsDetailsOpen(false);
                  dispatch(resetOrderDetails());
                }}
                className="rounded-2xl h-14 w-full font-bold tracking-widest text-xs uppercase hover:bg-slate-50"
              >
                CLOSE DETAILS
              </Button>
            </SheetFooter>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default AdminOrderDetailsSheet;
