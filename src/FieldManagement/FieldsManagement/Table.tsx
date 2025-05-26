import React from "react";
import {
  Table as MuiTable,
  TableRow as RowMui,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Paper,
  Button,
  Box,
} from "@mui/material";
import { Field } from "./Field";
import { TableRow } from "./TableRow";
import { Handlers } from "./FieldsController";

type TableProps = {
  fields: Field[];
  handlers: Handlers;
};

export const Table: React.FC<TableProps> = ({ fields, handlers }) => {
  return (
    <>
      <TableContainer component={Paper}>
        <MuiTable sx={{ minWidth: 650 }} aria-label="field mapping table">
          <TableHead>
            <RowMui>
              <TableCell>Badger Label</TableCell>
              <TableCell>Badger API Name</TableCell>
              <TableCell>Badger Field Type</TableCell>
              <TableCell>CRM API Name</TableCell>
              <TableCell>Mandatory</TableCell>
              <TableCell>View only</TableCell>
              <TableCell>Actions</TableCell>
            </RowMui>
          </TableHead>
          <TableBody>
            {fields.map((field, index) => (
              <TableRow
                fieldId={field.id}
                key={field.id}
                index={index}
                handlers={handlers.rowHandlers}
              />
            ))}
          </TableBody>
        </MuiTable>
      </TableContainer>
      <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handlers.handleAddRow}
        >
          Add Row
        </Button>
      </Box>
    </>
  );
};
