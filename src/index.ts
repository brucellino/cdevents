import { Hono, HonoRequest } from 'hono';
import { HmacSHA256, enc } from 'crypto-js';

const app = new Hono();

// handleEvent is a function which parses the payload of the webhook and decides what kind of event it is
async function handleEvent(payload: any) {
  console.log(payload);
}

app.get('/', (c) => {
  return c.text("CD Events on Cloudflare")
})

app.post('/webhooks/github', async (c) => {
  const signingSecret = c.env.GITHUB_WEBHOOK_SECRET;

  if (!signingSecret) {
    return c.json({ error: 'Webhook signing secret not set' }, 500);
  }

  // get the gihtub signature from the headers
  const signature = c.req.header('X-Hub-Signature-256');
  // get the body, and then compute the signed hash
  const body = await c.req.text();
  const computedSignature = HmacSHA256(body, signingSecret).toString(enc.Hex);

  //github adds a "sha256=" to the signature, so we need to remove that
  const expectedSignature = signature.replace('sha256=', '');
  if (computedSignature !== expectedSignature) {
    return c.json({ error: 'Webhook signature verification failed' }, 401);
  }

  const subscribedEvents = await c.env.cloud_events_brucellino.get("allowed_events");
  console.log(subscribedEvents);
  return c.json({ message: 'Webhook received!' }, 200);

});

export default app;
