import { useState } from 'react'
import { XCircleIcon } from '@heroicons/react/24/outline'

import axios from 'axios'

export default function CreateTrip() {
    // Fetching list of country names
    const [countriesList, setCountriesList] = useState()
    const countries = async () => {
        const { data } = await axios.get('https://restcountries.com/v3.1/all')

        const countriesArr = data.map((country) => {
            return country.name.common
        }).sort()

        setCountriesList(countriesArr)
    }
    countries();

    return (
        <div className='space-y-8'>
            <div className="md:flex md:items-center md:justify-between border-b border-gray-900/10 pb-4">
                <div className="min-w-0 flex-1">
                    <h2 className="text-2xl font-bold leading-7 text-teal-700 sm:truncate sm:text-3xl sm:tracking-tight">
                        Create a new trip
                    </h2>
                </div>
            </div>
            <form className='md:px-40'>
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
                                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
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
                                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
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
                                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
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
                                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
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
                                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
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
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:max-w-xs sm:text-sm sm:leading-6"
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
                                        name="activities"
                                        type="text"
                                        required
                                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-lg leading-7 text-gray-900">Your Activities:</h2>

                        <div className="mt-10 flex">
                            <div className='relative text-teal-600 border-2 border-teal-600 font-medium rounded-lg text-sm px-5 py-2.5'>
                                Randomness
                                <XCircleIcon
                                    fill='true'
                                    className='h-6 w-6 shrink-0 absolute right-[-10px] top-[-10px] cursor-pointer text-white'
                                // onClick={handleDelete}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    )
}
