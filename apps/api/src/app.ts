import cors from "@fastify/cors";
import Fastify from "fastify";
import { healthRoutes } from "./routes/health.js";

export function buildApp() {
  const app = Fastify({ logger: true });

  app.register(cors, { origin: true });
  app.register(healthRoutes);

  return app;
}
