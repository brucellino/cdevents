import { DateTime, Str } from "chanfana";
import { z } from "zod";

export const Task = z.object({
  name: Str({ example: "lorem" }),
  slug: Str(),
  description: Str({ required: false }),
  completed: z.boolean().default(false),
  due_date: DateTime(),
});

export const repository = z.object({
  id: Str({ example: "hashi-at-home/hashiatohome" }),
})
