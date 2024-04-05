import {
  generateSlug
} from "./chunk-OZPQQBEZ.mjs";
import {
  BadRequest
} from "./chunk-JRO4E4TH.mjs";
import {
  prisma
} from "./chunk-JV6GRE7Y.mjs";

// src/routes/create-event.ts
import { z } from "zod";
async function createEvent(app) {
  app.withTypeProvider().post("/events", {
    schema: {
      summary: "Create a new event",
      tags: ["Events"],
      body: z.object({
        title: z.string().min(3),
        details: z.string().nullable(),
        maximumAttendees: z.number().int().positive().nullable()
      }),
      response: {
        201: z.object({
          eventId: z.string().uuid()
        })
      }
    }
  }, async (request, reply) => {
    const {
      title,
      details,
      maximumAttendees
    } = request.body;
    const slug = generateSlug(title);
    const eventAlreadyExists = await prisma.event.findUnique({
      where: {
        slug
      }
    });
    if (eventAlreadyExists) {
      throw new BadRequest("Event already exists");
    }
    const event = await prisma.event.create({ data: {
      title,
      details,
      maximumAttendees,
      slug
    } });
    return reply.status(201).send({
      eventId: event.id
    });
  });
}

export {
  createEvent
};
