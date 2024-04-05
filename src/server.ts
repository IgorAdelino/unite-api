import fastify from "fastify";

import fastifySwagger from "@fastify/swagger";

import fastifySwaggerUi from "@fastify/swagger-ui";
import { jsonSchemaTransform, serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import { checkIn } from "./routes/check-in";
import { createEvent } from "./routes/create-event";
import { getAteendeeBadge } from "./routes/get-attendee-badge";
import { getEvent } from "./routes/get-event";
import { getEventAttendees } from "./routes/get-event-attendees";
import { registerForEvent } from "./routes/register-for-event";


export const app = fastify();

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
})

app.register(fastifySwaggerUi, {
  routePrefix: "/docs",
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(createEvent)
app.register(registerForEvent)
app.register(getEvent)
app.register(getAteendeeBadge)
app.register(checkIn)
app.register(getEventAttendees)

app.listen({ port: 3333 }).then(() => {
  console.log("Server listening on port 3000");
})