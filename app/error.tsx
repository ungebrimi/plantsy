"use client"
import Link from "next/link";

export default function GlobalError({ error, reset,}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
            <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
                <div className="text-center">
                    <p className="text-base font-semibold text-indigo-600"></p>
                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Something went wrong</h1>
                    <p className="mt-6 text-base leading-7 text-gray-600">{error.name}: {error.message}</p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link
                            href={"/"}
                            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Go back home
                        </Link>
                        <button onClick={() => reset()} className="text-sm font-semibold text-gray-900">
                            Try again
                        </button>
                    </div>
                </div>
            </main>
    )
}