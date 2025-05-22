import React from "react";
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
} from "@mui/material";
import { Field } from "../types/Field";
import { BadgerTextField } from "../common/TextField";
import { PicklistField } from "../common/PicklistField";
import { Option } from "../types/Option";

type FormValues = {
  fields: Field[];
};

type TableProps = {
  fields: Field[];
  onAddRow?: () => void;
};

const badgerFieldTypeOptions: readonly Option[] = [
  { id: "text", label: "Text" },
  { id: "number", label: "Number" },
  { id: "picklist", label: "Picklist" },
  { id: "address", label: "Address" },
  { id: "datetime", label: "Datetime" },
  { id: "lookup", label: "Lookup" },
] as const;

export const Table: React.FC<TableProps> = ({ fields, onAddRow }) => {
  return (
    <>
      <TableContainer component={Paper}>
        <MuiTable sx={{ minWidth: 650 }} aria-label="field mapping table">
          <TableHead>
            <TableRow>
              <TableCell>Badger Label</TableCell>
              <TableCell>Badger API Name</TableCell>
              <TableCell>Badger Field Type</TableCell>
              <TableCell>CRM API Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fields.map((field, index) => (
              <TableRow key={field.id}>
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
              </TableRow>
            ))}
          </TableBody>
        </MuiTable>
      </TableContainer>
      <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
        <Button variant="contained" color="primary" onClick={onAddRow}>
          Add Row
        </Button>
      </Box>
    </>
  );
};
