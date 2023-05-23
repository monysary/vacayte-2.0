import { useState } from 'react'
import { HeartIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/20/solid'

export default function Activities() {
    const [yelpBusinesses, setYelpBusinesses] = useState([
        {
            name: 'Some Restaurant Name',
            category: 'Breakfast food',
            rating: '4 ★',
            yelpLink: 'https://www.yelp.com',
            imageUrl:
                'https://source.unsplash.com/random/?vacation',
        },
        {
            name: 'Some Restaurant Name',
            category: 'Breakfast food',
            rating: '4 ★',
            yelpLink: 'https://www.yelp.com',
            imageUrl:
                'https://source.unsplash.com/random/?vacation',
        },
        {
            name: 'Some Restaurant Name',
            category: 'Breakfast food',
            rating: '4 ★',
            yelpLink: 'https://www.yelp.com',
            imageUrl:
                'https://source.unsplash.com/random/?vacation',
        },
        {
            name: 'Some Restaurant Name',
            category: 'Breakfast food',
            rating: '4 ★',
            yelpLink: 'https://www.yelp.com',
            imageUrl:
                'https://source.unsplash.com/random/?vacation',
        },
        {
            name: 'Some Restaurant Name',
            category: 'Breakfast food',
            rating: '4 ★',
            yelpLink: 'https://www.yelp.com',
            imageUrl:
                'https://source.unsplash.com/random/?vacation',
        },
        {
            name: 'Some Restaurant Name',
            category: 'Breakfast food',
            rating: '4 ★',
            yelpLink: 'https://www.yelp.com',
            imageUrl:
                'https://source.unsplash.com/random/?vacation',
        },
        {
            name: 'Some Restaurant Name',
            category: 'Breakfast food',
            rating: '4 ★',
            yelpLink: 'https://www.yelp.com',
            imageUrl:
                'https://source.unsplash.com/random/?vacation',
        },
        {
            name: 'Some Restaurant Name',
            category: 'Breakfast food',
            rating: '4 ★',
            yelpLink: 'https://www.yelp.com',
            imageUrl:
                'https://source.unsplash.com/random/?vacation',
        },
    ])

    return (
        <div>
            <div className="md:flex md:items-center md:justify-between border-b border-gray-900/10 pb-4 mb-4">
                <div className="min-w-0 flex-1">
                    <h2 className="text-2xl font-bold leading-7 text-teal-700 sm:truncate sm:text-3xl sm:tracking-tight">
                        Trip Activities
                    </h2>
                </div>
            </div>
            <div className="flex items-center gap-4 overflow-x-auto p-2">
                {yelpBusinesses.map((business) => (
                    <div
                        key={business.name}
                        className="min-w-[200px] flex flex-col divide-y divide-gray-200 rounded-lg bg-white border border-blue-200 text-center"
                    >
                        <div className="flex flex-1 flex-col p-4">
                            <img className="mx-auto w-full aspect-square flex-shrink-0 rounded-xl" src={business.imageUrl} alt="" />
                            <h3 className="inline-flex justify-between items-baseline mt-2 text-sm text-left font-medium text-gray-900">
                                {business.name}
                                <span className="whitespace-nowrap rounded-full ml-2 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                    {business.rating}
                                </span>
                            </h3>
                            <dl className="mt-1 flex flex-grow flex-col justify-between">
                                <dd className="text-sm text-left text-gray-500">{business.category}</dd>
                            </dl>
                        </div>
                        <div>
                            <div className="-mt-px flex divide-x divide-gray-200">
                                <div className="flex w-0 flex-1">
                                    <button
                                        className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                                    >
                                        <HeartIcon className="h-5 w-5 stroke-2 stroke-gray-400 fill-none" aria-hidden="true" />
                                        Save
                                    </button>
                                </div>
                                <div className="-ml-px flex w-0 flex-1">
                                    <a
                                        href={business.yelpLink}
                                        className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                                        target='_blank'
                                    >
                                        <ArrowTopRightOnSquareIcon className="h-5 w-5 text-gray-400 stroke-gray-400 stroke-[0.5px]" aria-hidden="true" />
                                        Yelp
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
