import { timeStamp } from "console";
import { z } from "zod";

export const contextSchema = z.object({
  version: z.string(),
  id: z.string().uuid(),
  source: z.string(),
  type: z.literal("dev.cdevents.pipelinerun.finished.0.2.0"),
  timestamp: z.string().datetime(),
  schemaUri: z.string().min(1).url(),
  chainId: z.string().min(1),
  links: z
    .array(
      z.object({
        target: z.string().url(),
        rel: z.string().min(1),
      }),
    )
    .optional(),
});
