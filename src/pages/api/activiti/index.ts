// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { activities } from '@/data';
import { Activities } from "@/interface";


export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Activities[]>
) {
    // @ts-ignore
    return res.status(200).json(activities)
}
