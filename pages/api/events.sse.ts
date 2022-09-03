import { NextApiRequest, NextApiResponse } from "next"
import { createSession } from "better-sse"
import channel from '../../services/sse'

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    channel.register(await createSession(req, res))
}