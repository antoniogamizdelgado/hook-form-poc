import { zodResolver } from "@hookform/resolvers/zod";
import { defaultValues, Field, FieldSchema } from "./Field";
import { z } from "zod";
import { useFieldArray, useForm } from "react-hook-form";

export type FieldsValues = {
  fields: Field[];
};

export const useFieldsController = () => {
  const methods = useForm<FieldsValues>({
    mode: "all",
    resolver: zodResolver(z.object({ fields: z.array(FieldSchema) })),
    defaultValues: {
      fields: [defaultValues],
    },
  });

  const { append, remove } = useFieldArray({
    control: methods.control,
    name: "fields",
  });

  const handleMandatoryChange = (index: number, value: boolean) => {
    methods.setValue(`fields.${index}.isMandatory`, value);
    if (value) {
      methods.setValue(`fields.${index}.isViewOnly`, false);
    }
  };

  const handleViewOnlyChange = (index: number, value: boolean) => {
    methods.setValue(`fields.${index}.isViewOnly`, value);
    if (value) {
      methods.setValue(`fields.${index}.isMandatory`, false);
    }
  };

  const handleAddRow = () => {
    append({
      ...defaultValues,
      id: "field_" + Math.random().toString(36).substring(2, 15),
    });
  };

  const handleRemoveRow = (index: number) => {
    if (methods.getValues("fields").length <= 1) {
      return;
    }
    remove(index);
  };

  return {
    fields: methods.watch("fields"),
    handlers: {
      handleAddRow,
      rowHandlers: {
        handleMandatoryChange,
        handleViewOnlyChange,
        handleRemoveRow,
      },
    },
    methods,
  };
};

export type Handlers = ReturnType<typeof useFieldsController>["handlers"];

export type RowHandlers = Handlers["rowHandlers"];
