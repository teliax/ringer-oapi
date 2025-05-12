import Link from 'next/link';

export default function TeliquePage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Telique</h1>
      
      <p className="mb-4">
        Telique is Ringer's database API tool that provides access to telecommunications data. 
        It allows you to query information about phone numbers, such as caller name (CNAM) data, 
        line type information, and more.
      </p>
      
      <h2 className="text-2xl font-semibold mt-8 mb-4">Key Features</h2>
      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li><strong>Phone Number Lookup</strong> - Get detailed information about a phone number</li>
        <li><strong>Bulk Lookup</strong> - Process multiple phone numbers in a single request</li>
        <li><strong>Real-time Data</strong> - Access up-to-date telecommunications information</li>
        <li><strong>High Reliability</strong> - Enterprise-grade uptime and performance</li>
      </ul>
      
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
      
      <h2 className="text-2xl font-semibold mt-8 mb-4">API Reference</h2>
      <p className="mb-4">
        Telique provides the following API endpoints:
      </p>
      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li>
          <Link href="/api-reference/ringer/telique/lookup" className="text-blue-600 dark:text-blue-400 hover:underline">
            Lookup API
          </Link>
          <span className="ml-2">- Query information for a single phone number</span>
        </li>
        <li>
          <Link href="/api-reference/ringer/telique/bulk-lookup" className="text-blue-600 dark:text-blue-400 hover:underline">
            Bulk Lookup API
          </Link>
          <span className="ml-2">- Query information for multiple phone numbers at once</span>
        </li>
      </ul>
      
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