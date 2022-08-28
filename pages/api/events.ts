import type { NextApiRequest, NextApiResponse } from 'next'
import { Prisma, PrismaClient, Event, EventAction } from '@prisma/client'
import { generateId } from '../../lib/database';

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
        const query: Prisma.EventFindManyArgs = { take: ITEMS_PER_PAGE, include: { action: true }, orderBy: { occured_at: 'desc' } }
        const cursor = req.query.before as string
        const q = req.query.q as string
        const actor_id = req.query.actor_id as string
        const target_id = req.query.target_id as string
        const action_id = req.query.action_id as string
        const action_name = req.query.action_name as string

        if (cursor) {
            query.cursor = { id: cursor }
            query.skip = 1
        }

        if (q) {
            if (!query.where) query.where = {}
            if (!query.where.AND) query.where.AND = []
            const AND = query.where.AND as Prisma.EventWhereInput[]

            AND.push({
                OR: [
                    { id: { equals: q }},
                    { actor_id: { equals: q } },
                    { actor_name: { contains: q, } },
                    { group: { equals: q } },
                    {
                        action: {
                            OR: [
                                { id: { equals: q } },
                                { name: { contains: q } }
                            ]
                        }
                    },
                    { target_id: { equals: q } },
                    { target_name: { contains: q } },
                ]  
            })
        }

        if (actor_id) {
            if (!query.where) query.where = {}
            if (!query.where.AND) query.where.AND = []
            const AND = query.where.AND as Prisma.EventWhereInput[]

            AND.push({ actor_id: { equals: actor_id } })
        }

        if (target_id) {
            if (!query.where) query.where = {}
            if (!query.where.AND) query.where.AND = []
            const AND = query.where.AND as Prisma.EventWhereInput[]

            AND.push({ target_id: { equals: target_id } })
        }

        if (action_id) {
            if (!query.where) query.where = {}
            if (!query.where.AND) query.where.AND = []
            const AND = query.where.AND as Prisma.EventWhereInput[]

            AND.push({ action: { id: { equals: action_id } } })
        }

        if (action_name) {
            if (!query.where) query.where = {}
            if (!query.where.AND) query.where.AND = []
            const AND = query.where.AND as Prisma.EventWhereInput[]

            AND.push({ action: { name: { equals: action_name } } })
        }

        const events = await prisma.event.findMany(query) as Array<Event & {action: EventAction}>
        let hasMore = false

        if (events.length) {
            const last = events[events.length - 1].id 
            hasMore = events.length === ITEMS_PER_PAGE && await prisma.event.count({ cursor: {id: last}, skip: 1, orderBy: query.orderBy, where: query.where }) > 0
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
            metadata: JSON.parse(event.metadata)
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
                metadata: JSON.stringify(data.metadata)
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
