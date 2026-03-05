import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, ShoppingBag } from "lucide-react";

const PaymentSuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50/50 p-4">
      <Card className="w-full max-w-lg p-12 rounded-[40px] shadow-2xl shadow-slate-200/50 border-none bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-green-400 to-emerald-500"></div>

        <CardHeader className="p-0 flex flex-col items-center space-y-8">
          <div className="h-24 w-24 rounded-full bg-green-50 flex items-center justify-center text-green-500 animate-bounce">
            <CheckCircle2 className="h-14 w-14" />
          </div>

          <div className="text-center space-y-4">
            <CardTitle className="text-4xl md:text-5xl font-serif text-slate-900 tracking-tight">
              Payment Successful!
            </CardTitle>
            <p className="text-slate-500 text-lg font-medium leading-relaxed">
              Thank you for your purchase. Your order has been confirmed and is
              being processed.
            </p>
          </div>
        </CardHeader>

        <div className="mt-12 space-y-4">
          <Button
            onClick={() => navigate("/shop/account")}
            className="w-full h-16 bg-slate-900 text-white hover:bg-slate-800 rounded-2xl text-lg font-bold shadow-lg shadow-slate-900/20 transition-all active:scale-[0.98] flex items-center justify-center gap-3"
          >
            <ShoppingBag className="h-6 w-6" />
            View My Orders
          </Button>

          <Button
            variant="ghost"
            onClick={() => navigate("/shop/listing")}
            className="w-full h-16 text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-2xl text-lg font-semibold transition-all"
          >
            Continue Shopping
          </Button>
        </div>

        <p className="text-[11px] text-center text-slate-400 uppercase tracking-[0.2em] mt-12 font-bold">
          A confirmation email has been sent to your inbox.
        </p>
      </Card>
    </div>
  );
};

export default PaymentSuccessPage;
