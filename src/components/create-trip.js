import { useEffect, useState } from 'react'
import { XCircleIcon } from '@heroicons/react/24/outline'

import authService from '@/utils/authService'

export default function CreateTrip({ setToggle }) {
    // Fetching list of country names
    const [countriesList, setCountriesList] = useState()
    const countries = async () => {
        const response = await fetch('https://restcountries.com/v3.1/all')
        const data = await response.json()

        const countriesArr = data.map((country) => {
            return country.name.common
        }).sort()

        setCountriesList(countriesArr)
    }
    countries();

    // Handle trip form
    const [locationProps, setLocationProps] = useState({
        city: '',
        state: '',
        country: '',
    })
    const [tripForm, setTripForm] = useState({
        name: '',
        location: '',
        startDate: '',
        endDate: '',
        activity: '',
        activities: [],
    })
    const handleInputChange = ({ target: { name, value } }) => {
        if (name === 'city' || name === 'state' || name === 'country') {
            setLocationProps({ ...locationProps, [name]: value })
        } else {
            setTripForm({ ...tripForm, [name]: value })
        }
    }
    useEffect(() => {
        const { city, state, country } = locationProps
        const locationArr = [city, state, country]
        setTripForm({ ...tripForm, location: locationArr.join(', ') })

    }, [locationProps])

    // Adding & removing an activity to tripForm.activities array
    const handleAddActivity = () => {
        if (tripForm.activity !== '') {
            setTripForm({
                ...tripForm,
                activities: [...tripForm.activities, { 'name': tripForm.activity }],
                activity: ''
            })
        }
        return
    }
    const handleRemoveActivity = (activityName) => {
        setTripForm({
            ...tripForm,
            activities: tripForm.activities.filter((item) => item.name !== activityName)
        })
    }

    // Toggle show activities error
    const [hideError, setHideError] = useState()
    useEffect(() => {
        if (tripForm.activities.length < 1) {
            setHideError(false)
        } else {
            setHideError(true)
        }

    }, [tripForm.activities.length])

    // Clear activities
    const handleClearActivities = () => {
        setTripForm({
            ...tripForm,
            activities: []
        })
    }

    // Adding new trip to database
    const [loading, setLoading] = useState(false)
    const createNewTrip = async (event) => {
        event.preventDefault();
        if (tripForm.activities.length < 1) {
            return
        } else {
            setLoading(true)
        }

        try {
            const response = await fetch('/api/trip', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': authService.getToken()
                },
                body: JSON.stringify(tripForm)
            })

            const data = await response.json()

            setToggle((prev) => !prev)

        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false)
            setTripForm({
                name: '',
                location: '',
                startDate: '',
                endDate: '',
                activity: '',
                activities: [],
            })
            setLocationProps({
                city: '',
                state: '',
                country: '',
            })
        }
    }

    return (
        <div className='space-y-8 px-4 pb-6 sm:px-6 lg:px-8'>
            <div className="md:flex md:items-center md:justify-between border-b border-gray-900/10 py-4">
                <div className="min-w-0 flex-1">
                    <h2 className="text-2xl font-bold leading-7 text-teal-700 sm:truncate sm:text-3xl sm:tracking-tight">
                        Create a new trip
                    </h2>
                </div>
            </div>
            <form className='md:px-40' onSubmit={createNewTrip} onKeyDown={(event) => event.key === 'Enter' && event.preventDefault()}>
                <div className="space-y-8">
                    <div className="border-b border-gray-900/10 pb-8">
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                    Trip Name<span className='text-red-500'> *</span>
                                </label>
                                <div className="mt-2">
                                    <input
                                        name="name"
                                        type="text"
                                        required
                                        value={tripForm.name}
                                        onChange={handleInputChange}
                                        className="block w-full rounded-md outline-0 border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                    Start Date<span className='text-red-500'> *</span>
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="date"
                                        name="startDate"
                                        required
                                        value={tripForm.startDate}
                                        onChange={handleInputChange}
                                        className="block w-full rounded-md outline-0 border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                    End Date<span className='text-red-500'> *</span>
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="date"
                                        name="endDate"
                                        required
                                        value={tripForm.endDate}
                                        onChange={handleInputChange}
                                        className="block w-full rounded-md outline-0 border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2 sm:col-start-1">
                                <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                    City<span className='text-red-500'> *</span>
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="city"
                                        required
                                        value={locationProps.city}
                                        onChange={handleInputChange}
                                        className="block w-full rounded-md outline-0 border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                                    State / Province<span className='text-red-500'> *</span>
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="state"
                                        required
                                        value={locationProps.state}
                                        onChange={handleInputChange}
                                        className="block w-full rounded-md outline-0 border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                    Country<span className='text-red-500'> *</span>
                                </label>
                                <div className="mt-2">
                                    <select
                                        name="country"
                                        required
                                        value={locationProps.country}
                                        onChange={handleInputChange}
                                        className="block w-full rounded-md outline-0 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                    >
                                        <option></option>
                                        {countriesList?.map((country) => {
                                            return (
                                                <option key={country}>{country}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>

                            <div className="sm:col-span-4">
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                    Things to do<span className='text-red-500'> *</span>
                                </label>
                                <div className="mt-2">
                                    <input
                                        name="activity"
                                        type="text"
                                        value={tripForm.activity}
                                        onChange={handleInputChange}
                                        className="block w-full rounded-md outline-0 border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-1 self-end">
                                <button
                                    type="button"
                                    className="rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
                                    onClick={handleAddActivity}
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-lg leading-7 text-gray-900">Your Activities:</h2>
                        <label className={`text-xs text-red-500 ${hideError && 'hidden'}`}>
                            Please add at least one activity
                        </label>

                        <div className="mt-10 flex flex-wrap gap-4">
                            {
                                tripForm.activities.map((item) => {
                                    return (
                                        <div key={item.name} className='relative text-teal-600 border-2 border-teal-600 font-medium rounded-lg text-sm px-5 py-2.5'>
                                            {item.name}
                                            <XCircleIcon
                                                fill='true'
                                                className='h-6 w-6 shrink-0 absolute right-[-10px] top-[-10px] cursor-pointer text-white'
                                                onClick={() => handleRemoveActivity(item.name)}
                                            />
                                        </div>
                                    )
                                })
                            }

                        </div>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button onClick={handleClearActivities} type="button" className="text-sm font-semibold leading-6 text-gray-900">
                        Clear Activities
                    </button>
                    <button
                        type="submit"
                        className="inline-flex items-center rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
                    >
                        {loading
                            ? <svg className='animate-spin h-5 w-5 text-white' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                                <path className='opacity-75' fill='currentColor' d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            : 'Save'
                        }
                    </button>
                </div>
            </form >
        </div >
    )
}
