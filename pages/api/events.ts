import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, Event, EventAction } from '@prisma/client'
import { generateId, getEventQuery } from '../../lib/database'

interface EventCreateRequest {
    actor_id: string,
    actor_name: string,
    group: string,
    action_name: string,
    target_id: string,
    target_name: string,
    location: string,
    occured_at: string,
    metadata: {
        [key: string]: any
    }
}

const prisma = new PrismaClient()
const ITEMS_PER_PAGE = 10

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
        const query = getEventQuery(req.query)
        const page = +(req.query.page as string) || 1

        query.take = ITEMS_PER_PAGE;
        query.skip = (page - 1) * ITEMS_PER_PAGE

        const events = await prisma.event.findMany(query) as Array<Event & {action: EventAction}>
        let hasMore = false

        if (events.length) {
            const last = events[events.length - 1].id 
            hasMore = events.length === ITEMS_PER_PAGE && await prisma.event.count({ orderBy: query.orderBy, where: query.where }) > page * ITEMS_PER_PAGE
        }

        const eventsJson = events.map(event => ({
            id: event.id,
            object: 'event',
            actor_id: event.actor_id,
            actor_name: event.actor_name,
            group: event.group,
            action: {
                id: event.action.id,
                object: 'event_action',
                name: event.action.name
            },
            target_id: event.target_id,
            target_name: event.target_name,
            location: event.location,
            occured_at: event.occured_at,
            metadata: event.metadata
        }))

        res.json({
            events: eventsJson,
            hasMore,
        })

        break;

    case 'POST':
        const data = req.body as EventCreateRequest;

        const event = prisma.event.create({
            data: {
                id: generateId('evt'),
                actor_id: data.actor_id,
                actor_name: data.actor_name,
                group: data.group,
                action: {
                    connectOrCreate: {
                        where: {
                            name: data.action_name
                        },
                        create: {
                            id: generateId('evt_action'),
                            name: data.action_name
                        }
                    }
                },
                target_id: data.target_id,
                target_name: data.target_name,
                location: data.location,
                occured_at: data.occured_at,
                metadata: data.metadata
            }
        })

        res.statusCode = 201
        res.json(event)
        break;

    default:
        res.statusCode = 404
        res.send('Not Found')
  }
}
