export default function TeliqueLookupPage() {
  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold mb-2">Lookup API</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Query information for a single phone number
      </p>
      
      <div className="mb-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <div className="flex items-center mb-4">
          <span className="px-2 py-1 bg-green-500 text-white rounded-md text-sm font-semibold mr-3">GET</span>
          <code className="font-mono">https://api.ringer.tel/v1/telique/lookup</code>
        </div>
        <p className="text-sm">
          Returns detailed information about a specified phone number, including caller name (CNAM) data, 
          line type, and other available metadata.
        </p>
      </div>
      
      <h2 className="text-2xl font-semibold mt-8 mb-4">Authentication</h2>
      <p className="mb-4">
        This endpoint requires authentication. See our <a href="/docs/authentication" className="text-blue-600 dark:text-blue-400 hover:underline">Authentication Guide</a> for details.
      </p>
      
      <h2 className="text-2xl font-semibold mt-8 mb-4">Request Parameters</h2>
      <div className="overflow-x-auto mb-8">
        <table className="min-w-full">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="py-2 px-4 text-left">Parameter</th>
              <th className="py-2 px-4 text-left">Type</th>
              <th className="py-2 px-4 text-left">Required</th>
              <th className="py-2 px-4 text-left">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            <tr>
              <td className="py-2 px-4 font-mono">phone_number</td>
              <td className="py-2 px-4">string</td>
              <td className="py-2 px-4">Yes</td>
              <td className="py-2 px-4">The phone number to look up in E.164 format (e.g., +18005551234)</td>
            </tr>
            <tr>
              <td className="py-2 px-4 font-mono">include_cnam</td>
              <td className="py-2 px-4">boolean</td>
              <td className="py-2 px-4">No</td>
              <td className="py-2 px-4">Whether to include caller name information (default: true)</td>
            </tr>
            <tr>
              <td className="py-2 px-4 font-mono">include_line_type</td>
              <td className="py-2 px-4">boolean</td>
              <td className="py-2 px-4">No</td>
              <td className="py-2 px-4">Whether to include line type information (default: true)</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <h2 className="text-2xl font-semibold mt-8 mb-4">Response Format</h2>
      <p className="mb-4">
        The API returns data in JSON format with the following structure:
      </p>
      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg font-mono text-sm mb-6 overflow-x-auto">
{`{
  "status": "success",
  "data": {
    "phone_number": "+18005551234",
    "cnam": {
      "caller_name": "JOHN SMITH",
      "caller_type": "CONSUMER",
      "last_updated": "2023-05-15T12:34:56Z"
    },
    "line_type": {
      "type": "FIXED_LINE",
      "carrier": "Example Telecom"
    },
    "location": {
      "country": "US",
      "state": "CA",
      "city": "Los Angeles"
    }
  }
}`}
      </div>
      
      <h2 className="text-2xl font-semibold mt-8 mb-4">Error Codes</h2>
      <div className="overflow-x-auto mb-8">
        <table className="min-w-full">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="py-2 px-4 text-left">Status Code</th>
              <th className="py-2 px-4 text-left">Error Code</th>
              <th className="py-2 px-4 text-left">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            <tr>
              <td className="py-2 px-4">400</td>
              <td className="py-2 px-4 font-mono">invalid_phone_number</td>
              <td className="py-2 px-4">The provided phone number is invalid or in an unsupported format.</td>
            </tr>
            <tr>
              <td className="py-2 px-4">401</td>
              <td className="py-2 px-4 font-mono">unauthorized</td>
              <td className="py-2 px-4">Authentication failed. Check your API key.</td>
            </tr>
            <tr>
              <td className="py-2 px-4">404</td>
              <td className="py-2 px-4 font-mono">not_found</td>
              <td className="py-2 px-4">No data found for the specified phone number.</td>
            </tr>
            <tr>
              <td className="py-2 px-4">429</td>
              <td className="py-2 px-4 font-mono">rate_limit_exceeded</td>
              <td className="py-2 px-4">You have exceeded your rate limit. Try again later.</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <h2 className="text-2xl font-semibold mt-8 mb-4">Example Request</h2>
      
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">cURL</h3>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg font-mono text-sm overflow-x-auto">
{`curl -X GET \\
  'https://api.ringer.tel/v1/telique/lookup?phone_number=%2B18005551234' \\
  -H 'Authorization: Bearer your_api_key'`}
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">JavaScript</h3>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg font-mono text-sm overflow-x-auto">
{`const fetch = require('node-fetch');

const apiKey = 'your_api_key';
const phoneNumber = '+18005551234';

fetch(\`https://api.ringer.tel/v1/telique/lookup?phone_number=\${encodeURIComponent(phoneNumber)}\`, {
  headers: {
    'Authorization': \`Bearer \${apiKey}\`
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`}
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">Python</h3>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg font-mono text-sm overflow-x-auto">
{`import requests

api_key = 'your_api_key'
phone_number = '+18005551234'

headers = {
    'Authorization': f'Bearer {api_key}'
}

response = requests.get(
    f'https://api.ringer.tel/v1/telique/lookup',
    params={'phone_number': phone_number},
    headers=headers
)

data = response.json()
print(data)`}
        </div>
      </div>
      
      <div className="mt-10 p-4 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/30">
        <h3 className="text-lg font-semibold mb-2">Try It Yourself</h3>
        <p className="mb-4">
          Use our interactive console to test the Lookup API with your own API key.
        </p>
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
          Open API Console
        </button>
      </div>
    </div>
  )
} 