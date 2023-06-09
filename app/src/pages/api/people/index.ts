import type { NextApiRequest, NextApiResponse } from 'next'
import { people } from '@/data';
import { Person } from "@/interface";


export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Person[]>
) {
    return res.status(200).json(people)
}
