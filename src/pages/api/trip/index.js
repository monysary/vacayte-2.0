import dbConnect from "@/db/config/connections";
import { User, Trip, Itinerary } from "@/db/model";
import { authMiddleware } from "@/utils/auth";
import { getDateRange } from "@/utils/helpers";

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
                    const trips = await Trip.find({ owner: req.user._id })
                    if (!trips) {
                        return res.status(404).json({ message: 'No trips found' })
                    }

                    res.status(200).json(trips)

                } catch (err) {
                    console.log(err);
                    res.status(500).json({ message: 'Internal Server Error' })
                }
                break;

            case 'POST':
                try {
                    const newItinerary = await Itinerary.create({})
                    if (!newItinerary) {
                        return res.status(500).json({ message: 'Internal Server Error' })
                    }

                    const newTrip = await Trip.create({
                        ...req.body,
                        itinerary: newItinerary._id,
                        owner: req.user._id,
                    })
                    if (!newTrip) {
                        return res.status(500).json({ message: 'Internal Server Error' })
                    }

                    const tripStartDate = newTrip.startDate
                    const tripEndDate = newTrip.endDate
                    const dateRange = getDateRange(tripStartDate, tripEndDate)
                    dateRange.map((date) => {
                        newItinerary.itinerary.push({ date, dailyActivities: [] })
                    })
                    await newItinerary.save()

                    const updatedUser = await User.findByIdAndUpdate(req.user._id, { $push: { trips: newTrip._id } })
                    if (!updatedUser) {
                        return res.status(500).json({ message: 'Internal Server Error' })
                    }

                    res.status(200).json(newTrip)

                } catch (err) {
                    console.log(err);
                    res.status(500).json({ message: 'Internal Server Error' })
                }
                break;
            case 'DELETE':
                try {
                    const deletedTrip = await Trip.findByIdAndDelete(req.query._id)
                    if (!deletedTrip) {
                        return res.status(400).json({ message: 'Trip does not exist' })
                    }

                    const updatedUser = await User.findByIdAndUpdate(req.user._id, {
                        $pull: { trips: req.query._id },
                        new: true
                    }
                    ).populate('trips')
                    if (!updatedUser) {
                        return res.status(500).json({ message: 'User does not have this trip' })
                    }

                    res.status(200).json(updatedUser)

                } catch (err) {
                    console.log(err);
                    res.status(500).json({ message: 'Internal Server Error' })
                }
                break;

            default:
                res.status(400).json({ message: 'Invalid request' })
                break;
        }
    })
}