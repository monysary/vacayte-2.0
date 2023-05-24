import { useEffect, useState } from 'react'
import {
    BuildingStorefrontIcon,
    BookOpenIcon,
    NewspaperIcon,
} from '@heroicons/react/24/outline'

import Activities from './activities';
import OrganizeItinerary from './organize-itinerary';
import ViewItinerary from './view-itinerary';

import authService from '@/utils/authService';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function CurrentTrip({ currentTrip }) {
    console.log(currentTrip);

    // Handle navigation tab
    const [navigation, setNavigation] = useState([
        { name: 'Activities', icon: BuildingStorefrontIcon, current: true },
        { name: 'Organize Itinerary', icon: BookOpenIcon, current: false },
        { name: 'View Itinerary', icon: NewspaperIcon, current: false },
    ])
    const [activeComponent, setActiveComponent] = useState('Activities')
    const handleNavigation = (name) => {
        setNavigation(
            navigation.map((item) => {
                if (item.name === name) {
                    setActiveComponent(item.name)
                    return { ...item, current: true }
                } else {
                    return { ...item, current: false }
                }
            })
        )
    }

    // Setting up navigation props
    const [activities, setActivities] = useState()
    const [organizeItinerary, setOrganizeItinerary] = useState()
    const [viewItinerary, setViewItinerary] = useState()
    const fetchUserTrip = async () => {
        try {
            const response = await fetch(`/api/trip/userTrip?id=${currentTrip}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': authService.getToken(),
                }
            })
            const data = await response.json()

            console.log(data);
            setActivities({
                _id: data._id,
                location: data.location,
                activities: data.activities
            })

        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        fetchUserTrip()
    }, [currentTrip])


    return (
        <div className="min-h-full">
            <div className="max-w-7xl">
                <div className="flex h-16 justify-around shadow-md sm:justify-start sm:-my-px sm:space-x-8">
                    {navigation.map((item) => (
                        <button
                            key={item.name}
                            className={classNames(
                                item.current
                                    ? 'border-teal-500 text-gray-900'
                                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                                'inline-flex items-center sm:gap-2 border-b-2 px-4 pt-1 text-[0] sm:text-sm font-medium'
                            )}
                            aria-current={item.current ? 'page' : undefined}
                            onClick={() => handleNavigation(item.name)}
                        >
                            <item.icon
                                className={classNames(
                                    item.current
                                        ? 'border-teal-500 text-gray-900'
                                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                                    'h-6 w-6 shrink-0'
                                )}
                            />
                            {item.name}
                        </button>
                    ))}
                </div>
            </div>

            <div className="py-6">
                <main>
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        {/* Your content */}
                        {activeComponent === 'Organize Itinerary'
                            ? <OrganizeItinerary />
                            : activeComponent === 'View Itinerary'
                                ? <ViewItinerary />
                                : <Activities activities={activities} />
                        }
                    </div>
                </main>
            </div>
        </div>
    )
}
