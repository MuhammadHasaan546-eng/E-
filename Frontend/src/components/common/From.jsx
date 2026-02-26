import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Select } from "../ui/select";
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
}) => {
  const resolvedControls = fromControls ?? controls ?? [];
  const resolvedFormData = formData ?? fromData ?? {};

  const renderItemComponentType = (control) => {
    let element = null;
    const value = resolvedFormData?.[control.name] ?? "";

    switch (control.componentType) {
      case types.input:
        element = (
          <Input
            name={control.name}
            placeholder={control.placeholder}
            id={control.name}
            type={control.type}
            value={value}
            onChange={(e) =>
              setFromData({
                ...resolvedFormData,
                [control.name]: e.target.value,
              })
            }
          />
        );
        break;

      case types.select:
        element = (
          <Select
            onValueChange={(value) =>
              setFromData({ ...resolvedFormData, [control.name]: value })
            }
            name={control.name}
            value={value}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={control.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {control.options?.map((option) => (
                <SelectItem
                  key={option.value ?? option.id}
                  value={option.value ?? option.id}
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
        break;

      case types.textarea:
        element = (
          <Textarea
            placeholder={control.placeholder}
            id={control.name}
            name={control.name}
            value={value}
            onChange={(e) =>
              setFromData({
                ...resolvedFormData,
                [control.name]: e.target.value,
              })
            }
          />
        );
        break;

      default:
        element = (
          <Input
            name={control.name}
            placeholder={control.placeholder}
            id={control.name}
            type={control.type}
            value={value}
            onChange={(e) =>
              setFromData({
                ...resolvedFormData,
                [control.name]: e.target.value,
              })
            }
          />
        );
        break;
    }

    return element;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(resolvedFormData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-3">
        {resolvedControls.map((control) => (
          <div key={control.name} className="grid w-full gap-1.5">
            <Label className="mb-1">{control.label}</Label>
            {renderItemComponentType(control)}
          </div>
        ))}
      </div>

      <Button className="mt-4 w-full" type="submit">
        {buttonText || "Submit"}
      </Button>
    </form>
  );
};

export default CommonFrom;
