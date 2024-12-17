import { z } from "zod";
import { OpenAPIRoute } from "chanfana";

export class ChangeCreatedEvent extends OpenAPIRoute {
  responses = {
    "200": {
      description: "Event successfully registered",
      content: {
        "application/json": {
          schema: z.object({
            series: z.object({
              success: z.boolean(),
              result: z.object({
                context: z.object({
                  id: z.string(),
                  title: z.string(),
                  description: z.string(),
                  created_at: z.string(),
                  updated_at: z.string(),
                }),
              }),
            }),
          }),
        },
      }, // content
    }, // success,
    "500": {
      description: "Internal Server Error",
      content: {
        "application/json": {}
      } // error
    } // responses

  // we don't actually know what we will get as incoming data, so we need to be very accepting of the payload
  async handle(c) {
      const body = await c.req.parseBody();
      const headers = c.req.header(); // gets all headers in lower case


    }
  } // class
