import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { z } from "zod"
import { prisma } from "../lib/prisma"
import { generateSlug } from "../utils/generate-slug"


export async  function createEvent(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post("/events", {
    schema: {
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
  }, async (request  ,reply) => {
  
    const {
      title,
      details,
      maximumAttendees,
    } = request.body
  
    const slug = generateSlug(title)
  
    const eventAlreadyExists = await prisma.event.findUnique({
      where: {
        slug
      }
    })
  
    if (eventAlreadyExists) {
      throw new Error("Event already exists")
    }
  
    const event = await prisma.event.create({data: {
      title,
      details,
      maximumAttendees,
      slug,
    }})
  
    return reply.status(201).send({
      eventId: event.id
    })
  })
}

