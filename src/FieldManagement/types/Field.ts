import { z } from "zod";

export const BaseFieldSchema = z.object({
  id: z.string().min(1),
  badgerLabel: z.string().min(1, { message: "Required" }),
  badgerAPIName: z.string().min(1, { message: "Required" }),
  badgerFieldType: z.enum([
    "text",
    "number",
    "picklist",
    "address",
    "datetime",
    "lookup",
  ]),
  crmAPIName: z.string().min(1, { message: "Required" }),
  bridgeFieldType: z.enum(["string", "number", "boolean"]),
  isMandatory: z.boolean(),
  isViewOnly: z.boolean(),
  type: z.enum([
    "text",
    "numeric",
    "address",
    "datetime",
    "picklist",
    "lookup",
  ]),
});

export const TextField = BaseFieldSchema.extend({
  type: z.literal("text"),
  isTextArea: z.boolean(),
});

export const NumericField = BaseFieldSchema.extend({
  type: z.literal("numeric"),
  decimals: z.number(),
});

export const AddressField = BaseFieldSchema.extend({
  type: z.literal("address"),
  isMain: z.boolean(),
  bridgeAddressFields: z.object({
    city: z.string(),
  }),
  accuracy: z.enum(["ROOFTOP", "RANGE_INTERPOLATED"]),
});

export const DatetimeField = BaseFieldSchema.extend({
  type: z.literal("datetime"),
});

export const PicklistField = BaseFieldSchema.extend({
  type: z.literal("picklist"),
  picklistValues: z.object({
    city: z.string(),
  }),
});

export const LookUpField = BaseFieldSchema.extend({
  type: z.literal("lookup"),
  relatedObjects: z.array(z.string().min(1)).min(1),
});

export const FieldSchema = z.discriminatedUnion("type", [
  TextField,
  NumericField,
  AddressField,
  DatetimeField,
  PicklistField,
  LookUpField,
]);

export type Field = z.infer<typeof FieldSchema>;

export const defaultValues: Field = {
  id: "field_" + Math.random().toString(36).substring(2, 15),
  badgerLabel: "",
  badgerAPIName: "",
  badgerFieldType: "text",
  crmAPIName: "",
  bridgeFieldType: "string",
  isMandatory: false,
  isViewOnly: false,
  type: "text",
  isTextArea: false,
};
