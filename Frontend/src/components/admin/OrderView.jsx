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
// import {
//   getAllOrdersForAdmin,
//   getOrderDetailsForAdmin,
//   resetOrderDetails,
//   updateOrderStatus as updateStatusAction,
// } from "../../store/admin/order-slice";
import { toast } from "sonner";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  updateOrderStatus,
} from "@/api/admin/order/order";
import { resetOrderDetails } from "@/store/shop/order-slice";
import AdminOrderDetailsSheet from "./OrderDetailsSheet";

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
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case "shipped":
        return <Truck className="h-4 w-4 text-blue-500" />;
      case "processing":
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return <Package className="h-4 w-4 text-red-500" />;
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
    dispatch(updateOrderStatus({ id, orderStatus })).then((data) => {
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
        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto">
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
                    key={order._id}
                    className="group hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="px-8 py-6">
                      <span
                        className="font-bold text-slate-900 tracking-tight group-hover:underline cursor-pointer"
                        onClick={() => handleOpenDetails(order._id)}
                      >
                        {order._id}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-slate-500 font-medium">
                      {order.orderDate.split("T")[0]}
                    </td>
                    <td className="px-8 py-6">
                      <Badge
                        variant={getStatusVariant(order.orderStatus)}
                        className="px-3 py-1 gap-2 border-slate-200 bg-white text-slate-900 hover:bg-slate-900 hover:text-white transition-all capitalize"
                      >
                        {getStatusIcon(order.orderStatus)}
                        {order.orderStatus}
                      </Badge>
                    </td>
                    <td className="px-8 py-6 font-black text-slate-900">
                      ${order.totalAmount.toFixed(2)}
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
                            onClick={() => handleOpenDetails(order._id)}
                            className="rounded-xl px-3 py-2 cursor-pointer focus:bg-slate-50 gap-2"
                          >
                            <ChevronRight className="h-4 w-4" /> View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleUpdateStatus(order._id, "shipped")
                            }
                            className="rounded-xl px-3 py-2 cursor-pointer focus:bg-slate-50 gap-2 text-blue-600"
                          >
                            <Truck className="h-4 w-4" /> Mark as Shipped
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleUpdateStatus(order._id, "delivered")
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

        {/* Mobile/Tablet Card View */}
        <div className="lg:hidden divide-y divide-slate-100">
          {orderList && orderList.length > 0 ? (
            orderList.map((order) => (
              <div
                key={order._id}
                className="p-6 space-y-4 hover:bg-slate-50/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      Order ID
                    </p>
                    <p
                      className="font-bold text-slate-900 tracking-tight underline cursor-pointer"
                      onClick={() => handleOpenDetails(order._id)}
                    >
                      {order._id}
                    </p>
                  </div>
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
                        onClick={() => handleOpenDetails(order._id)}
                        className="rounded-xl px-3 py-2 cursor-pointer focus:bg-slate-50 gap-2"
                      >
                        <ChevronRight className="h-4 w-4" /> View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleUpdateStatus(order._id, "shipped")}
                        className="rounded-xl px-3 py-2 cursor-pointer focus:bg-slate-50 gap-2 text-blue-600"
                      >
                        <Truck className="h-4 w-4" /> Mark as Shipped
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          handleUpdateStatus(order._id, "delivered")
                        }
                        className="rounded-xl px-3 py-2 cursor-pointer focus:bg-slate-50 gap-2 text-green-600"
                      >
                        <CheckCircle2 className="h-4 w-4" /> Mark as Delivered
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      Date
                    </p>
                    <p className="text-slate-600 font-medium text-sm">
                      {order.orderDate.split("T")[0]}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      Amount
                    </p>
                    <p className="font-black text-slate-900 text-sm">
                      ${order.totalAmount.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <Badge
                    variant={getStatusVariant(order.orderStatus)}
                    className="px-3 py-1 gap-2 border-slate-200 bg-white text-slate-900 hover:bg-slate-900 hover:text-white transition-all capitalize text-[10px]"
                  >
                    {getStatusIcon(order.orderStatus)}
                    {order.orderStatus}
                  </Badge>
                  <Button
                    variant="link"
                    size="sm"
                    className="text-[10px] font-bold tracking-widest text-slate-400 hover:text-slate-900 p-0 h-auto"
                    onClick={() => handleOpenDetails(order._id)}
                  >
                    VIEW FULL DETAILS →
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-12 text-center text-slate-400">
              No orders found.
            </div>
          )}
        </div>
      </div>

      <AdminOrderDetailsSheet
        isDetailsOpen={isDetailsOpen}
        setIsDetailsOpen={setIsDetailsOpen}
        orderDetails={orderDetails}
      />
    </div>
  );
};

export default AdminOrdersView;
