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

            case 'POST':
                try {
                    const trip = await Trip.findById(req.body._id)
                    if (!trip) {
                        return res.status(404).json({ message: 'Trip not found' })
                    }

                    const activity = await trip.activities.find((item) => item.name === req.body.name)
                    if (!activity) {
                        return res.status(404).json({ message: 'Activity not found' })
                    }

                    activity.saved.push({ businessID: req.body.yelpID })
                    await trip.save()

                    res.status(200).json(trip)

                } catch (err) {
                    console.log(err);
                    res.status(500).json({ message: 'Internal Server Error' })
                }
                break;

            case 'DELETE':
                try {
                    const trip = await Trip.findById(req.query._id)
                    if (!trip) {
                        return res.status(404).json({ message: 'Trip not found' })
                    }

                    const activity = await trip.activities.find((item) => item.name === req.query.name)
                    if (!activity) {
                        return res.status(404).json({ message: 'Activity not found' })
                    }

                    const index = activity.saved.findIndex((item) => item.businessID === req.query.yelpID)
                    activity.saved.splice(index, 1)
                    await trip.save()

                    res.status(200).json(trip)

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