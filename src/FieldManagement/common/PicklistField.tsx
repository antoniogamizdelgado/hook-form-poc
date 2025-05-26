import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from "@mui/material";

import { Option } from "./Option";

type Props<T extends FieldValues> = {
  name: Path<T>;
  options: readonly Option[];
  label: string;
} & Omit<SelectProps, "name" | "label">;

export function PicklistField<T extends FieldValues>({
  name,
  options,
  label,
  multiple,
  ...props
}: Props<T>) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange, ref }, fieldState: { error } }) => (
        <FormControl fullWidth error={!!error}>
          <InputLabel id={`${name}-label`}>{label}</InputLabel>
          <Select
            {...props}
            multiple={multiple}
            labelId={`${name}-label`}
            value={multiple ? value || [] : value || ""}
            onChange={onChange}
            inputRef={ref}
            label={label}
          >
            {options.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    />
  );
}
