import dbConnect from "@/db/config/connections";
import { Trip } from "@/db/model";
import { authMiddleware } from "@/utils/auth";

export const config = {
    api: {
        externalResolver: true,
    },
}

export default async function handler(req, res) {
    await dbConnect();

    authMiddleware(req, res, async () => {
        switch (req.method) {
            case 'GET':
                try {
                    const trip = await Trip.findById(req.query.id)
                    if (!trip) {
                        return res.status(404).json({ message: 'No trip found' })
                    }

                    res.status(200).json(trip)

                } catch (err) {
                    console.log(err);
                    res.status(500).json({ message: 'Internal Server Error' })
                }
                break;

            default:
                break;
        }
    })
}