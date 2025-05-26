export type SelectedField = { id: string; label: string };

import { z } from "zod";

export const ObjectParametersSchema = z.object({
  titles: z
    .array(z.string().min(1))
    .min(1, { message: "At least one title is required." }),
  subtitles: z.array(z.string().min(1)).optional(),
});

export type ObjectParameters = z.infer<typeof ObjectParametersSchema>;
