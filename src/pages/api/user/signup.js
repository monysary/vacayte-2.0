import dbConnect from "@/db/config/connections";
import { User } from "@/db/model";
import { signToken } from "@/utils/auth";

export default async function handler(req, res) {
    await dbConnect();

    if (req.method === 'POST') {
        try {
            const username = await User.findOne({ username: req.body.username })
            const email = await User.findOne({ email: req.body.email })

            if (username || email) {
                res.status(500).json({ message: 'User already exists' })
                return;
            }

            const newUser = await User.create(req.body)

            if (!newUser) {
                res.status(500).json({ message: 'Incorrect request' })
            }

            const token = signToken(newUser)

            res.status(200).json({ token, newUser })

        } catch (err) {
            console.log(err);
            res.status(400).json(err)
        }
    } else {
        res.status(400).json({ message: 'Invalid request' })
    }
};