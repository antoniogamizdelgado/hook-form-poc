import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";

import { TextField, TextFieldProps } from "@mui/material";

type Props<T extends FieldValues> = {
  name: Path<T>;
  onCustomChange?: (value: string) => void;
} & Pick<TextFieldProps, "label">;

export function BadgerTextField<T extends FieldValues>({
  name,
  onCustomChange,
  ...props
}: Props<T>) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          {...props}
          error={!!error}
          helperText={error?.message}
          onChange={(e) => {
            field.onChange(e);
            if (onCustomChange) {
              onCustomChange(e.target.value);
            }
          }}
        />
      )}
    />
  );
}
