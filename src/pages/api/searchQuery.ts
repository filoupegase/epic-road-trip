// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'


type Data = {
    location_id: string
    name: string
    address_obj: object
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    res.status(200).json(
        {
            location_id: "8307588",
            name: "Les Halles de Niort",
            address_obj: {
                street1: "1 Place des Halles",
                street2: "Halles Couvertes",
                city: "Niort",
                country: "France",
                postalcode: "79000",
                address_string: "1 Place des Halles Halles Couvertes, 79000, Niort France"
            }
        }
    )
}
