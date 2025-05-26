import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ObjectParameters, ObjectParametersSchema } from "./ObjectParameters";
import { Field } from "../FieldsManagement/Field";

export type SelectableField = {
  id: string;
  label: string;
};

export const useObjectParametersController = (availableFields?: Field[]) => {
  const availableTitles: SelectableField[] = (availableFields || [])
    .filter(({ badgerLabel }) => badgerLabel && badgerLabel.trim().length > 0)
    .map(({ id, badgerLabel }) => ({
      id,
      label: badgerLabel,
    }));

  const methods = useForm<ObjectParameters>({
    mode: "all",
    resolver: zodResolver(ObjectParametersSchema),
  });

  return {
    availableTitles,
    availableSubtitles: availableTitles,
    methods,
  };
};
