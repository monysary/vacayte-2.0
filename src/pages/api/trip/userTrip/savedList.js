import dbConnect from "@/db/config/connections";
import { Trip } from "@/db/model";
import { authMiddleware } from "@/utils/auth";

export const config = {
    api: {
        externalResolver: true,
    },
}

export default async function handler(req, res) {
    await dbConnect()

    authMiddleware(req, res, async () => {
        if (req.method === 'GET') {
            try {
                const trip = await Trip.findById(req.query._id)
                if (!trip) {
                    return res.status(404).json({ message: 'Trip not found' })
                }

                const savedList = await trip.activities.map((activity) => {
                    return activity.saved.map((yelp) => yelp.businessID).join(',')
                }).join(',').split(',')
                if (!savedList) {
                    return res.status(500).json({ message: 'Saved list not found' })
                }

                res.status(200).json(savedList)

            } catch (err) {
                console.log(err);
                res.status(500).json({ message: 'Internal Server Error' })
            }
        } else {
            res.status(400).json({ message: 'Invalid Request' })
        }
    })
}