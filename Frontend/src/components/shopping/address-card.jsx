import React from "react";

const AddressCard = ({
  addressInfo,
  handleDeleteAddress,
  handleEditAddress,
  setCurrentEditedId,
}) => {
  return (
    <div className="border border-slate-100 rounded-2xl p-6 hover:border-slate-300 hover:shadow-md transition-all bg-white group relative">
      <div className="flex justify-between items-start mb-4">
        <span className="bg-slate-50 text-slate-600 text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest border border-slate-100">
          Saved Address
        </span>
        <div className="space-x-3 text-sm opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity flex">
          <button
            onClick={() => {
              setCurrentEditedId(addressInfo?._id);
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
      <h4 className="font-semibold text-slate-800 text-lg tracking-wide">
        {addressInfo?.address}
      </h4>
      <div className="text-slate-500 text-sm mt-2 leading-loose font-light">
        <p>
          {addressInfo?.city}, {addressInfo?.state}
        </p>
        <p>
          {addressInfo?.zip}, {addressInfo?.country}
        </p>
        {addressInfo?.note && (
          <p className="italic mt-1 text-slate-400">
            Note: {addressInfo?.note}
          </p>
        )}
      </div>
      <p className="text-slate-500 text-sm mt-4 pt-4 border-t border-slate-50 flex items-center gap-2 font-medium">
        <span className="h-1.5 w-1.5 rounded-full bg-slate-300"></span>{" "}
        {addressInfo?.phone}
      </p>
    </div>
  );
};

export default AddressCard;
