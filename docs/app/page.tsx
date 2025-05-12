import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Ringer API Documentation
        </p>
      </div>

      <div className="relative flex place-items-center">
        <h1 className="text-4xl font-bold">Welcome to Ringer API</h1>
      </div>
      
      <div className="my-12 max-w-3xl text-center">
        <p className="mb-6">
          Our RESTful APIs provide access to telecommunications data and services across three business entities: 
          Ringer, Ringer Business, and Ringer Mobile.
        </p>
      </div>

      <div className="mb-12 grid gap-6 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 max-w-5xl w-full">
        <div className="p-6 border rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-3">
            <Link href="/api-reference/ringer" className="hover:text-blue-600 dark:hover:text-blue-400">
              Ringer
            </Link>
          </h2>
          <h3 className="text-xl font-medium mb-2">
            <Link href="/api-reference/ringer/telique" className="hover:text-blue-600 dark:hover:text-blue-400">
              Telique
            </Link>
          </h3>
          <ul className="space-y-2 mb-4 list-disc pl-5">
            <li>
              <Link href="/api-reference/ringer/telique/lookup" className="text-blue-600 dark:text-blue-400 hover:underline">
                Lookup API
              </Link>
            </li>
            <li>
              <Link href="/api-reference/ringer/telique/cnam-lookup" className="text-blue-600 dark:text-blue-400 hover:underline">
                CNAM Lookup API
              </Link>
            </li>
            <li>
              <Link href="/api-reference/ringer/telique/bulk-lookup" className="text-blue-600 dark:text-blue-400 hover:underline">
                Bulk Lookup API
              </Link>
            </li>
          </ul>
          <Link 
            href="/docs/products/telique" 
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            Learn more about Telique →
          </Link>
        </div>
        
        <div className="p-6 border rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-3">Ringer Business</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Explore APIs for business communications and services.
          </p>
          <Link 
            href="/api-reference/ringer-business" 
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            View Ringer Business APIs →
          </Link>
        </div>
        
        <div className="p-6 border rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-3">Ringer Mobile</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Access mobile telecommunications APIs and services.
          </p>
          <Link 
            href="/api-reference/ringer-mobile" 
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            View Ringer Mobile APIs →
          </Link>
        </div>
      </div>

      <div className="mb-12 grid text-center lg:max-w-5xl lg:w-full lg:grid-cols-2 lg:text-left gap-6">
        <Link
          href="/docs"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Documentation{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Find in-depth information about Ringer API features and capabilities.
          </p>
        </Link>

        <Link
          href="https://github.com/teliax/ringer-oapi"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            GitHub{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Access the OpenAPI specifications and contribute to our docs.
          </p>
        </Link>
      </div>
    </main>
  )
} 