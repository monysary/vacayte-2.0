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
                    return res.status(404).json({ message: 'There are no users' })
                }

                res.status(200).json(users)

            } catch (err) {
                console.log(err);
                res.status(500).json({ message: 'Invalid request' })
            }
            break;

        case 'POST':
            try {
                const user = await User.findOne({
                    username: req.body.username,
                })
                if (!user) {
                    return res.status(400).json({ message: 'Username or password is incorrect' })
                }

                const password = await user.isCorrectPassword(req.body.password)

                if (!password) {
                    return res.status(400).json({ message: 'Username or password is incorrect' })
                }
                
                const token = signToken(user);

                res.status(200).json({ token, user })

            } catch (err) {
                console.log(err);
                res.status(500).json({ message: 'Invalid request' })
            }
            break;

        default:
            res.status(400).json({ message: 'Invalid request' })
            break;
    }
}