import Link from 'next/link';

export default function TeliquePage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Telique</h1>
      
      <p className="mb-4">
        Telique is Ringer&apos;s database API tool that provides access to telecommunications data. 
        It allows you to query information about phone numbers, such as caller name (CNAM) data, 
        line type information, and more.
      </p>
      
      <h2 className="text-2xl font-semibold mt-8 mb-4">Key Features</h2>
      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li><strong>Phone Number Lookup</strong> - Get detailed information about a phone number</li>
        <li><strong>CNAM Lookup</strong> - Retrieve caller name information for a phone number</li>
        <li><strong>Bulk Lookup</strong> - Process multiple phone numbers in a single request</li>
        <li><strong>Real-time Data</strong> - Access up-to-date telecommunications information</li>
        <li><strong>High Reliability</strong> - Enterprise-grade uptime and performance</li>
      </ul>
      
      <h2 className="text-2xl font-semibold mt-8 mb-4">Available Endpoints</h2>
      <div className="space-y-4 mb-8">
        <div className="p-4 border rounded">
          <h3 className="text-lg font-semibold mb-2">Lookup API</h3>
          <div className="flex items-center mb-2">
            <span className="px-2 py-1 bg-green-500 text-white rounded-md text-xs font-semibold mr-2">GET</span>
            <code className="font-mono text-sm">/v1/telique/lookup</code>
          </div>
          <p className="text-sm mb-2">
            Returns detailed information about a specified phone number, including caller name data,
            line type, and other available metadata.
          </p>
          <Link 
            href="/api-reference/ringer/telique/lookup" 
            className="text-blue-600 dark:text-blue-400 text-sm hover:underline"
          >
            View API Reference →
          </Link>
        </div>
        
        <div className="p-4 border rounded">
          <h3 className="text-lg font-semibold mb-2">CNAM Lookup API</h3>
          <div className="flex items-center mb-2">
            <span className="px-2 py-1 bg-green-500 text-white rounded-md text-xs font-semibold mr-2">GET</span>
            <code className="font-mono text-sm">/v1/telique/cnam</code>
          </div>
          <p className="text-sm mb-2">
            Retrieve Caller Name (CNAM) information for a given phone number, using database cache
            or performing an SS7 network lookup when needed.
          </p>
          <Link 
            href="/api-reference/ringer/telique/cnam-lookup" 
            className="text-blue-600 dark:text-blue-400 text-sm hover:underline"
          >
            View API Reference →
          </Link>
        </div>
        
        <div className="p-4 border rounded">
          <h3 className="text-lg font-semibold mb-2">Bulk Lookup API</h3>
          <div className="flex items-center mb-2">
            <span className="px-2 py-1 bg-blue-500 text-white rounded-md text-xs font-semibold mr-2">POST</span>
            <code className="font-mono text-sm">/v1/telique/bulk-lookup</code>
          </div>
          <p className="text-sm mb-2">
            Returns detailed information about multiple phone numbers in a single request,
            supporting up to 100 numbers per call.
          </p>
          <Link 
            href="/api-reference/ringer/telique/bulk-lookup" 
            className="text-blue-600 dark:text-blue-400 text-sm hover:underline"
          >
            View API Reference →
          </Link>
        </div>
      </div>
      
      <h2 className="text-2xl font-semibold mt-8 mb-4">Common Use Cases</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="p-4 border rounded shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Call Center Management</h3>
          <p className="text-sm">Identify incoming callers before answering to personalize customer service experiences.</p>
        </div>
        <div className="p-4 border rounded shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Fraud Prevention</h3>
          <p className="text-sm">Verify phone numbers during account creation or authentication to reduce fraud.</p>
        </div>
        <div className="p-4 border rounded shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Data Enrichment</h3>
          <p className="text-sm">Enhance your customer database with accurate caller information.</p>
        </div>
        <div className="p-4 border rounded shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Lead Qualification</h3>
          <p className="text-sm">Filter and prioritize leads based on phone number data.</p>
        </div>
      </div>
      
      <h2 className="text-2xl font-semibold mt-8 mb-4">Getting Started</h2>
      <ol className="list-decimal pl-6 space-y-2 mb-6">
        <li>
          <Link href="/docs/authentication" className="text-blue-600 dark:text-blue-400 hover:underline">
            Obtain your API key
          </Link>
        </li>
        <li>Choose the appropriate endpoint for your needs</li>
        <li>Make your first API request following our examples</li>
      </ol>
      
      <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/30 rounded">
        <h3 className="text-xl font-semibold mb-2">Need More Information?</h3>
        <p className="mb-2">
          Visit our 
          <Link href="/api-reference/ringer/telique" className="text-blue-600 dark:text-blue-400 mx-1 hover:underline">
            API Reference
          </Link>
          for detailed information about request and response formats, error codes, and more.
        </p>
      </div>
    </div>
  )
} 