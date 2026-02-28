import { filterOptions } from "@/config";
import React from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";

const ProductFilter = ({ filter, handleFilter }) => {
  return (
    <div className="bg-background rounded-lg shadow-sm ">
      <div className="p-4 border-b ">
        <h2 className="text-lg font-extrabold">Filters</h2>
        <div className="p-4 space-y-4 ">
          {Object.keys(filterOptions).map((key) => (
            <>
              <div key={key}>
                <h3 className="text-base font-extrabold ">{key} </h3>
                <div className="grid gap-2 mt-2">
                  {filterOptions[key].map((item) => (
                    <Label
                      key={item.id}
                      className="flex items-center gap-2 font-medium"
                    >
                      <Checkbox
                        checked={
                          filter &&
                          Object.keys(filter).length > 0 &&
                          filter[key] &&
                          filter[key].indexOf(item.id) > -1
                        }
                        onCheckedChange={() => handleFilter(key, item.id)}
                      />
                      <span>{item.label}</span>
                    </Label>
                  ))}
                </div>
              </div>
              <div>
                <Separator />
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
