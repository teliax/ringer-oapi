import React from 'react';

interface Parameter {
  name: string;
  in: string;
  description?: string;
  required?: boolean;
  schema?: {
    type?: string;
    format?: string;
    enum?: string[];
    default?: any;
    example?: any;
    pattern?: string;
    [key: string]: any;
  };
  [key: string]: any;
}

interface Response {
  description: string;
  content?: {
    [key: string]: {
      schema?: any;
      example?: any;
    };
  };
}

interface ApiEndpointProps {
  method: string;
  path: string;
  summary: string;
  description?: string;
  parameters?: Parameter[];
  requestBody?: any;
  responses?: {
    [statusCode: string]: Response;
  };
}

const methodColors = {
  get: 'bg-green-500',
  post: 'bg-blue-500',
  put: 'bg-amber-500',
  delete: 'bg-red-500',
  patch: 'bg-purple-500',
};

export default function ApiEndpoint({
  method,
  path,
  summary,
  description,
  parameters,
  requestBody,
  responses,
}: ApiEndpointProps) {
  const methodColor = methodColors[method.toLowerCase() as keyof typeof methodColors] || 'bg-gray-500';
  
  return (
    <div className="border rounded-lg overflow-hidden mb-8">
      <div className="bg-gray-100 dark:bg-gray-800 p-4 flex items-center">
        <span className={`px-3 py-1 ${methodColor} text-white rounded-md text-sm font-semibold mr-3 uppercase`}>
          {method}
        </span>
        <code className="font-mono">{path}</code>
      </div>
      
      <div className="p-6 space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-2">{summary}</h3>
          {description && <p className="text-gray-600 dark:text-gray-400">{description}</p>}
        </div>
        
        {parameters && parameters.length > 0 && (
          <div>
            <h4 className="text-lg font-semibold mb-3">Parameters</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Name</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Located in</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Required</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Type</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {parameters.map((param, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2 text-sm font-medium">{param.name}</td>
                      <td className="px-4 py-2 text-sm">{param.in}</td>
                      <td className="px-4 py-2 text-sm">{param.required ? 'Yes' : 'No'}</td>
                      <td className="px-4 py-2 text-sm font-mono">{param.schema?.type || ''}</td>
                      <td className="px-4 py-2 text-sm">{param.description || ''}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {requestBody && (
          <div>
            <h4 className="text-lg font-semibold mb-3">Request Body</h4>
            <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded border">
              {requestBody.description && (
                <p className="mb-3 text-gray-600 dark:text-gray-400">{requestBody.description}</p>
              )}
              {requestBody.content && Object.entries(requestBody.content).map(([contentType, content]: [string, any]) => (
                <div key={contentType}>
                  <div className="mb-2">
                    <span className="text-sm font-mono bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
                      {contentType}
                    </span>
                  </div>
                  {content.example && (
                    <pre className="p-3 bg-gray-800 text-gray-100 rounded overflow-x-auto">
                      <code>{JSON.stringify(content.example, null, 2)}</code>
                    </pre>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {responses && Object.keys(responses).length > 0 && (
          <div>
            <h4 className="text-lg font-semibold mb-3">Responses</h4>
            <div className="space-y-4">
              {Object.entries(responses).map(([statusCode, response]: [string, any]) => (
                <div key={statusCode} className="p-4 bg-gray-50 dark:bg-gray-900 rounded border">
                  <div className="flex items-center mb-2">
                    <span className={`px-2 py-1 rounded text-white text-sm font-semibold mr-2 ${
                      statusCode.startsWith('2') ? 'bg-green-500' : 
                      statusCode.startsWith('4') ? 'bg-orange-500' : 
                      statusCode.startsWith('5') ? 'bg-red-500' : 'bg-blue-500'
                    }`}>
                      {statusCode}
                    </span>
                    <span>{response.description}</span>
                  </div>
                  
                  {response.content && Object.entries(response.content).map(([contentType, content]: [string, any]) => (
                    <div key={contentType} className="mt-2">
                      <div className="mb-1">
                        <span className="text-sm font-mono bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
                          {contentType}
                        </span>
                      </div>
                      {content.example && (
                        <pre className="p-3 bg-gray-800 text-gray-100 rounded overflow-x-auto text-sm">
                          <code>{JSON.stringify(content.example, null, 2)}</code>
                        </pre>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 