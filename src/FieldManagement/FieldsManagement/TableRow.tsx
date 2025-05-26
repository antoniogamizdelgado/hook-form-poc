import React from "react";
import {
  TableCell,
  TableRow as TableRowMui,
  IconButton,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { BadgerTextField } from "../common/TextField";
import { PicklistField } from "../common/PicklistField";
import { Option } from "../common/Option";
import { BadgerCheckbox } from "../common/Checkbox";
import { FieldsValues, RowHandlers } from "./FieldsController";

export type Props = {
  fieldId: string;
  index: number;
  handlers: RowHandlers;
  totalFields: number;
};

const badgerFieldTypeOptions: readonly Option[] = [
  { id: "text", label: "Text" },
  { id: "number", label: "Number" },
  { id: "picklist", label: "Picklist" },
  { id: "address", label: "Address" },
  { id: "datetime", label: "Datetime" },
  { id: "lookup", label: "Lookup" },
] as const;

export const TableRow: React.FC<Props> = ({
  fieldId,
  index,
  handlers,
  totalFields,
}) => {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("text/plain", index.toString());
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const fromIndex = parseInt(e.dataTransfer.getData("text/plain"));
    const toIndex = index;
    handlers.handleReorder(fromIndex, toIndex);
  };

  return (
    <TableRowMui
      key={fieldId}
      draggable
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      sx={{
        "&:hover": {
          backgroundColor: "action.hover",
        },
        '&[draggable="true"]': {
          cursor: "move",
        },
      }}
    >
      <TableCell>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 0.5,
          }}
        >
          <DragIndicatorIcon
            sx={{
              color: "action.active",
              cursor: "grab",
              "&:active": {
                cursor: "grabbing",
              },
            }}
          />
          <IconButton
            size="small"
            onClick={() => handlers.handleMoveUp(index)}
            disabled={index === 0}
            aria-label="Move field up"
          >
            <KeyboardArrowUpIcon />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handlers.handleMoveDown(index)}
            disabled={index === totalFields - 1}
            aria-label="Move field down"
          >
            <KeyboardArrowDownIcon />
          </IconButton>
        </Box>
      </TableCell>
      <TableCell>
        <BadgerTextField<FieldsValues>
          name={`fields.${index}.badgerLabel` as const}
          label="Badger Label"
        />
      </TableCell>
      <TableCell>
        <BadgerTextField<FieldsValues>
          name={`fields.${index}.badgerAPIName` as const}
          label="Badger API Name"
        />
      </TableCell>
      <TableCell>
        <PicklistField<FieldsValues>
          name={`fields.${index}.badgerFieldType` as const}
          options={badgerFieldTypeOptions}
          label="Badger Field Type"
        />
      </TableCell>
      <TableCell>
        <BadgerTextField<FieldsValues>
          name={`fields.${index}.crmAPIName` as const}
          label="CRM API Name"
        />
      </TableCell>
      <TableCell>
        <BadgerCheckbox<FieldsValues>
          name={`fields.${index}.isMandatory` as const}
          onCustomChange={(value) =>
            handlers.handleMandatoryChange(index, value)
          }
        />
      </TableCell>
      <TableCell>
        <BadgerCheckbox<FieldsValues>
          name={`fields.${index}.isViewOnly` as const}
          onCustomChange={(value) =>
            handlers.handleViewOnlyChange(index, value)
          }
        />
      </TableCell>
      <TableCell>
        <IconButton
          color="error"
          onClick={() => handlers.handleRemoveRow(index)}
          aria-label="Remove field"
        >
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRowMui>
  );
};
