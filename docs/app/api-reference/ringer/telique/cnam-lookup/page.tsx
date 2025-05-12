export default function CNAMLookupPage() {
  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold mb-2">CNAM Lookup API</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Retrieve Caller Name (CNAM) information for a given phone number
      </p>
      
      <div className="mb-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <div className="flex items-center mb-4">
          <span className="px-2 py-1 bg-green-500 text-white rounded-md text-sm font-semibold mr-3">GET</span>
          <code className="font-mono">https://api.ringer.tel/v1/telique/cnam</code>
        </div>
        <p className="text-sm">
          This endpoint performs a CNAM (Caller Name) lookup for a specified phone number. It first checks 
          the database cache for existing records, and if not found, performs an SS7 network lookup to retrieve
          the caller name information.
        </p>
      </div>
      
      <div className="mb-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <div className="flex items-center mb-4">
          <span className="px-2 py-1 bg-blue-500 text-white rounded-md text-sm font-semibold mr-3">POST</span>
          <code className="font-mono">https://api.ringer.tel/v1/telique/cnam</code>
        </div>
        <p className="text-sm">
          Alternative method to perform a CNAM lookup using a POST request with form data.
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
              <td className="py-2 px-4 font-mono">number</td>
              <td className="py-2 px-4">string</td>
              <td className="py-2 px-4">Yes</td>
              <td className="py-2 px-4">The phone number to lookup. Must be 10-15 digits, possibly with a leading +.</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <h2 className="text-2xl font-semibold mt-8 mb-4">Response Format</h2>
      <p className="mb-4">
        The API returns a JSON response with the following structure:
      </p>
      
      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg font-mono text-sm mb-6 overflow-x-auto">
{`{
  "phoneNumber": "8005551234",
  "name": "ACME CORPORATION",
  "status": "success",
  "cacheHit": true
}`}
      </div>
      
      <div className="overflow-x-auto mb-8">
        <table className="min-w-full">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="py-2 px-4 text-left">Field</th>
              <th className="py-2 px-4 text-left">Type</th>
              <th className="py-2 px-4 text-left">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            <tr>
              <td className="py-2 px-4 font-mono">phoneNumber</td>
              <td className="py-2 px-4">string</td>
              <td className="py-2 px-4">The phone number that was looked up</td>
            </tr>
            <tr>
              <td className="py-2 px-4 font-mono">name</td>
              <td className="py-2 px-4">string</td>
              <td className="py-2 px-4">The caller name associated with the phone number</td>
            </tr>
            <tr>
              <td className="py-2 px-4 font-mono">status</td>
              <td className="py-2 px-4">string</td>
              <td className="py-2 px-4">"success" for successful lookups, "error" in case of failure</td>
            </tr>
            <tr>
              <td className="py-2 px-4 font-mono">error</td>
              <td className="py-2 px-4">string</td>
              <td className="py-2 px-4">Error message (only present when status is "error")</td>
            </tr>
            <tr>
              <td className="py-2 px-4 font-mono">cacheHit</td>
              <td className="py-2 px-4">boolean</td>
              <td className="py-2 px-4">Indicates whether the result was found in cache (true) or required an SS7 lookup (false)</td>
            </tr>
          </tbody>
        </table>
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
              <td className="py-2 px-4 font-mono">missing_phone_number</td>
              <td className="py-2 px-4">The required 'number' parameter was not provided</td>
            </tr>
            <tr>
              <td className="py-2 px-4">400</td>
              <td className="py-2 px-4 font-mono">invalid_phone_number</td>
              <td className="py-2 px-4">The provided phone number does not match the required format</td>
            </tr>
            <tr>
              <td className="py-2 px-4">405</td>
              <td className="py-2 px-4 font-mono">method_not_allowed</td>
              <td className="py-2 px-4">HTTP method other than GET or POST was used</td>
            </tr>
            <tr>
              <td className="py-2 px-4">500</td>
              <td className="py-2 px-4 font-mono">internal_server_error</td>
              <td className="py-2 px-4">An error occurred during the lookup operation</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <h2 className="text-2xl font-semibold mt-8 mb-4">Example Requests</h2>
      
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">cURL</h3>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg font-mono text-sm overflow-x-auto">
{`# GET request
curl -X GET "https://api.ringer.tel/v1/telique/cnam?number=8005551234" \\
  -H "Authorization: Bearer your_api_key"

# POST request
curl -X POST "https://api.ringer.tel/v1/telique/cnam" \\
  -H "Authorization: Bearer your_api_key" \\
  -d "number=8005551234"`}
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">JavaScript</h3>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg font-mono text-sm overflow-x-auto">
{`// Using fetch with GET
const apiKey = 'your_api_key';
const phoneNumber = '8005551234';

fetch(\`https://api.ringer.tel/v1/telique/cnam?number=\${phoneNumber}\`, {
  headers: {
    'Authorization': \`Bearer \${apiKey}\`
  }
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

// Using fetch with POST
fetch('https://api.ringer.tel/v1/telique/cnam', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': \`Bearer \${apiKey}\`
  },
  body: \`number=\${phoneNumber}\`
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));`}
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">Python</h3>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg font-mono text-sm overflow-x-auto">
{`# Using requests with GET
import requests

api_key = 'your_api_key'
phone_number = '8005551234'

headers = {
    'Authorization': f'Bearer {api_key}'
}

response = requests.get(
    'https://api.ringer.tel/v1/telique/cnam',
    params={'number': phone_number},
    headers=headers
)
data = response.json()
print(data)

# Using requests with POST
response = requests.post(
    'https://api.ringer.tel/v1/telique/cnam',
    data={'number': phone_number},
    headers=headers
)
data = response.json()
print(data)`}
        </div>
      </div>
      
      <h2 className="text-2xl font-semibold mt-8 mb-4">Notes</h2>
      <ul className="list-disc pl-5 space-y-2 mb-8">
        <li>Toll-free numbers (800, 888, 866, 877, 855) are handled specially and will always return "800 Service" as the name.</li>
        <li>Results are cached in the database to improve performance for future lookups.</li>
        <li>API usage may be tracked for billing or rate-limiting purposes.</li>
      </ul>
      
      <div className="mt-10 p-4 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/30">
        <h3 className="text-lg font-semibold mb-2">Try It Yourself</h3>
        <p className="mb-4">
          Use our interactive console to test the CNAM Lookup API with your own API key.
        </p>
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
          Open API Console
        </button>
      </div>
    </div>
  )
} 