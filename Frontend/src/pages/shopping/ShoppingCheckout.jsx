import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ShoppingAddress from "../../components/shopping/address";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ShoppingBag,
  ChevronRight,
  MapPin,
  CreditCard,
  ShieldCheck,
  Loader2,
} from "lucide-react";

import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../../store/shop/cart-slice";
import { createNewOrder } from "@/api/shop/order/create-new-order";

const ShoppingCheckout = () => {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const { approvalURL, isLoading } = useSelector((state) => state.shopOrder);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isPaymentStart, setIsPaymentStart] = useState(false);
  const dispatch = useDispatch();

  const items = cartItems?.items || [];

  const totalCartAmount =
    items.length > 0
      ? items.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0,
        )
      : 0;

  const handlePlaceOrder = () => {
    if (items.length === 0) {
      toast.error("Your cart is empty. Please add items to proceed");
      return;
    }
    if (!selectedAddress) {
      toast.error("Please select a delivery address.", {
        position: "bottom-center",
      });
      return;
    }

    const orderData = {
      userId: user?.id,
      cartItems: items.map((cartItem) => ({
        productId: cartItem?.productId,
        title: cartItem?.title,
        image: cartItem?.image,
        price: cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price,
        quantity: cartItem?.quantity,
      })),
      addressInfo: {
        addressId: selectedAddress?._id,
        address: selectedAddress?.address,
        city: selectedAddress?.city,
        pincode: selectedAddress?.pincode,
        phone: selectedAddress?.phone,
        notes: selectedAddress?.notes,
      },
      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentStatus: "pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
    };

    dispatch(createNewOrder(orderData)).then((data) => {
      if (data.payload.success) {
        setIsPaymentStart(true);
      } else {
        setIsPaymentStart(false);
      }
    });
  };

  if (approvalURL) {
    window.location.href = approvalURL;
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/50">
      {/* Banner Section */}
      <div className="relative h-[250px] w-full overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop"
          alt="Checkout Banner"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-serif text-white tracking-tight">
              Review Your Order
            </h1>
            <div className="flex items-center justify-center gap-2 text-slate-200 text-sm font-medium tracking-widest uppercase">
              <span>Cart</span>
              <ChevronRight className="h-4 w-4" />
              <span className="text-white">Checkout</span>
              <ChevronRight className="h-4 w-4" />
              <span>Payment</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Address Selection */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-8 border-b border-slate-50 flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-serif text-slate-900">
                    Delivery Address
                  </h2>
                  <p className="text-slate-500 text-sm">
                    Select where you want your items delivered.
                  </p>
                </div>
              </div>
              <div className="p-8">
                <ShoppingAddress
                  selectedId={selectedAddress?._id}
                  setSelectedAddr={setSelectedAddress}
                  hideHeader={true}
                />
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden p-8 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <ShieldCheck className="h-6 w-6 text-green-600" />
                <div>
                  <h4 className="font-semibold text-slate-900">
                    Secure Checkout
                  </h4>
                  <p className="text-slate-500 text-sm">
                    Your data is always protected.
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="h-8 w-12 bg-slate-100 rounded flex items-center justify-center text-[10px] font-bold text-slate-400">
                  VISA
                </div>
                <div className="h-8 w-12 bg-slate-100 rounded flex items-center justify-center text-[10px] font-bold text-slate-400">
                  MC
                </div>
                <div className="h-8 w-12 bg-slate-100 rounded flex items-center justify-center text-[10px] font-bold text-slate-400">
                  AE
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden sticky top-8">
              <div className="p-8 border-b border-slate-50 flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-900">
                  <ShoppingBag className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-serif text-slate-900">
                    Order Summary
                  </h2>
                  <p className="text-slate-500 text-sm">
                    {items.length} items in your bag
                  </p>
                </div>
              </div>

              <div className="p-8 space-y-6">
                <div className="max-h-[300px] overflow-y-auto pr-2 custom-scrollbar space-y-4">
                  {items && items.length > 0 ? (
                    items.map((item) => (
                      <div
                        key={item.productId}
                        className="flex items-center gap-4 group"
                      >
                        <div className="h-16 w-16 shrink-0 rounded-xl overflow-hidden border border-slate-100 group-hover:border-slate-300 transition-colors">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-slate-900 truncate">
                            {item.title}
                          </h4>
                          <p className="text-xs text-slate-500">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-slate-900">
                            $
                            {(
                              (item.salePrice > 0
                                ? item.salePrice
                                : item.price) * item.quantity
                            ).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-slate-400 space-y-2">
                      <ShoppingBag className="h-12 w-12 opacity-20" />
                      <p className="italic">Your bag is currently empty</p>
                    </div>
                  )}
                </div>

                <div className="space-y-3 pt-6 border-t border-slate-50">
                  <div className="flex justify-between text-slate-500 text-sm">
                    <span>Subtotal</span>
                    <span className="font-semibold text-slate-900">
                      ${totalCartAmount.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-500 text-sm">
                    <span>Shipping</span>
                    <span className="text-green-600 font-bold uppercase tracking-widest text-[10px]">
                      Free
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-500 text-sm">
                    <span>Taxes</span>
                    <span className="font-semibold text-slate-900">$0.00</span>
                  </div>
                  <div className="pt-4 flex justify-between items-end border-t border-slate-50">
                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">
                        Total Amount
                      </p>
                      <p className="text-3xl font-black text-slate-900 tabular-nums">
                        ${totalCartAmount.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handlePlaceOrder}
                  className="w-full h-14 bg-slate-900 text-white hover:bg-slate-800 rounded-2xl text-lg font-bold shadow-lg shadow-slate-900/20 transition-all active:scale-[0.98] group flex items-center justify-center gap-3"
                  disabled={
                    !cartItems ||
                    items.length === 0 ||
                    isLoading ||
                    isPaymentStart
                  }
                >
                  {isLoading || isPaymentStart ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Redirecting to PayPal...
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-5 w-5" />
                      Place Your Order
                    </>
                  )}
                </Button>

                <p className="text-[10px] text-center text-slate-400 uppercase tracking-widest px-4 leading-relaxed">
                  By placing an order, you agree to our terms and conditions and
                  privacy policy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCheckout;
