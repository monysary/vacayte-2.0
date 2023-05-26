import dbConnect from "@/db/config/connections";
import { Trip, Itinerary } from "@/db/model";
import { authMiddleware } from "@/utils/auth";

export const config = {
    api: {
        externalResolver: true,
    },
}

export default async function handler(req, res) {
    await dbConnect()

    authMiddleware(req, res, async () => {
        switch (req.method) {
            case 'GET':
                try {


                } catch (err) {
                    console.log(err);
                    res.status(500).json({ message: 'Internal Server Error' })
                }
                break;

            case 'POST':
                try {
                    const trip = await Trip.findById(req.body.id)
                    if (!trip) {
                        return res.status(404).json({ message: 'Trip not found' })
                    }

                    const updatedItinerary = await Itinerary.findById(trip.itinerary)
                    if (!updatedItinerary) {
                        return res.status(500).json({ message: 'Internal Server Error' })
                    }

                    updatedItinerary.itinerary.push({

                    })

                } catch (err) {
                    console.log(err);
                    res.status(500).json({ message: 'Internal Server Error' })
                }
                break;

            default:
                res.status(400).json({ message: 'Invalid Request' })
                break;
        }
    })
}