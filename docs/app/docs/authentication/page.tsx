export default function AuthenticationPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Authentication</h1>
      
      <p className="mb-4">
        Ringer API uses API keys to authenticate requests. You can view and manage your API keys in the Ringer Dashboard.
      </p>
      
      <div className="my-6 p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded">
        <p className="font-semibold">API Key Security</p>
        <p className="text-sm">Your API keys carry many privileges, so be sure to keep them secure! Do not share your API keys in publicly accessible areas such as GitHub, client-side code, or in your API calls directly.</p>
      </div>
      
      <h2 className="text-2xl font-semibold mt-8 mb-4">Authentication Methods</h2>
      
      <h3 className="text-xl font-semibold mt-6 mb-3">Bearer Token Authentication</h3>
      <p className="mb-4">
        For most API endpoints, you&apos;ll need to include your API key in the Authorization header:
      </p>
      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded font-mono text-sm mb-6 overflow-x-auto">
        Authorization: Bearer your_api_key
      </div>
      
      <h3 className="text-xl font-semibold mt-6 mb-3">Query Parameter Authentication</h3>
      <p className="mb-4">
        For testing, you can also pass your API key as a query parameter:
      </p>
      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded font-mono text-sm mb-6 overflow-x-auto">
        https://api.ringer.tel/v1/endpoint?api_key=your_api_key
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
        <strong>Note:</strong> We strongly recommend using the Bearer Token method in production.
      </p>
      
      <h2 className="text-2xl font-semibold mt-8 mb-4">API Key Management</h2>
      <p className="mb-4">
        You can manage your API keys through the Ringer Dashboard:
      </p>
      <ol className="list-decimal pl-6 mb-6 space-y-2">
        <li>Log in to your Ringer account</li>
        <li>Navigate to the API section</li>
        <li>Create, view, or revoke API keys as needed</li>
      </ol>
      
      <h2 className="text-2xl font-semibold mt-8 mb-4">Rate Limiting</h2>
      <p className="mb-4">
        API requests are subject to rate limiting. The current limits are:
      </p>
      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li>100 requests per minute for standard accounts</li>
        <li>1,000 requests per minute for business accounts</li>
        <li>Custom limits available for enterprise customers</li>
      </ul>
      <p className="mb-4">
        If you exceed the rate limit, you&apos;ll receive a <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded font-mono">429 Too Many Requests</code> response.
      </p>
    </div>
  )
} 