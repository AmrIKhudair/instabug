import { NextApiRequest, NextApiResponse } from "next"
import { createSession } from "better-sse"
import { session } from '../../services/sse'

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    session(req, res)
}