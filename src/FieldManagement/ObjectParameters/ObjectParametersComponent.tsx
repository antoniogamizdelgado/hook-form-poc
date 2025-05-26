import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import { ObjectParameters } from "./ObjectParameters";
import { SelectableField } from "./ObjectParametersController";
import { PicklistField } from "../common/PicklistField";
import { Option } from "../common/Option";

type ObjectParametersComponentProps = {
  availableTitles: SelectableField[];
  availableSubtitles: SelectableField[];
};

export const ObjectParametersComponent: React.FC<
  ObjectParametersComponentProps
> = ({ availableTitles, availableSubtitles }) => {
  const titleOptions: Option[] = availableTitles.map((field) => ({
    id: field.id,
    label: field.label,
  }));

  const subtitleOptions: Option[] = availableSubtitles.map((field) => ({
    id: field.id,
    label: field.label,
  }));

  return (
    <Box sx={{ mt: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Object Parameters
        </Typography>

        <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
          <Box sx={{ minWidth: 300 }}>
            <PicklistField<ObjectParameters>
              name="titles"
              options={titleOptions}
              label="Titles"
              multiple
            />
          </Box>

          <Box sx={{ minWidth: 300 }}>
            <PicklistField<ObjectParameters>
              name="subtitles"
              options={subtitleOptions}
              label="Subtitles"
              multiple
            />
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};
