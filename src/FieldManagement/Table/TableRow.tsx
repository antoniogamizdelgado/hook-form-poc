import React from "react";
import { TableCell, TableRow as TableRowMui } from "@mui/material";
import { BadgerTextField } from "../common/TextField";
import { PicklistField } from "../common/PicklistField";
import { Option } from "../types/Option";
import { BadgerCheckbox } from "../common/Checkbox";
import { FormValues, RowHandlers } from "../Form/FormController";

export type Props = {
  fieldId: string;
  index: number;
  handlers: RowHandlers;
};

const badgerFieldTypeOptions: readonly Option[] = [
  { id: "text", label: "Text" },
  { id: "number", label: "Number" },
  { id: "picklist", label: "Picklist" },
  { id: "address", label: "Address" },
  { id: "datetime", label: "Datetime" },
  { id: "lookup", label: "Lookup" },
] as const;

export const TableRow: React.FC<Props> = ({ fieldId, index, handlers }) => {
  return (
    <TableRowMui key={fieldId}>
      <TableCell>
        <BadgerTextField<FormValues>
          name={`fields.${index}.badgerLabel` as const}
          label="Badger Label"
        />
      </TableCell>
      <TableCell>
        <BadgerTextField<FormValues>
          name={`fields.${index}.badgerAPIName` as const}
          label="Badger API Name"
        />
      </TableCell>
      <TableCell>
        <PicklistField<FormValues>
          name={`fields.${index}.badgerFieldType` as const}
          options={badgerFieldTypeOptions}
          label="Badger Field Type"
        />
      </TableCell>
      <TableCell>
        <BadgerTextField<FormValues>
          name={`fields.${index}.crmAPIName` as const}
          label="CRM API Name"
        />
      </TableCell>
      <TableCell>
        <BadgerCheckbox<FormValues>
          name={`fields.${index}.isMandatory` as const}
          onCustomChange={(value) =>
            handlers.handleMandatoryChange(index, value)
          }
        />
      </TableCell>
      <TableCell>
        <BadgerCheckbox<FormValues>
          name={`fields.${index}.isViewOnly` as const}
          onCustomChange={(value) =>
            handlers.handleViewOnlyChange(index, value)
          }
        />
      </TableCell>
    </TableRowMui>
  );
};
