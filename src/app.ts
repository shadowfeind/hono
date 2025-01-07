import { OpenAPIHono } from "@hono/zod-openapi";
import type { PinoLogger } from "hono-pino";
import { pinoLogger } from "hono-pino";
import PinoPretty from "pino-pretty";
import { notFound, onError } from 'stoker/middlewares';

type AppBinding = {
  Variables: {
    logger: PinoLogger
  }
}

const app = new OpenAPIHono<AppBinding>();
app.use(
  pinoLogger({
    pino: PinoPretty()
  }),
)

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("health-check", (c) => {
  return c.json({ status: "OK", message: "Working fine" });
});

app.get("/error", c => {
  c.var.logger.error("")
  throw new Error("kek error")
})

app.notFound(notFound)
app.onError(onError)

export default app;
