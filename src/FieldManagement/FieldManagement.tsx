import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";

import { Field, FieldSchema, defaultValues } from "./types/Field";
import { Table } from "./Table/Table";

type FormValues = {
  fields: Field[];
};

export function FieldManagement() {
  const methods = useForm<FormValues>({
    mode: "all",
    resolver: zodResolver(z.object({ fields: z.array(FieldSchema) })),
    defaultValues: {
      fields: [defaultValues],
    },
  });

  const { fields, append } = useFieldArray({
    control: methods.control,
    name: "fields",
  });

  const handleAddRow = () => {
    append({
      ...defaultValues,
      id: "field_" + Math.random().toString(36).substring(2, 15),
    });
  };

  return (
    <FormProvider {...methods}>
      <Table fields={fields} onAddRow={handleAddRow} />
      <DevTool control={methods.control} />
    </FormProvider>
  );
}
