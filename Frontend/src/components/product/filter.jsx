import { filterOptions } from "@/config";
import React from "react";

const ProductFilter = () => {
  return (
    <div className="bg-background rounded-lg shadow-sm ">
      <div className="p-4 border-b ">
        <h2 className="text-lg font-semibold">Filters</h2>
        <div className="p-4 space-y-4 ">
          {Object.keys(filterOptions).map((key) => (
            <>
              <div key={key}>
                <h3 className="text-base font-bold">{key} </h3>
                <div>
                  {filterOptions[key].map((item) => (
                    <div key={item.id}>
                      <input type="checkbox" id={item.id} />
                      <label htmlFor={item.id}>{item.label}</label>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
