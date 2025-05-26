import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";

import { Checkbox, CheckboxProps, FormControlLabel } from "@mui/material";

type Props<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  onCustomChange?: (value: boolean) => void;
} & Pick<CheckboxProps, "disabled" | "color" | "size">;

export function BadgerCheckbox<T extends FieldValues>({
  name,
  label,
  onCustomChange,
  ...props
}: Props<T>) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControlLabel
          control={
            <Checkbox
              {...field}
              checked={field.value || false}
              onChange={(e) => {
                field.onChange(e);
                if (onCustomChange) {
                  onCustomChange(e.target.checked);
                }
              }}
              {...props}
            />
          }
          label={label}
        />
      )}
    />
  );
}
