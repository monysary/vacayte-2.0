import {
    BuildingStorefrontIcon,
    BookOpenIcon,
    NewspaperIcon,
} from '@heroicons/react/24/outline'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function CurrentTrip() {

    const navigation = [
        { name: 'Activities', icon: BuildingStorefrontIcon, current: true },
        { name: 'Organize Itinerary', icon: BookOpenIcon, current: false },
        { name: 'View Itinerary', icon: NewspaperIcon, current: false },
    ]

    return (
        <div className="min-h-full">
            <div className="max-w-7xl">
                <div className="flex h-16 justify-around sm:justify-start sm:-my-px sm:ml-6 sm:space-x-8">
                    {navigation.map((item) => (
                        <button
                            key={item.name}
                            className={classNames(
                                item.current
                                    ? 'border-teal-500 text-gray-900'
                                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                                'inline-flex items-center border-b-2 px-1 pt-1 text-[0] sm:text-sm font-medium'
                            )}
                            aria-current={item.current ? 'page' : undefined}
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
                <header>
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">Dashboard</h1>
                    </div>
                </header>
                <main>
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">{/* Your content */}</div>
                </main>
            </div>
        </div>
    )
}
