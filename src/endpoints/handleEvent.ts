import { Bool, OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { HTTP } from "cloudevents";

// HandleEvent is a class that receives payloads, verifies that they are
// conformant to the CD Event schema by checking the headers
// The cloud event context is stored in the header.
// The data in the body must contain the "context" and "subject" fields.
export class HandleGitHubWebhook extends OpenAPIRoute { }
