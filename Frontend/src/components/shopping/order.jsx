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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import {
  ShoppingBag,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  ChevronRight,
  Printer,
  FileText,
} from "lucide-react";
import {
  getAllOrdersByUserId,
  getOrderDetails,
} from "@/api/shop/order/create-new-order";
import { resetOrderDetails } from "@/store/shop/order-slice";

const ShoppingOrder = () => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orderList, orderDetails } = useSelector((state) => state.shopOrder);

  useEffect(() => {
    if (user?.id) {
      dispatch(getAllOrdersByUserId(user.id));
    }
  }, [dispatch, user]);

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

  const handleViewDetails = (orderId) => {
    dispatch(getOrderDetails(orderId));
  };

  useEffect(() => {
    if (orderDetails !== null) {
      setIsDetailsOpen(true);
    }
  }, [orderDetails]);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-50">
                <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                  Order ID
                </th>
                <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                  Date
                </th>
                <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                  Status
                </th>
                <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                  Total Amount
                </th>
                <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 text-right">
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
                    <td className="px-8 py-6 font-bold text-slate-900 tracking-tight">
                      {order?._id}
                    </td>
                    <td className="px-8 py-6 text-slate-500 font-medium">
                      {order?.orderDate.split("T")[0]}
                    </td>
                    <td className="px-8 py-6">
                      <Badge
                        variant={getStatusVariant(order?.orderStatus)}
                        className="px-3 py-1 gap-2 border-slate-200 capitalize"
                      >
                        {getStatusIcon(order?.orderStatus)}
                        {order?.orderStatus}
                      </Badge>
                    </td>
                    <td className="px-8 py-6 font-black text-slate-900">
                      ${order?.totalAmount.toFixed(2)}
                    </td>
                    <td className="px-8 py-6 text-right">
                      <Button
                        variant="ghost"
                        onClick={() => handleViewDetails(order?._id)}
                        className="rounded-full hover:bg-slate-900 hover:text-white transition-all group/btn"
                      >
                        Details
                        <ChevronRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
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

      <Dialog
        open={isDetailsOpen}
        onOpenChange={() => {
          setIsDetailsOpen(false);
          dispatch(resetOrderDetails());
        }}
      >
        <DialogContent className="sm:max-w-[600px] border-0 shadow-2xl rounded-3xl overflow-hidden p-0 bg-slate-50">
          {orderDetails && (
            <>
              <div className="bg-slate-900 p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <ShoppingBag size={120} />
                </div>
                <div className="relative z-10 flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-slate-400" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">
                      Order Details
                    </span>
                  </div>
                  <DialogTitle className="text-3xl font-serif tracking-wide sm:max-w-[80%] break-all">
                    {orderDetails?._id}
                  </DialogTitle>
                  <DialogDescription className="text-slate-400 font-light italic">
                    Placed on {orderDetails?.orderDate.split("T")[0]}
                  </DialogDescription>
                </div>
              </div>

              <div className="p-8 space-y-8">
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                      <Truck className="h-3 w-3" /> Delivery Status
                    </h4>
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-10 w-10 rounded-xl flex items-center justify-center ${orderDetails?.orderStatus === "delivered" ? "bg-green-100 text-green-600" : "bg-slate-200 text-slate-500"}`}
                      >
                        {getStatusIcon(orderDetails?.orderStatus)}
                      </div>
                      <span className="font-bold text-slate-900 capitalize">
                        {orderDetails?.orderStatus}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                      <FileText className="h-3 w-3" /> Payment Method
                    </h4>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-slate-200 flex items-center justify-center text-slate-500 font-bold text-xs uppercase">
                        {orderDetails?.paymentMethod}
                      </div>
                      <span className="font-bold text-slate-900 capitalize">
                        {orderDetails?.paymentStatus}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    Items Purchased
                  </h4>
                  <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
                    <div className="divide-y divide-slate-50">
                      {orderDetails?.cartItems?.map((item, idx) => (
                        <div
                          key={idx}
                          className="p-4 flex justify-between items-center group"
                        >
                          <div className="flex flex-col">
                            <span className="font-bold text-slate-900 group-hover:text-slate-700 transition-colors uppercase tracking-tight text-sm">
                              {item.title}
                            </span>
                            <span className="text-xs text-slate-400 font-medium italic">
                              Qty: {item.quantity} × ${item.price.toFixed(2)}
                            </span>
                          </div>
                          <span className="font-black text-slate-900 tabular-nums">
                            ${(item.quantity * item.price).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="bg-slate-900 p-6 flex justify-between items-end">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                          Order total
                        </span>
                        <span className="text-3xl font-black text-white ml-[-2px] tracking-tight">
                          ${orderDetails?.totalAmount.toFixed(2)}
                        </span>
                      </div>
                      <Button
                        variant="outline"
                        className="rounded-full border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white h-9 px-4 text-xs font-bold tracking-widest gap-2"
                      >
                        <Printer className="h-3 w-3" />
                        INVOICE
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ShoppingOrder;
