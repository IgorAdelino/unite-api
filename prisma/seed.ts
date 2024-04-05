import { prisma } from "../src/lib/prisma"

async function seed(){
  await prisma.event.create({
    data: {
      id: 'b542000a-3ed6-4910-90b1-147c11828f3a',
      title: 'Unite Summit',
      slug: 'unite-summit',
      details: 'Um evento para devs!',
      maximumAttendees: 120
    }
  })
}

seed().then(() => {
  console.log('Database Seeded!')
  prisma.$disconnect()
})