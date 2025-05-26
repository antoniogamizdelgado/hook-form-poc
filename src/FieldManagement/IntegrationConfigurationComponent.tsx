import { FormProvider } from "react-hook-form";

import { DevTool } from "@hookform/devtools";

import { Table } from "./FieldsManagement/Table";
import { useFieldsController } from "./FieldsManagement/FieldsController";
import { ObjectParametersComponent } from "./ObjectParameters/ObjectParametersComponent";
import { useObjectParametersController } from "./ObjectParameters/ObjectParametersController";

export function FieldManagement() {
  const { fields, handlers, methods } = useFieldsController();

  const {
    availableTitles,
    availableSubtitles,
    methods: objectParametersMethods,
  } = useObjectParametersController(fields);

  return (
    <>
      <FormProvider {...methods}>
        <Table fields={fields} handlers={handlers} />
        {/* <DevTool control={methods.control} /> */}
      </FormProvider>

      <FormProvider {...objectParametersMethods}>
        <ObjectParametersComponent
          availableTitles={availableTitles}
          availableSubtitles={availableSubtitles}
        />
        {/* <DevTool control={objectParametersMethods.control} /> */}
      </FormProvider>
    </>
  );
}
