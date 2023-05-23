import { useState, useEffect } from 'react'

import Signup from "@/components/signup"

import authService from '@/utils/authService'

export default function Login() {
    // Toggle between login and signup form
    const [toggleHidden, setToggleHidden] = useState(true)

    // Handle user login form
    const [loginForm, setLoginForm] = useState({
        username: '',
        password: '',
    })
    const handleInputChange = ({ target: { name, value } }) => {
        setLoginForm({ ...loginForm, [name]: value })
    }

    // POST request to log in user
    const [loading, setLoading] = useState(false)
    const userLogin = async (event) => {
        event.preventDefault();
        setLoading(true)
        try {
            const response = await fetch('/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginForm)
            })
            const data = await response.json()

            authService.login(data.token)

        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false)
        }

    }

    return (
        <div className="flex min-h-full flex-1">
            <div className={`bg-slate-50 flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24 ${!toggleHidden ? 'hidden' : 'flex'}`}>
                <div className="mx-auto w-full max-w-sm lg:w-96">
                    <div className="flex justify-center">
                        <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Sign in to your account
                        </h2>
                    </div>

                    <div className="mt-10">
                        <div>
                            <form className="space-y-6" onSubmit={userLogin}>
                                <div>
                                    <label className="block text-sm font-medium leading-6 text-gray-900">
                                        Username
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            className="block w-full rounded-md outline-none border-0 p-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                                            name="username"
                                            type="text"
                                            required
                                            value={loginForm.username}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium leading-6 text-gray-900">
                                        Password
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            className="block w-full rounded-md outline-none border-0 p-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                                            name="password"
                                            type="password"
                                            required
                                            value={loginForm.password}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <button
                                        className='flex w-full justify-center items-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm bg-teal-600 hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600'
                                        type="submit"
                                    >
                                        {loading
                                            ? <svg className='animate-spin -ml-1 mr-3 h-5 w-5 text-white' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                                                <path className='opacity-75' fill='currentColor' d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            : 'Sign in'
                                        }
                                    </button>
                                </div>
                            </form>
                        </div>

                        <div className="mt-10">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                    <div className="w-full border-t border-gray-300" />
                                </div>
                                <div className="relative flex justify-center text-sm font-medium leading-6">
                                    <span className="bg-slate-50 px-6 text-gray-900">
                                        Don't have an account?
                                        <a className="ml-[10px] font-semibold text-teal-600 hover:text-teal-500 cursor-pointer"
                                            onClick={() => setToggleHidden((prev) => !prev)}
                                        >
                                            Sign up
                                        </a>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Signup toggleHidden={toggleHidden} setToggleHidden={setToggleHidden} />

            <div className="relative hidden w-0 flex-1 lg:block">
                <img
                    className="absolute inset-0 h-full w-full object-cover"
                    src="https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                    alt=""
                />
            </div>
        </div>
    )
}