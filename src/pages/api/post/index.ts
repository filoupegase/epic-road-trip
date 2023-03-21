import type { NextApiRequest, NextApiResponse } from 'next'


const comments: object[] = []

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<object>
) {
    if (req.method === 'GET') {
        res.status(200).json(comments);
    } else if (req.method === 'POST') {
        const value = req.body.value;
        const newValue = {
            query: value
        }
        comments.push(newValue)
        res.status(201).json(newValue)
    }
}
