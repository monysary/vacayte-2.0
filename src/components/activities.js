import { useEffect, useState } from 'react'
import { HeartIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/20/solid'
import authService from '@/utils/authService'

export default function Activities({ activities }) {
    // Loading state
    const [loading, setLoading] = useState(false)

    // Fetch Yelp data
    const [tripActivities, setTripActivities] = useState([])
    const fetchYelpData = async (term) => {
        setLoading(true)
        try {
            const response = await fetch(`/api/yelp?location=${activities?.location}&term=${term}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': authService.getToken()
                }
            })
            const data = await response.json()

            setTripActivities((prev) => {
                if (!prev.find((object) => object.name === term)) {
                    return ([...prev, {
                        name: term,
                        yelpBusinesses: data.businesses
                    }])
                } else {
                    return ([...prev])
                }
            })
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        setTripActivities([])
        activities?.activities.map((item) => {
            fetchYelpData(item.name)
        })
    }, [activities])

    return (
        loading
            ? <h1>Loading...</h1>
            : tripActivities.map((item) => {
                return (
                    <div key={item.name} className='pb-6'>
                        <div className="md:flex md:items-center md:justify-between border-b border-gray-900/10 pb-1 mt-6">
                            <h2 className="text-2xl font-bold leading-7 text-teal-700 sm:truncate sm:text-3xl sm:tracking-tight">
                                {item.name}
                            </h2>
                        </div>
                        <div className="flex flex-row flex-nowrap items-stretch gap-4 overflow-x-auto p-2">
                            {item.yelpBusinesses.map((business) => (
                                <div
                                    key={business.name}
                                    className="flex flex-col justify-between shadow-md divide-y divide-gray-200 rounded-lg bg-white border border-blue-200 text-center"
                                >
                                    <a href={business.url} target='_blank'>
                                        <div className="flex flex-col p-3">
                                            <img className="w-[180px] max-w-none aspect-square rounded-xl" src={business.image_url} alt="yelp business" />
                                            <div className='flex justify-between items-start'>
                                                <h3 className="mt-2 text-sm text-left font-medium text-gray-900">
                                                    {business.name}
                                                </h3>
                                                <div className="whitespace-nowrap rounded-full ml-2 mt-2 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                                    {business.rating} ★
                                                </div>
                                            </div>
                                            <dl className="mt-1 flex flex-grow flex-col justify-between">
                                                <dd className="text-xs text-left text-gray-500">{business.categories.map((category) => category.title).join(', ')}</dd>
                                            </dl>
                                        </div>
                                    </a>
                                    <div className="flex divide-x divide-gray-200">
                                        <div className="flex w-0 flex-1">
                                            <button
                                                className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-2 text-sm font-semibold text-gray-900"
                                            >
                                                <HeartIcon className="h-5 w-5 stroke-2 stroke-gray-400 fill-none" aria-hidden="true" />
                                                Save
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )
            })
    )
}
