export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const location = req.query.location.split(' ').join('%20')
            // console.log('LOCATION: ', location);
            console.log(req.query);
            const response = await fetch(`${process.env.YELP_ENDPOINT_LOCATION}${location}${process.env.YELP_TERM}${req.query.term}`,
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
