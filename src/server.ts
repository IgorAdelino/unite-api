import fastify from "fastify";
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import { checkIn } from "./routes/check-in";
import { createEvent } from "./routes/create-event";
import { getAteendeeBadge } from "./routes/get-attendee-badge";
import { getEvent } from "./routes/get-event";
import { getEventAttendees } from "./routes/get-event-attendees";
import { registerForEvent } from "./routes/register-for-event";


export const app = fastify();

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