import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addAddress,
  deleteAddress,
  editAddress,
  fetchAddress,
} from "../../store/shop/address-slice";
import AddressCard from "./address-card";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
} from "../ui/card";
import { Button } from "../ui/button";
import { toast } from "sonner";

const initialAddressFormData = {
  address: "",
  city: "",
  phone: "",
  zip: "",
  country: "",
  note: "",
  state: "",
};

const ShoppingAddress = () => {
  const [formData, setFormData] = useState(initialAddressFormData);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.address);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchAddress(user?.id));
    }
  }, [dispatch, user]);

  const handleManageAddress = (e) => {
    e.preventDefault();

    if (
      !formData.address ||
      !formData.city ||
      !formData.phone ||
      !formData.zip ||
      !formData.country ||
      !formData.state
    ) {
      toast("Please fill all required fields", {
        variant: "destructive",
      });
      return;
    }

    if (currentEditedId !== null) {
      dispatch(
        editAddress({
          userId: user.id,
          addressId: currentEditedId,
          formData,
        }),
      ).then((data) => {
        if (data.payload.success) {
          dispatch(fetchAddress(user.id));
          setCurrentEditedId(null);
          setFormData(initialAddressFormData);
          setIsFormOpen(false);
          toast("Address updated successfully");
        }
      });
    } else {
      dispatch(
        addAddress({
          ...formData,
          userId: user.id,
        }),
      ).then((data) => {
        if (data.payload.success) {
          dispatch(fetchAddress(user.id));
          setFormData(initialAddressFormData);
          setIsFormOpen(false);
          toast("Address added successfully");
        }
      });
    }
  };

  const handleDeleteAddress = (getCurrentAddress) => {
    dispatch(
      deleteAddress({ userId: user.id, addressId: getCurrentAddress._id }),
    ).then((data) => {
      if (data.payload.success) {
        dispatch(fetchAddress(user.id));
        toast("Address deleted successfully");
      }
    });
  };

  const handleEditAddress = (getCurrentAddress) => {
    setFormData({
      address: getCurrentAddress.address,
      city: getCurrentAddress.city,
      phone: getCurrentAddress.phone,
      zip: getCurrentAddress.zip,
      country: getCurrentAddress.country,
      note: getCurrentAddress.note,
      state: getCurrentAddress.state,
    });
    setIsFormOpen(true);
  };

  return (
    <>
      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-6 mb-6 gap-4">
        <div>
          <CardTitle className="text-2xl font-serif text-slate-800">
            Saved Addresses
          </CardTitle>
          <CardDescription className="text-slate-500">
            Manage your delivery locations.
          </CardDescription>
        </div>
        <Button
          onClick={() => {
            setFormData(initialAddressFormData);
            setCurrentEditedId(null);
            setIsFormOpen(!isFormOpen);
          }}
          className="bg-slate-900 text-white hover:bg-slate-800 rounded-lg px-6"
        >
          {isFormOpen ? "Cancel" : "Add New Address"}
        </Button>
      </CardHeader>

      <CardContent>
        {/* The Form */}
        {isFormOpen && (
          <div className="mb-8 p-6 bg-slate-50/50 rounded-2xl border border-slate-100 animate-in fade-in slide-in-from-top-4">
            <h3 className="text-lg font-serif text-slate-800 mb-4 tracking-wide">
              {currentEditedId !== null ? "Edit Address" : "Add New Address"}
            </h3>
            <form
              onSubmit={handleManageAddress}
              className="grid grid-cols-1 md:grid-cols-2 gap-5"
            >
              <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-bold tracking-widest text-slate-500 uppercase">
                  Address *
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  className="w-full border-b-2 border-slate-200 bg-white px-3 py-2 text-slate-800 focus:ring-0 focus:border-slate-900 outline-none transition-colors rounded-none placeholder:text-slate-300 font-medium"
                  placeholder="Street Address, P.O. box, etc."
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold tracking-widest text-slate-500 uppercase">
                  City *
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                  className="w-full border-b-2 border-slate-200 bg-white px-3 py-2 text-slate-800 focus:ring-0 focus:border-slate-900 outline-none transition-colors rounded-none placeholder:text-slate-300 font-medium"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold tracking-widest text-slate-500 uppercase">
                  State/Province *
                </label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) =>
                    setFormData({ ...formData, state: e.target.value })
                  }
                  className="w-full border-b-2 border-slate-200 bg-white px-3 py-2 text-slate-800 focus:ring-0 focus:border-slate-900 outline-none transition-colors rounded-none placeholder:text-slate-300 font-medium"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold tracking-widest text-slate-500 uppercase">
                  ZIP/Postal Code *
                </label>
                <input
                  type="text"
                  value={formData.zip}
                  onChange={(e) =>
                    setFormData({ ...formData, zip: e.target.value })
                  }
                  className="w-full border-b-2 border-slate-200 bg-white px-3 py-2 text-slate-800 focus:ring-0 focus:border-slate-900 outline-none transition-colors rounded-none placeholder:text-slate-300 font-medium"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold tracking-widest text-slate-500 uppercase">
                  Country *
                </label>
                <input
                  type="text"
                  value={formData.country}
                  onChange={(e) =>
                    setFormData({ ...formData, country: e.target.value })
                  }
                  className="w-full border-b-2 border-slate-200 bg-white px-3 py-2 text-slate-800 focus:ring-0 focus:border-slate-900 outline-none transition-colors rounded-none placeholder:text-slate-300 font-medium"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold tracking-widest text-slate-500 uppercase">
                  Phone *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full border-b-2 border-slate-200 bg-white px-3 py-2 text-slate-800 focus:ring-0 focus:border-slate-900 outline-none transition-colors rounded-none placeholder:text-slate-300 font-medium"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold tracking-widest text-slate-500 uppercase">
                  Additional Notes
                </label>
                <input
                  type="text"
                  value={formData.note}
                  onChange={(e) =>
                    setFormData({ ...formData, note: e.target.value })
                  }
                  className="w-full border-b-2 border-slate-200 bg-white px-3 py-2 text-slate-800 focus:ring-0 focus:border-slate-900 outline-none transition-colors rounded-none placeholder:text-slate-300 font-medium"
                  placeholder="Delivery instructions (optional)"
                />
              </div>
              <div className="md:col-span-2 pt-4 flex justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsFormOpen(false);
                    setCurrentEditedId(null);
                    setFormData(initialAddressFormData);
                  }}
                  className="rounded-lg tracking-widest text-xs font-bold px-6"
                >
                  CANCEL
                </Button>
                <Button
                  type="submit"
                  className="bg-slate-900 text-white hover:bg-slate-800 rounded-lg px-8 shadow-lg shadow-slate-900/20 tracking-widest text-xs font-bold disabled:opacity-50"
                  disabled={
                    !formData.address ||
                    !formData.city ||
                    !formData.phone ||
                    !formData.zip ||
                    !formData.country ||
                    !formData.state
                  }
                >
                  {currentEditedId !== null ? "SAVE CHANGES" : "SAVE ADDRESS"}
                </Button>
              </div>
            </form>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addressList && addressList.length > 0 ? (
            addressList.map((singleAddressItem) => (
              <AddressCard
                key={singleAddressItem._id || singleAddressItem.id}
                addressInfo={singleAddressItem}
                handleDeleteAddress={handleDeleteAddress}
                handleEditAddress={handleEditAddress}
                setCurrentEditedId={setCurrentEditedId}
              />
            ))
          ) : (
            <div className="col-span-full py-12 flex flex-col items-center justify-center text-slate-400">
              <p className="text-lg font-light tracking-wide">
                No addresses saved yet.
              </p>
              {!isFormOpen && (
                <button
                  onClick={() => setIsFormOpen(true)}
                  className="mt-4 text-slate-900 font-medium underline underline-offset-4 hover:text-slate-600 transition-colors"
                >
                  Add your first address
                </button>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </>
  );
};

export default ShoppingAddress;
