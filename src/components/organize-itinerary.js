import { Fragment, useEffect, useState } from 'react'
import {
    CalendarIcon,
    EllipsisHorizontalIcon,
    MapPinIcon,
} from '@heroicons/react/20/solid'
import { CheckIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline'
import {
    Menu,
    Dialog,
    Transition
} from '@headlessui/react'

import { getDateRange } from '@/utils/helpers'
import authService from '@/utils/authService'

const meetings = [
    {
        id: 1,
        date: 'January 10th, 2022',
        time: '5:00 PM',
        datetime: '2022-01-10T17:00',
        name: 'Leslie Alexander',
        imageUrl:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        location: 'Starbucks',
    },
    {
        id: 2,
        date: 'January 10th, 2022',
        time: '5:00 PM',
        datetime: '2022-01-10T17:00',
        name: 'Leslie Alexander',
        imageUrl:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        location: 'Starbucks',
    },
    {
        id: 3,
        date: 'January 10th, 2022',
        time: '5:00 PM',
        datetime: '2022-01-10T17:00',
        name: 'Leslie Alexander',
        imageUrl:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        location: 'Starbucks',
    },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function OrganizeItinerary({ tripInfo }) {

    // Get trip date range function
    const tripStartDate = tripInfo?.startDate.split('T')[0]
    const tripEndDate = tripInfo?.endDate.split('T')[0]
    const [tripDates, setTripDates] = useState([])
    useEffect(() => {
        setTripDates(
            getDateRange(tripStartDate, tripEndDate)
                .map((item) => ({
                    date: item,
                    isSelected: false
                }))
        )
        fetchItinerary()
        setNavigation(
            tripInfo.activities.map((item, index) => {
                return ({
                    name: item.name,
                    current: index === 0 ? true : false
                })
            })
        )

    }, [tripInfo])

    // Handle selecting dates
    const [selectedDate, setSelectedDate] = useState()
    const handleSelectDates = (event) => {
        setTripDates(
            tripDates.map((item) => {
                if (new Date(item.date).toUTCString().split(' 00:00:00 ')[0] === event.target.innerHTML) {
                    setSelectedDate(item.date)
                    return { ...item, isSelected: true }
                } else {
                    return { ...item, isSelected: false }
                }
            })
        )
    }

    // Get trip itinerary and daily activities
    const [dailyActivities, setDailyActivities] = useState()
    const fetchItinerary = async () => {
        try {
            const response = await fetch(`/api/trip/userTrip/itinerary?_id=${tripInfo._id}`, {
                headers: {
                    'Authorization': authService.getToken()
                }
            })
            const data = await response.json()
            setDailyActivities(data.itinerary)

        } catch (err) {
            console.log(err);
        }
    }

    // Handle modal
    const [open, setOpen] = useState(false)
    const [navigation, setNavigation] = useState([])
    const [activeComponent, setActiveComponent] = useState()
    const handleModal = () => {
        setOpen(!open)
        setActiveComponent(navigation[0].name)
        console.log(navigation);
    }
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

    return (
        <div className="pb-6">
            <div className="mt-6 lg:grid lg:grid-cols-12 lg:gap-x-16">
                <div className=" text-center flex flex-col items-center lg:col-start-8 lg:col-end-13 lg:row-start-1 lg:mt-9 xl:col-start-9">
                    <div className="inline-flex items-center text-gray-900 text-lg font-semibold">
                        Calendar
                    </div>
                    <div className="mt-2 flex flex-col gap-0.5 rounded-lg bg-gray-200 text-sm shadow-md ring-1 ring-gray-200 overflow-y-auto max-h-80 w-full sm:max-w-xs">
                        {tripDates.map((day) => (
                            <button
                                key={day.date}
                                type="button"
                                onClick={handleSelectDates}
                                className={classNames(
                                    'p-1.5 hover:bg-gray-100 focus:z-10 bg-gray-50 text-gray-900 text-center',
                                    day.isSelected && 'hover:bg-teal-500 bg-teal-500 font-semibold text-zinc-100',
                                )}
                            >
                                {new Date(day.date).toUTCString().split(' 00:00:00 ')[0]}
                            </button>
                        ))}
                    </div>
                    <button
                        type="button"
                        onClick={handleModal}
                        className="mt-8 w-full sm:max-w-xs rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white shadow hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
                    >
                        View Saved
                    </button>
                </div>
                <ol className="mt-4 divide-y divide-gray-100 text-sm leading-6 lg:col-span-7 xl:col-span-8">
                    {meetings.map((meeting) => (
                        <li key={meeting.id} className="relative flex space-x-6 py-6 xl:static">
                            <img src={meeting.imageUrl} alt="" className="h-14 w-14 flex-none rounded-full" />
                            <div className="flex-auto">
                                <h3 className="pr-10 font-semibold text-gray-900 xl:pr-0">{meeting.name}</h3>
                                <dl className="mt-2 flex flex-col text-gray-500 xl:flex-row">
                                    <div className="flex items-start space-x-3">
                                        <dt className="mt-0.5">
                                            <span className="sr-only">Date</span>
                                            <CalendarIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        </dt>
                                        <dd>
                                            <time dateTime={meeting.datetime}>
                                                {meeting.date} at {meeting.time}
                                            </time>
                                        </dd>
                                    </div>
                                    <div className="mt-2 flex items-start space-x-3 xl:ml-3.5 xl:mt-0 xl:border-l xl:border-gray-400 xl:border-opacity-50 xl:pl-3.5">
                                        <dt className="mt-0.5">
                                            <span className="sr-only">Location</span>
                                            <MapPinIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        </dt>
                                        <dd>{meeting.location}</dd>
                                    </div>
                                </dl>
                            </div>
                            <Menu as="div" className="absolute right-0 top-6 xl:relative xl:right-auto xl:top-auto xl:self-center">
                                <div>
                                    <Menu.Button className="-m-2 flex items-center rounded-full p-2 text-gray-500 hover:text-gray-600">
                                        <span className="sr-only">Open options</span>
                                        <EllipsisHorizontalIcon className="h-5 w-5" aria-hidden="true" />
                                    </Menu.Button>
                                </div>

                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="py-1">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <a
                                                        href="#"
                                                        className={classNames(
                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                            'block px-4 py-2 text-sm'
                                                        )}
                                                    >
                                                        Edit
                                                    </a>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <a
                                                        href="#"
                                                        className={classNames(
                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                            'block px-4 py-2 text-sm'
                                                        )}
                                                    >
                                                        Cancel
                                                    </a>
                                                )}
                                            </Menu.Item>
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        </li>
                    ))}
                </ol>
            </div>

            {/* Add event modal */}
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div className="flex h-full items-end justify-center p-4 lg:ml-56 text-center items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-y-auto h-3/4 rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-xl">
                                    <div className="min-h-full">
                                        <div className="w-full mt-2 shadow-md">
                                            <div className="flex overflow-x-auto h-12 sm:space-x-8">
                                                {navigation.map((item) => (
                                                    <button
                                                        key={item.name}
                                                        className={classNames(
                                                            item.current
                                                                ? 'border-teal-500 text-gray-900'
                                                                : 'border-transparent text-gray-500 hover:border-gray-300',
                                                            'inline-flex items-center sm:gap-2 border-b-2 px-4 pt-1 text-lg font-medium'
                                                        )}
                                                        aria-current={item.current ? 'page' : undefined}
                                                        onClick={() => handleNavigation(item.name)}
                                                    >
                                                        {item.name}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <main className='my-4 px-2 sm:px-4 divide-y-2'>
                                            <div className='flex flex-nowrap gap-4 items-stretch py-2'>
                                                <img src={meetings[0].imageUrl} alt="" className="w-32 grow-0 aspect-square rounded" />
                                                <div className='grow flex flex-col justify-between'>
                                                    <div className='flex flex-col gap-2'>
                                                        <div className='flex flex-nowrap justify-between items-start'>
                                                            <a
                                                                href='https://www.yelp.com'
                                                                target='_blank'
                                                                className='font-semibold text-xl text-teal-600 hover:underline'
                                                            >
                                                                Business Name
                                                            </a>
                                                            <div className="whitespace-nowrap rounded-full mt-1 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                                                Rating ★ | 562
                                                            </div>
                                                        </div>
                                                        <div className='flex flex-nowrap justify-between items-start'>
                                                            <p className='text-sm text-gray-900'>
                                                                Category | Food | Something | Other
                                                            </p>
                                                            <p className='text-xs text-gray-900 font-semibold'>
                                                                $$$
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className='flex items-start gap-2'>
                                                        <ChatBubbleLeftIcon x='0px' y='0px' className='w-8 h-4 mt-1' />
                                                        <p className='inline-flex items-start h-[40px] text-sm text-gray-500 italic text-ellipsis'>
                                                            "This is my review of this business.
                                                            This is my review of this business.
                                                            This is my review of this business.
                                                            This is my review of this business."
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </main>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </div>
    )
}
