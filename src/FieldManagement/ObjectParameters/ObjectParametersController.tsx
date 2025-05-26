import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { ObjectParameters, ObjectParametersSchema } from "./ObjectParameters";
import { Field } from "../FieldsManagement/Field";

export type SelectableField = {
  id: string;
  label: string;
};

export const useObjectParametersController = (availableFields: Field[]) => {
  const availableTitles: SelectableField[] = availableFields
    .filter(({ badgerLabel }) => badgerLabel && badgerLabel.trim().length > 0)
    .map(({ id, badgerLabel }) => ({
      id,
      label: badgerLabel,
    }));

  const methods = useForm<ObjectParameters>({
    mode: "all",
    resolver: zodResolver(ObjectParametersSchema),
  });

  const { setValue, getValues } = methods;

  useEffect(() => {
    const availableIds = new Set(availableFields.map((field) => field.id));
    const currentValues = getValues();

    const updateValues = (property: "titles" | "subtitles") => {
      if (currentValues[property]) {
        const validValues = currentValues[property].filter((id) =>
          availableIds.has(id)
        );
        if (validValues.length !== currentValues[property].length) {
          setValue(property, validValues, { shouldValidate: true });
        }
      }
    };

    updateValues("titles");
    updateValues("subtitles");
  }, [availableFields, setValue, getValues]);

  return {
    availableTitles,
    availableSubtitles: availableTitles,
    methods,
  };
};
