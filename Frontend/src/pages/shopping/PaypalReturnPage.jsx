import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { capturePayment } from "@/api/shop/order/create-new-order";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const PaypalReturnPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const paymentId = params.get("paymentId");
  const payerId = params.get("PayerID");

  useEffect(() => {
    if (paymentId && payerId) {
      const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));

      dispatch(capturePayment({ paymentId, payerId, orderId })).then((data) => {
        if (data?.payload?.success) {
          sessionStorage.removeItem("currentOrderId");
          window.location.href = "/shop/payment-success";
        }
      });
    }
  }, [paymentId, payerId, dispatch]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50/50">
      <Card className="p-10 rounded-3xl shadow-xl border-none w-[500px]">
        <CardHeader className="p-0">
          <CardTitle className="text-4xl font-serif text-slate-900 text-center">
            Processing Payment...
          </CardTitle>
          <p className="text-slate-500 text-center mt-4">
            Please wait while we confirm your transaction. Do not refresh the
            page.
          </p>
        </CardHeader>
        <div className="flex justify-center mt-10">
          <div className="h-12 w-12 border-4 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </Card>
    </div>
  );
};

export default PaypalReturnPage;
