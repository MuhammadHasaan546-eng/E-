import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Select,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const types = {
  input: "input",
  select: "select",
  textarea: "textarea",
};

const CommonFrom = ({
  fromControls,
  controls,
  fromData,
  formData,
  setFromData,
  onSubmit,
  buttonText,
  isButtonDisabled,
  isLoading,
}) => {
  const [errors, setErrors] = useState({}); // Errors store karne ke liye state

  const resolvedControls = fromControls ?? controls ?? [];
  const resolvedFormData = formData ?? fromData ?? {};

  // Validation Logic
  const validate = (name, value, control) => {
    let errorMsg = "";

    if (control.type === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) errorMsg = "Invalid email format";
    }

    if (control.type === "password" || name === "password") {
      if (value.length < 8) errorMsg = "Password must be at least 8 characters";
    }

    if (control.required && !value) {
      errorMsg = `${control.label} is required`;
    }

    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
    return errorMsg;
  };

  const handleInputChange = (control, value) => {
    setFromData({
      ...resolvedFormData,
      [control.name]: value,
    });
    // Type karte waqt hi validation check karega
    validate(control.name, value, control);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Final check before submit
    let allErrors = {};
    resolvedControls.forEach((control) => {
      const error = validate(
        control.name,
        resolvedFormData[control.name] || "",
        control,
      );
      if (error) allErrors[control.name] = error;
    });

    if (Object.values(allErrors).some((msg) => msg !== "")) {
      setErrors(allErrors);
      return; // Agar error hai toh submit nahi hoga
    }

    onSubmit?.(resolvedFormData);
  };

  const renderItemComponentType = (control) => {
    const value = resolvedFormData?.[control.name] ?? "";
    const hasError = !!errors[control.name];

    const commonProps = {
      name: control.name,
      id: control.name,
      placeholder: control.placeholder,
      value: value,
      className: hasError
        ? "border-destructive focus-visible:ring-destructive"
        : "",
      onChange: (e) => handleInputChange(control, e.target.value),
    };

    switch (control.componentType) {
      case types.input:
        return <Input {...commonProps} type={control.type} />;

      case types.select:
        return (
          <Select
            onValueChange={(val) => handleInputChange(control, val)}
            value={value}
          >
            <SelectTrigger
              className={`w-full ${hasError ? "border-destructive" : ""}`}
            >
              <SelectValue placeholder={control.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {control.options?.map((opt) => (
                <SelectItem
                  key={opt.value ?? opt.id}
                  value={opt.value ?? opt.id}
                >
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case types.textarea:
        return <Textarea {...commonProps} />;

      default:
        return <Input {...commonProps} type={control.type} />;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-3">
        {resolvedControls.map((control) => (
          <div key={control.name} className="grid w-full gap-1.5">
            <Label className="mb-1">{control.label}</Label>
            {renderItemComponentType(control)}
            {/* Error Message Display */}
            {errors[control.name] && (
              <p className="text-xs text-destructive font-medium">
                {errors[control.name]}
              </p>
            )}
          </div>
        ))}
      </div>

      <Button
        disabled={isButtonDisabled || Object.values(errors).some((m) => m) || isLoading}
        className="mt-4 w-full"
        type="submit"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait...
          </>
        ) : (
          buttonText || "Submit"
        )}
      </Button>
    </form>
  );
};

export default CommonFrom;
