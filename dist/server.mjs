import {
  registerForEvent
} from "./chunk-ZKIL2PAB.mjs";
import {
  errorHandler
} from "./chunk-INRMCJAJ.mjs";
import {
  checkIn
} from "./chunk-IIMHHDCF.mjs";
import {
  createEvent
} from "./chunk-HMYLW7SZ.mjs";
import "./chunk-OZPQQBEZ.mjs";
import {
  getAteendeeBadge
} from "./chunk-TGTDKR7N.mjs";
import {
  getEventAttendees
} from "./chunk-QMERMKCQ.mjs";
import {
  getEvent
} from "./chunk-7KHOBGR6.mjs";
import "./chunk-JRO4E4TH.mjs";
import "./chunk-JV6GRE7Y.mjs";

// src/server.ts
import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { jsonSchemaTransform, serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
var app = fastify();
app.register(fastifyCors, {
  origin: "*"
});
app.register(fastifySwagger, {
  swagger: {
    consumes: ["application/json"],
    produces: ["application/json"],
    info: {
      title: "pass.in",
      description: "API para gerenciamento de eventos",
      version: "0.1.0"
    }
  },
  transform: jsonSchemaTransform
});
app.register(fastifySwaggerUi, {
  routePrefix: "/docs"
});
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
app.register(createEvent);
app.register(registerForEvent);
app.register(getEvent);
app.register(getAteendeeBadge);
app.register(checkIn);
app.register(getEventAttendees);
app.setErrorHandler(errorHandler);
app.listen({ port: 3333, host: "0.0.0.0" }).then(() => {
  console.log("Server listening on port 3000");
});
export {
  app
};
