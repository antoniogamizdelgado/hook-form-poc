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

  const { fields } = useFieldArray({
    control: methods.control,
    name: "fields",
  });

  return (
    <FormProvider {...methods}>
      <Table fields={fields} />
      <DevTool control={methods.control} />
    </FormProvider>
  );
}
