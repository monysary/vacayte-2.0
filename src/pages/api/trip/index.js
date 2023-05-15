import dbConnect from "@/db/config/connections";
import { User, Trip } from "@/db/model";
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
                    const trips = await Trip.find({ owner: req.user._id })
                    if (!trips) {
                        return res.status(500).json({ message: 'There are no trips' })
                    }

                    res.status(200).json(trips)

                } catch (err) {
                    console.log(err);
                    res.status(500).json('Invalid request')
                }
                break;

            case 'POST':
                try {
                    const newTrip = await Trip.create({ ...req.body, owner: req.user._id })
                    if (!newTrip) {
                        return res.status(500).json({ message: 'Incorrect request' })
                    }
                    await User.findByIdAndUpdate(req.user._id, { $push: { trips: newTrip._id } })

                    res.status(200).json(newTrip)

                } catch (err) {
                    console.log(err);
                    res.status(500).json({ message: 'Invalid request' })
                }
                break;
            case 'DELETE':
                try {
                    const deletedTrip = await Trip.findByIdAndDelete(req.query._id)
                    if (!deletedTrip) {
                        return res.status(500).json({ message: 'Trip does not exist' })
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
                    res.status(500).json({ message: 'Invalid request' })
                }
                break;

            default:
                res.status(400).json({ message: 'Invalid request' })
                break;
        }
    })
}