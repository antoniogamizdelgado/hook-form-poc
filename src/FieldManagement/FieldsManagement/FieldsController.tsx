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

  const { append, remove, move } = useFieldArray({
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

  const handleMoveUp = (index: number) => {
    if (index > 0) {
      move(index, index - 1);
    }
  };

  const handleMoveDown = (index: number) => {
    const fields = methods.getValues("fields");
    if (index < fields.length - 1) {
      move(index, index + 1);
    }
  };

  const handleReorder = (fromIndex: number, toIndex: number) => {
    const fields = methods.getValues("fields");
    if (
      fromIndex >= 0 &&
      fromIndex < fields.length &&
      toIndex >= 0 &&
      toIndex < fields.length &&
      fromIndex !== toIndex
    ) {
      move(fromIndex, toIndex);
    }
  };

  return {
    fields: methods.watch("fields"),
    handlers: {
      handleAddRow,
      rowHandlers: {
        handleMandatoryChange,
        handleViewOnlyChange,
        handleRemoveRow,
        handleMoveUp,
        handleMoveDown,
        handleReorder,
      },
    },
    methods,
  };
};

export type Handlers = ReturnType<typeof useFieldsController>["handlers"];

export type RowHandlers = Handlers["rowHandlers"];
