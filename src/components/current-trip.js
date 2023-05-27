import { useEffect, useState } from 'react'
import {
    FaceSmileIcon,
    WalletIcon,
    TableCellsIcon,
} from '@heroicons/react/24/outline'

import Activities from './activities';
import OrganizeItinerary from './organize-itinerary';
import ViewItinerary from './view-itinerary';

import authService from '@/utils/authService';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function CurrentTrip({ currentTrip }) {

    // Handle navigation tab
    const [navigation, setNavigation] = useState([
        { name: 'Activities', icon: FaceSmileIcon, current: true },
        { name: 'Organize Itinerary', icon: WalletIcon, current: false },
        { name: 'View Itinerary', icon: TableCellsIcon, current: false },
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
    const [tripInfo, setTripInfo] = useState()
    const fetchUserTrip = async () => {
        try {
            const response = await fetch(`/api/trip/userTrip?_id=${currentTrip}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': authService.getToken(),
                }
            })
            const data = await response.json()
            setTripInfo(data)

        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        fetchUserTrip()
    }, [currentTrip])

    return (
        <div className="min-h-full">
            <div className="w-full">
                <div className="flex h-16 justify-around shadow-md sm:justify-center sm:space-x-8">
                    {navigation.map((item) => (
                        <button
                            key={item.name}
                            className={classNames(
                                item.current
                                    ? 'border-teal-500 text-gray-900'
                                    : 'border-transparent text-gray-500 hover:border-gray-300',
                                'inline-flex items-center sm:gap-2 border-b-2 px-4 pt-1 text-[0] sm:text-sm font-medium'
                            )}
                            aria-current={item.current ? 'page' : undefined}
                            onClick={() => handleNavigation(item.name)}
                        >
                            <item.icon
                                className={classNames(
                                    item.current
                                        ? 'border-teal-500 text-gray-900'
                                        : 'border-transparent text-gray-500',
                                    'h-6 w-6 shrink-0'
                                )}
                            />
                            {item.name}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <main>
                    <div className="mx-auto w-full px-4 sm:px-6 lg:px-8">
                        {/* Your content */}
                        {activeComponent === 'Organize Itinerary'
                            ? <OrganizeItinerary tripInfo={tripInfo} />
                            : activeComponent === 'View Itinerary'
                                ? <ViewItinerary />
                                : <Activities tripInfo={tripInfo} />
                        }
                    </div>
                </main>
            </div>
        </div>
    )
}
