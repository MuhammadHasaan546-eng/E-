import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
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
  formData,
  setFromData,
  onSubmit,
  buttonText,
}) => {
  const renderItemComponentType = (control) => {
    let element = null;
    const value = formData[control.name];
    switch (control.componentType) {
      case fromControls.input:
        element = (
          <Input
            name={control.name}
            placeholder={control.placeholder}
            id={control.name}
            type={control.type}
            value={value}
            onChange={(e) =>
              setFromData({ ...formData, [control.name]: e.target.value })
            }
          />
        );
        break;
      case types.select:
        element = (
          <Select
            onValueChange={(value) =>
              setFromData({ ...formData, [control.name]: value })
            }
            name={control.name}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={control.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {control.options && control.options.length > 0
                ? control.options.map((option) => (
                    <SelectItem key={option.id} value={option.id}>
                      {option.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );
        break;
      case types.textarea:
        element = (
          <Textarea
            placeholder={control.placeholder}
            id={control.id}
            name={control.name}
            value={value}
          />
        );
        break;

      default:
        element;
        element = (
          <Input
            name={control.name}
            placeholder={control.placeholder}
            id={control.name}
            type={control.type}
            value={value}
            onChange={(e) =>
              setFromData({ ...formData, [control.name]: e.target.value })
            }
          />
        );

        break;
    }
    return element;
  };
  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-3">
        {fromControls.map((control) => (
          <div key={control.name} className="grid w-full gap-1.5">
            <Label className="mb-1"> {control.label} </Label>
            {renderItemComponentType(control)}
          </div>
        ))}
      </div>
      <Button className={"mt-4 w-full "} type="submit">
        {buttonText || "Submit"}
      </Button>
    </form>
  );
};

export default CommonFrom;
