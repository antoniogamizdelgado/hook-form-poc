import { FormProvider } from "react-hook-form";

import { DevTool } from "@hookform/devtools";

import { Table } from "./Table/Table";
import { useFormController } from "./Form/FormController";

export function FieldManagement() {
  const { fields, handlers, methods } = useFormController();

  return (
    <FormProvider {...methods}>
      <Table fields={fields} handlers={handlers} />
      <DevTool control={methods.control} />
    </FormProvider>
  );
}
