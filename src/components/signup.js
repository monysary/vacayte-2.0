export default function Signup({ toggleHidden, setToggleHidden }) {
    return (
        <div className={`bg-slate-50 flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24 ${toggleHidden ? 'hidden' : 'flex'}`}>
            <div className="mx-auto w-full max-w-sm lg:w-96">
                <div className="flex justify-center">
                    <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Create your account
                    </h2>
                </div>

                <div className="mt-10">
                    <div>
                        <form className="space-y-6">
                            <div className="space-y-6 sm:space-y-0 sm:flex sm:justify-between">
                                <div>
                                    <label className="block text-sm font-medium leading-6 text-gray-900">
                                        First Name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            name="firstName"
                                            type="text"
                                            required
                                            className="block w-full rounded-md border-0 p-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium leading-6 text-gray-900">
                                        Last Name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            name="lastName"
                                            type="text"
                                            required
                                            className="block w-full rounded-md border-0 p-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                    Username
                                </label>
                                <div className="mt-2">
                                    <input
                                        name="username"
                                        type="text"
                                        required
                                        className="block w-full rounded-md border-0 p-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                    Email
                                </label>
                                <div className="mt-2">
                                    <input
                                        name="email"
                                        type="email"
                                        required
                                        className="block w-full rounded-md border-0 p-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                                <div className="mt-2">
                                    <input
                                        name="password"
                                        type="password"
                                        required
                                        className="block w-full rounded-md border-0 p-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                                <label className="text-xs text-gray-500">
                                    Password must be minimum 8 characters long
                                </label>
                            </div>

                            <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                    Confirm Password
                                </label>
                                <div className="mt-2">
                                    <input
                                        name="confirmPassword"
                                        type="password"
                                        required
                                        className="block w-full rounded-md border-0 p-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-teal-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
                                >
                                    Sign Up
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
                                <span className="bg-white px-6 text-gray-900">
                                    Already have an account?
                                    <a className="ml-[10px] font-semibold text-teal-600 hover:text-teal-500 cursor-pointer"
                                        onClick={() => setToggleHidden(prev => !prev)}
                                    >
                                        Log In
                                    </a>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}