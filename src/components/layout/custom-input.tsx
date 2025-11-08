import { ComponentProps, useEffect } from "react";
import { Input } from "../ui/input";
import { checkFieldError } from "@/lib/utils";
import { useToast } from "../ui/toast";

type CustomInputProps = ComponentProps<'input'>& {
  name: string;
  errors: any;
  labelText: string;
}

export const CustomInput = ({ name, errors, labelText, ...inputProps }: CustomInputProps) => {
  const error = checkFieldError(errors, name);
  const { show } = useToast();

  useEffect(() => {
    if (error) {
      show({
        title: "Erro no campo",
        message: error,
        variant: "error",
      });
    }
  }, [error, show]);

  return (
    <div className="mb-4 flex flex-col">
      <label
        className="block mb-2 text-sm font-medium text-gray-700"
        htmlFor={name}
      >
        {labelText}
      </label>
      <Input
        id={name}
        aria-describedby={name}
        name={name}
        {...inputProps}
        className={`${error ? "border border-red-800" : ""}`}
      />
      {error && null}
    </div>
  );
}