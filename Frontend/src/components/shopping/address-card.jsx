import React from "react";

const AddressCard = ({
  addressInfo,
  handleDeleteAddress,
  handleEditAddress,
  setCurrentEditedId,
  selectedId,
  setSelectedAddr,
}) => {
  return (
    <div
      onClick={setSelectedAddr ? () => setSelectedAddr(addressInfo) : null}
      className={`border px-5 py-5 rounded-2xl cursor-pointer transition-all relative group ${
        selectedId === addressInfo?._id
          ? "border-slate-900 bg-slate-900 shadow-xl shadow-slate-900/10"
          : "border-slate-100 bg-white hover:border-slate-300 hover:shadow-md"
      }`}
    >
      <div className="flex justify-between items-start mb-4">
        <span
          className={`text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest border ${
            selectedId === addressInfo._id
              ? "bg-slate-800 text-slate-100 border-slate-700"
              : "bg-slate-50 text-slate-600 border-slate-100"
          }`}
        >
          {selectedId === addressInfo._id ? "Deliver Here" : "Saved Address"}
        </span>
        <div className="space-x-3 text-sm opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity flex">
          <button
            onClick={() => {
              setCurrentEditedId(addressInfo._id);
              handleEditAddress(addressInfo);
            }}
            className="text-slate-400 hover:text-slate-900 transition-colors font-medium bg-slate-50 px-3 py-1.5 rounded-md hover:bg-slate-100"
          >
            Edit
          </button>
          <button
            onClick={() => handleDeleteAddress(addressInfo)}
            className="text-red-400 hover:text-red-600 transition-colors font-medium bg-red-50 px-3 py-1.5 rounded-md hover:bg-red-100"
          >
            Delete
          </button>
        </div>
      </div>
      <h4
        className={`font-semibold text-lg tracking-wide ${
          selectedId === addressInfo._id ? "text-white" : "text-slate-800"
        }`}
      >
        {addressInfo.address}
      </h4>
      <div
        className={`text-sm mt-2 leading-loose font-light ${
          selectedId === addressInfo._id ? "text-slate-300" : "text-slate-500"
        }`}
      >
        <p>
          {addressInfo.city}, {addressInfo.state}
        </p>
        <p>
          {addressInfo.zip}, {addressInfo.country}
        </p>
        {addressInfo.note && (
          <p
            className={`italic mt-1 ${
              selectedId === addressInfo._id
                ? "text-slate-400"
                : "text-slate-400"
            }`}
          >
            Note: {addressInfo.note}
          </p>
        )}
      </div>
      <p
        className={`text-sm mt-4 pt-4 border-t flex items-center gap-2 font-medium ${
          selectedId === addressInfo._id
            ? "text-slate-300 border-slate-800"
            : "text-slate-500 border-slate-50"
        }`}
      >
        <span
          className={`h-1.5 w-1.5 rounded-full ${
            selectedId === addressInfo._id ? "bg-slate-600" : "bg-slate-300"
          }`}
        ></span>{" "}
        {addressInfo.phone}
      </p>
    </div>
  );
};

export default AddressCard;
