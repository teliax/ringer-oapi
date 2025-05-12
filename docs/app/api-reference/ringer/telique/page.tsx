import Link from 'next/link';

export default function TeliqueApiOverviewPage() {
  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold mb-2">Telique API Reference</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Comprehensive API for accessing telecommunications data
      </p>
      
      <div className="mb-8">
        <p className="mb-4">
          The Telique API provides access to telecommunications data, including caller name (CNAM) data, 
          line type information, and more. All endpoints require authentication via API key.
        </p>
        
        <Link 
          href="/docs/products/telique" 
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          Learn more about Telique →
        </Link>
      </div>
      
      <h2 className="text-2xl font-semibold mt-10 mb-4">All Endpoints</h2>
      
      <div className="space-y-6">
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-gray-100 dark:bg-gray-800 p-4 flex items-center">
            <span className="px-2 py-1 bg-green-500 text-white rounded-md text-sm font-semibold mr-3">GET</span>
            <code className="font-mono">/v1/telique/lookup</code>
          </div>
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">Lookup API</h3>
            <p className="mb-4">
              Returns detailed information about a specified phone number, including caller name data,
              line type, and other available metadata.
            </p>
            <Link 
              href="/api-reference/ringer/telique/lookup" 
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              View Documentation →
            </Link>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-gray-100 dark:bg-gray-800 p-4 flex items-center">
            <span className="px-2 py-1 bg-green-500 text-white rounded-md text-sm font-semibold mr-3">GET</span>
            <code className="font-mono">/v1/telique/cnam</code>
          </div>
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">CNAM Lookup API</h3>
            <p className="mb-4">
              Retrieve Caller Name (CNAM) information for a given phone number, using database cache
              or performing an SS7 network lookup when needed.
            </p>
            <Link 
              href="/api-reference/ringer/telique/cnam-lookup" 
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              View Documentation →
            </Link>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-gray-100 dark:bg-gray-800 p-4 flex items-center">
            <span className="px-2 py-1 bg-blue-500 text-white rounded-md text-sm font-semibold mr-3">POST</span>
            <code className="font-mono">/v1/telique/bulk-lookup</code>
          </div>
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">Bulk Lookup API</h3>
            <p className="mb-4">
              Returns detailed information about multiple phone numbers in a single request,
              supporting up to 100 numbers per call.
            </p>
            <Link 
              href="/api-reference/ringer/telique/bulk-lookup" 
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              View Documentation →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 