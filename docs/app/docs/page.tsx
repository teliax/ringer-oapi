export default function DocsPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Ringer API Documentation</h1>
      
      <p className="mb-4">
        Welcome to the Ringer API documentation. This documentation will help you integrate with our
        APIs across all Ringer business entities - Ringer, Ringer Business, and Ringer Mobile.
      </p>
      
      <h2 className="text-2xl font-semibold mt-8 mb-4">Getting Started</h2>
      <p className="mb-4">
        To get started with the Ringer API, you&apos;ll need to:
      </p>
      <ol className="list-decimal pl-6 mb-6 space-y-2">
        <li>Sign up for a Ringer account</li>
        <li>Obtain your API key</li>
        <li>Choose the appropriate API for your needs</li>
        <li>Make your first API request</li>
      </ol>
      
      <h2 className="text-2xl font-semibold mt-8 mb-4">API Structure</h2>
      <p className="mb-4">
        Our API is organized around REST. All requests should be made to endpoints starting with 
        <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded font-mono">https://api.ringer.tel/v1/</code>, 
        use JSON-encoded bodies, and return JSON-encoded responses.
      </p>
      
      <h2 className="text-2xl font-semibold mt-8 mb-4">Available Products</h2>
      <p className="mb-4">
        We currently offer the following products through our API:
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li><strong>Telique</strong> - Our database API tool for telecommunications data</li>
      </ul>
      
      <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/30 rounded">
        <h3 className="text-xl font-semibold mb-2">Need Help?</h3>
        <p>
          If you need assistance with our API, please contact our support team at 
          <a href="mailto:support@ringer.tel" className="text-blue-600 dark:text-blue-400 ml-1">support@ringer.tel</a>
        </p>
      </div>
    </div>
  )
} 