import { useState } from 'react'
import { HeartIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/20/solid'

export default function Activities() {
    const [people, setPeople] = useState([
        {
            name: 'Some Restaurant Name',
            category: 'Breakfast food',
            rating: '4 ★',
            yelpLink: 'https://www.yelp.com',
            imageUrl:
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
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
            <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {people.map((person) => (
                    <li
                        key={person.name}
                        className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
                    >
                        <div className="flex flex-1 flex-col p-4">
                            <img className="mx-auto w-full aspect-square flex-shrink-0 rounded-xl" src={person.imageUrl} alt="" />
                            <h3 className="inline-flex justify-between items-baseline mt-6 text-sm text-left font-medium text-gray-900">
                                {person.name}
                                <span className="whitespace-nowrap rounded-full ml-2 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                    {person.rating}
                                </span>
                            </h3>
                            <dl className="mt-1 flex flex-grow flex-col justify-between">
                                <dt className="sr-only">Title</dt>
                                <dd className="text-sm text-left text-gray-500">{person.category}</dd>
                                <dt className="sr-only">Role</dt>
                                <dd className="mt-3">

                                </dd>
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
                                        href={person.yelpLink}
                                        className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                                        target='_blank'
                                    >
                                        <ArrowTopRightOnSquareIcon className="h-5 w-5 text-gray-400 stroke-gray-400 stroke-[0.5px]" aria-hidden="true" />
                                        Yelp
                                    </a>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
