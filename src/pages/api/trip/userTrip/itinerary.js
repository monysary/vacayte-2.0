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
                    const trip = await Trip.findById(req.query._id)
                    if (!trip) {
                        return res.status(404).json({ message: 'Trip not found' })
                    }

                    const itinerary = await Itinerary.findById(trip.itinerary)
                    if (!itinerary) {
                        return res.status(500).json({ message: 'Internal Server Error' })
                    }

                    res.status(200).json(itinerary)

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

                    const updatedItinerary = await Itinerary.findById(trip.itinerary)
                    if (!updatedItinerary) {
                        return res.status(500).json({ message: 'Internal Server Error' })
                    }

                    const itineraryIndex = updatedItinerary.itinerary.findIndex((item) => new Date(item.date).toISOString() === new Date(req.body.date).toISOString())
                    if (!itineraryIndex) {
                        return res.status(404).json({ message: 'Itinerary date not found' })
                    }
                    updatedItinerary.itinerary[itineraryIndex].dailyActivities.push({
                        businessID: req.body.businessID,
                        time: new Date(req.body.time).toISOString()
                    })
                    await updatedItinerary.save()

                    res.status(200).json(updatedItinerary)

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

                    const updatedItinerary = await Itinerary.findById(trip.itinerary)
                    if (!updatedItinerary) {
                        return res.status(500).json({ message: 'Internal Server Error' })
                    }

                    const itineraryIndex = updatedItinerary.itinerary.findIndex((item) => new Date(item.date).toISOString() === new Date(req.query.date).toISOString())
                    if (!itineraryIndex) {
                        return res.status(404).json({ message: 'Itinerary date not found' })
                    }
                    const dailyActivitiesIndex = updatedItinerary.itinerary[itineraryIndex].dailyActivities.findIndex((item) => item.businessID === req.query.businessID)
                    if (!dailyActivitiesIndex) {
                        return res.status(404).json({ message: 'Yelp business not found' })
                    }
                    updatedItinerary.itinerary[itineraryIndex].dailyActivities.splice(dailyActivitiesIndex, 1)
                    await updatedItinerary.save()

                    res.status(200).json(updatedItinerary)

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