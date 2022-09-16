import { Event, EventAction, Prisma, PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";


const prisma = new PrismaClient

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const events = await prisma.event.findMany({
        include: {
            action: true
        },
        orderBy: {
            occured_at: 'desc'
        }
    }) as (Event & {action: EventAction})[]


    const eventsJson = events.map(event => {
        const metadata = event.metadata as {[key: string]: Prisma.JsonValue}
        return {
            id: event.id,
            actor_name: event.actor_name,
            actor_icon: metadata.actor_icon || '',
            action_name: event.action.name,
            action_args: metadata.action_args as { [key: string]: string} || {},
            target_name: event.target_name,
            target_icon: metadata.target_icon || '',  
            occured_at: event.occured_at,
        }
    })

    res.json(eventsJson);
}