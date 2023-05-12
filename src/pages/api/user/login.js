import dbConnect from "@/db/config/connections";
import { User } from "@/db/model";
import { signToken } from "@/utils/auth";

export default async function handler(req, res) {
    await dbConnect();

    switch (req.method) {
        case 'GET':
            try {
                const users = await User.find({})

                if (!users) {
                    res.status(500).json({ message: 'There are no users' })
                    return
                }

                res.status(200).json(users)

            } catch (err) {
                console.log(err);
                res.status(400).json({ message: 'Invalid request' })
            }
            break;

        case 'POST':
            try {
                const user = await User.findOne({
                    username: req.body.username,
                })

                if (!user) {
                    res.status(500).json({ message: 'Incorrect username' })
                    return
                }

                const password = user.isCorrectPassword(req.body.password)

                if (!password) {
                    res.status(500).json({ message: 'Incorrect password' })
                    return
                }

                const token = signToken(user);

                res.status(200).json({ token, user })

            } catch (err) {
                console.log(err);
                res.status(400).json({ message: 'Invalid request' })
            }
            break;

        default:
            res.status(400).json({ message: 'Invalid request' })
            break;
    }
}