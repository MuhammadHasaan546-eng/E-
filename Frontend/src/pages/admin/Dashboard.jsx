import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
} from "@/api/admin/order/order";

import { fetchProducts } from "@/api/admin/products";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import {
  DollarSign,
  ShoppingBag,
  Users,
  Package,
  ArrowUpRight,
  TrendingUp,
  Clock,
  ChevronRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";

// Graph imports

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import AdminOrderDetailsSheet from "@/components/admin/OrderDetailsSheet";

const AdminDashboard = () => {
  const dispatch = useDispatch();

  const { orderList, orderDetails } = useSelector((state) => state.adminOrder);

  const { productLists } = useSelector((state) => state.adminProducts);

  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  useEffect(() => {
    dispatch(getAllOrdersForAdmin());

    dispatch(fetchProducts());
  }, [dispatch]);

  const handleOpenDetails = (orderId) => {
    dispatch(getOrderDetailsForAdmin(orderId));
  };

  useEffect(() => {
    if (orderDetails !== null) {
      setIsDetailsOpen(true);
    }
  }, [orderDetails]);

  const chartData = [
    { name: "Mon", sales: 2400 },

    { name: "Tue", sales: 1398 },

    { name: "Wed", sales: 9800 },

    { name: "Thu", sales: 3908 },

    { name: "Fri", sales: 4800 },

    { name: "Sat", sales: 3800 },

    { name: "Sun", sales: 4300 },
  ];

  const totalRevenue =
    orderList.reduce((acc, order) => acc + order.totalAmount, 0) || 0;

  const totalOrders = orderList.length || 0;

  const totalProducts = productLists.length || 0;

  const recentOrders = orderList.slice(0, 5) || [];

  const metrics = [
    {
      title: "Total Revenue",

      value: `$${totalRevenue.toLocaleString()}`,

      icon: DollarSign,

      color: "text-emerald-500",

      bg: "bg-emerald-500/10",

      trend: "+12.5%",

      trendUp: true,
    },

    {
      title: "Total Orders",

      value: totalOrders,

      icon: ShoppingBag,

      color: "text-blue-500",

      bg: "bg-blue-500/10",

      trend: "+8.2%",

      trendUp: true,
    },

    {
      title: "Active Products",

      value: totalProducts,

      icon: Package,

      color: "text-[#d4af37]",

      bg: "bg-[#d4af37]/10",

      trend: "+2 new",

      trendUp: true,
    },

    {
      title: "Total Customers",

      value: "1,204",

      icon: Users,

      color: "text-purple-500",

      bg: "bg-purple-500/10",

      trend: "+5.4%",

      trendUp: true,
    },
  ];

  return (
    <div className="p-4 md:p-8 lg:p-10 space-y-10 bg-slate-50/50 min-h-screen">
      {/* 1. Header Section */}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-serif text-slate-900 tracking-tight">
            Executive Summary
          </h1>

          <p className="text-slate-500 text-sm italic">
            Live store performance overview.
          </p>
        </div>

        <Button className="bg-slate-900 text-white rounded-full px-8 shadow-lg shadow-slate-900/20">
          DOWNLOAD REPORT
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <Card
            key={index}
            className="border-0 shadow-sm rounded-3xl group hover:shadow-md transition-all"
          >
            <CardContent className="p-6">
              <div className="flex justify-between mb-4">
                <div className={`p-3 rounded-2xl ${metric.bg} ${metric.color}`}>
                  <metric.icon size={20} />
                </div>

                <div className="text-emerald-500 text-xs font-bold flex items-center gap-1">
                  <TrendingUp size={12} />

                  {metric.trend}
                </div>
              </div>

              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                {metric.title}
              </p>

              <h3 className="text-2xl font-black text-slate-900">
                {metric.value}
              </h3>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-0 shadow-sm rounded-[2rem] overflow-hidden bg-white p-8">
        <div className="mb-6">
          <CardTitle className="text-xl font-serif">
            Revenue Performance
          </CardTitle>

          <CardDescription>Weekly sales volume tracking.</CardDescription>
        </div>

        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />

                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f1f5f9"
              />

              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94a3b8", fontSize: 12 }}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94a3b8", fontSize: 12 }}
              />

              <Tooltip
                contentStyle={{
                  borderRadius: "15px",

                  border: "none",

                  boxShadow: "0 10px 15px rgba(0,0,0,0.05)",
                }}
              />

              <Area
                type="monotone"
                dataKey="sales"
                stroke="#3b82f6"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorSales)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 border-0 shadow-sm rounded-[2rem] overflow-hidden bg-white">
          <CardHeader className="p-8">
            <CardTitle className="text-xl font-serif">
              Recent Transactions
            </CardTitle>
          </CardHeader>

          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase text-slate-400">
                      Customer
                    </th>

                    <th className="px-6 py-4 text-[10px] font-bold uppercase text-slate-400">
                      Order Info
                    </th>

                    <th className="px-6 py-4 text-[10px] font-bold uppercase text-slate-400 text-center">
                      Status
                    </th>

                    <th className="px-6 py-4 text-[10px] font-bold uppercase text-slate-400 text-right">
                      Amount
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-50">
                  {recentOrders.map((order) => (
                    <tr
                      key={order._id}
                      className="hover:bg-slate-50/50 transition-colors group cursor-pointer"
                      onClick={() => handleOpenDetails(order._id)}
                    >
                      <td className="px-6 py-5">
                        <span className="text-sm font-bold text-slate-900 capitalize">
                          {order.addressInfo.pincode || "User"}
                        </span>

                        <p className="text-[10px] text-slate-400">
                          {order.addressInfo.phone || "No Phone"}
                        </p>
                      </td>

                      <td className="px-6 py-5">
                        <span className="text-sm font-bold text-slate-900 uppercase">
                          #{order._id.slice(-6)}
                        </span>

                        <p className="text-[10px] text-slate-400">
                          {order.cartItems.length || 0} Items •{" "}
                          {order.orderDate.split("T")[0]}
                        </p>
                      </td>

                      <td className="px-6 py-5 text-center">
                        <Badge className="rounded-full px-3 py-1 text-[10px] font-bold uppercase bg-blue-50 text-blue-600 border-0">
                          {order.orderStatus}
                        </Badge>
                      </td>

                      <td className="px-6 py-5 text-right font-black text-slate-900">
                        ${order.totalAmount.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm rounded-[2rem] bg-slate-900 p-8 text-white">
          <div className="space-y-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-500">
              Premium Insight
            </span>

            <h3 className="text-2xl font-serif">Kokhan is growing.</h3>

            <p className="text-slate-400 text-sm font-light">
              Inventory status looks healthy for the upcoming week.
            </p>

            <div className="space-y-3 pt-6">
              <Button className="w-full justify-between bg-white/10 hover:bg-white/20 rounded-2xl h-14 text-xs font-bold tracking-widest px-6">
                STOCK LEVELS <ChevronRight className="w-4 h-4 text-[#d4af37]" />
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <AdminOrderDetailsSheet
        isDetailsOpen={isDetailsOpen}
        setIsDetailsOpen={setIsDetailsOpen}
        orderDetails={orderDetails}
      />
    </div>
  );
};

export default AdminDashboard;
