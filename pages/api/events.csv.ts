import { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient, Event, EventAction } from "@prisma/client"
import jsonexport from 'jsonexport'

import { getEventQuery } from "../../lib/database"

const prisma = new PrismaClient()

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    const query = getEventQuery(req.query)
    const events = await prisma.event.findMany(query) as Array<Event & {action: EventAction}>

    const eventsJson = events.map(event => ({
        id: event.id,
        actor_id: event.actor_id,
        actor_name: event.actor_name,
        group: event.group,
        action_id: event.action.id,
        action_name: event.action.name,
        target_id: event.target_id,
        target_name: event.target_name,
        location: event.location,
        occured_at: event.occured_at,
        metadata: JSON.stringify(event.metadata)
    }))

    const csv = await jsonexport(events)

    res.setHeader('Content-Type', 'text/csv')
    res.send(csv);
}