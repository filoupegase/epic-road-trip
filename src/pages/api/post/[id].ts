import { NextApiRequest, NextApiResponse } from "next";
import { Person, ResponseError } from "@/interface";


export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<string | string[] | undefined | ResponseError>
) {
    const { query } = req
    const { id } = query

    res.status(200).json(id)
}
