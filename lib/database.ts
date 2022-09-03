import { Prisma } from "@prisma/client";
import { NextApiRequest } from "next";

export function generateId(prefix: string, length = 12) {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const id = []

    for (let i = 0; i < length; i++) {
        const index = Math.floor(length * Math.random());
        id.push(chars[index])
    }

    return prefix + '_' + id.join('')
}

export function getEventQuery(query: NextApiRequest['query']) {
    const eventQuery: Prisma.EventFindManyArgs = { include: { action: true }, orderBy: { occured_at: 'desc' } }
    const q = query.q as string
    const actor_id = query.actor_id as string
    const target_id = query.target_id as string
    const action_id = query.action_id as string
    const action_name = query.action_name as string

    if (!eventQuery.where) eventQuery.where = {}
    if (!eventQuery.where.AND) eventQuery.where.AND = []
    const AND = eventQuery.where.AND as Prisma.EventWhereInput[]

    if (q) {
        AND.push({
            OR: [
                { id: { equals: q } },
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

    if (actor_id) AND.push({ actor_id: { equals: actor_id } })
    if (target_id) AND.push({ target_id: { equals: target_id } })
    if (action_id) AND.push({ action: { id: { equals: action_id } } })
    if (action_name) AND.push({ action: { name: { equals: action_name } } })

    return eventQuery;
}