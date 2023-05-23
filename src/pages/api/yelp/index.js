export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const response = await fetch(`${process.env.YELP_ENDPOINT_LOCATION}los%20angeles,ca${process.env.YELP_TERM}bars`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${process.env.YELP_APIKEY}`
                    },

                }
            )
            const data = await response.json()

            res.status(200).json(data)

        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Internal Server Error' })
        }
    } else {
        res.status(400).json({ message: 'Invalid request' })
    }
}
