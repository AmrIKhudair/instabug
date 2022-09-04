import { createChannel, createSession, Session } from "better-sse"
import { NextApiRequest, NextApiResponse } from "next"

const sessions: { req: NextApiRequest, session: Session }[] = []

export async function session(req: NextApiRequest, res: NextApiResponse) {
    const session = await createSession(req, res)
    session.on('disconnected', () => sessions.splice(sessions.findIndex(entry => entry.session === session), 1))
    sessions.push({ req, session })
}

export function broadcast(handler: (req: NextApiRequest) => any, eventName = 'message') {
    sessions.forEach(async ({ req, session }) => {
        const data = await handler(req)
        if (data) session.push(data, eventName)
    })
}