import { PrismaClient } from '@prisma/client'
import { generateId } from '../lib/database'
import casual from 'casual'
import { ActionNames } from '../types/ActionNames'

const prisma = new PrismaClient()

const action_names = Object.values(ActionNames)

const count = Math.floor(50 * Math.random()) + 1

async function seed () {
    for (let i = 0; i < count; i++) {
        const action_name = action_names[Math.floor(action_names.length * Math.random())]

        const metadata = { 
            redirect: casual.url,
            description: casual.short_description,
            x_request_id: generateId('req'),
            action_args: {} as { [key: string]: string },
            actor_icon: '',
            target_icon: ''
        }

        switch (action_name) {
            case ActionNames.PrioritySet:
                metadata.action_args.new_value = casual.name
            case ActionNames.StatusChanged:
            case ActionNames.NameUpdated:
                metadata.action_args.old_value = casual.name
                break

            case ActionNames.Assigned:
                metadata.target_icon = '//via.placeholder.com/22'
                break
            
            case ActionNames.Created:
                metadata.actor_icon = '//via.placeholder.com/22'
                break 
        }

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
                metadata
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
