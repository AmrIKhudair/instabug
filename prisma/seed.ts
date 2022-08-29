import { PrismaClient } from '@prisma/client'
import { generateId } from '../lib/database'
import casual from 'casual'

const prisma = new PrismaClient()

const action_names = ['incident.create_succeeded', 'user.invited_teammate', 'user.login_succeeded', 'user.searched_activity_log_events']

const count = Math.floor(50 * Math.random()) + 1

async function seed () {
    for (let i = 0; i < count; i++) {
        const action_name = action_names[Math.floor(action_names.length * Math.random())]

        await prisma.event.create({
            data: {
                id: generateId('evt'),
                actor_id: generateId('user'),
                actor_name: casual.name,
                group: casual.domain,
                action: {
                    connectOrCreate: {
                        where: {
                            name: action_name
                        },
                        create: {
                            id: generateId('evt_action'),
                            name: action_name
                        }
                    }
                },
                target_id: generateId('user'),
                target_name: casual.name,
                location: casual.ip,
                occured_at: casual.date("YYYY-MM-DDTHH:MM:SSZ"),
                metadata: {
                    redirect: casual.url,
                    description: casual.short_description,
                    x_request_id: generateId('req')
                }
            }
        })
    }
}

seed()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
