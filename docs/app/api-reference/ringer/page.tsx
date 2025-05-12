import Link from 'next/link';

export default function RingerApiOverviewPage() {
  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold mb-4">Ringer API Reference</h1>
      <p className="mb-8">
        Ringer provides telecommunications data and services through our RESTful APIs. 
        Explore our API products below.
      </p>

      <div className="mb-12">
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-gray-100 dark:bg-gray-800 px-6 py-4 border-b">
            <h2 className="text-2xl font-semibold">Telique</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Database API tool for telecommunications data
            </p>
          </div>
          <div className="px-6 py-4">
            <p className="mb-4">
              Telique provides access to telecommunications data, including caller name (CNAM) data, 
              line type information, and more.
            </p>
            
            <h3 className="text-lg font-semibold mb-3">Available Endpoints</h3>
            <div className="space-y-3 mb-6">
              <div className="border rounded p-4">
                <div className="flex items-center mb-2">
                  <span className="px-2 py-1 bg-green-500 text-white rounded-md text-xs font-semibold mr-2">GET</span>
                  <code className="font-mono text-sm">/v1/telique/lookup</code>
                </div>
                <p className="text-sm mb-2">
                  Returns detailed information about a specified phone number.
                </p>
                <Link 
                  href="/api-reference/ringer/telique/lookup" 
                  className="text-blue-600 dark:text-blue-400 text-sm hover:underline"
                >
                  View Documentation →
                </Link>
              </div>
              
              <div className="border rounded p-4">
                <div className="flex items-center mb-2">
                  <span className="px-2 py-1 bg-green-500 text-white rounded-md text-xs font-semibold mr-2">GET</span>
                  <code className="font-mono text-sm">/v1/telique/cnam</code>
                </div>
                <p className="text-sm mb-2">
                  Retrieve Caller Name (CNAM) information for a given phone number.
                </p>
                <Link 
                  href="/api-reference/ringer/telique/cnam-lookup" 
                  className="text-blue-600 dark:text-blue-400 text-sm hover:underline"
                >
                  View Documentation →
                </Link>
              </div>
              
              <div className="border rounded p-4">
                <div className="flex items-center mb-2">
                  <span className="px-2 py-1 bg-blue-500 text-white rounded-md text-xs font-semibold mr-2">POST</span>
                  <code className="font-mono text-sm">/v1/telique/bulk-lookup</code>
                </div>
                <p className="text-sm mb-2">
                  Returns detailed information about multiple phone numbers in a single request.
                </p>
                <Link 
                  href="/api-reference/ringer/telique/bulk-lookup" 
                  className="text-blue-600 dark:text-blue-400 text-sm hover:underline"
                >
                  View Documentation →
                </Link>
              </div>
            </div>
            
            <Link 
              href="/docs/products/telique" 
              className="text-blue-600 dark:text-blue-400 text-sm hover:underline"
            >
              Learn more about Telique →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 