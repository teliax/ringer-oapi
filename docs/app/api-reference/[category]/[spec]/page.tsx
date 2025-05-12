import { loadOpenApiSpec, getPathsFromSpec } from '@/lib/openapi';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export interface ApiSpecPageProps {
  params: {
    category: string;
    spec: string;
  };
}

const methodColors = {
  get: 'bg-green-500',
  post: 'bg-blue-500',
  put: 'bg-amber-500',
  delete: 'bg-red-500',
  patch: 'bg-purple-500',
};

export default function ApiSpecPage({ params }: ApiSpecPageProps) {
  const { category, spec } = params;
  
  // Load the OpenAPI spec
  const openApiSpec = loadOpenApiSpec(category, spec);
  
  if (!openApiSpec) {
    notFound();
  }
  
  // Get all paths from the spec
  const paths = getPathsFromSpec(openApiSpec);
  
  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold mb-2">{openApiSpec.info?.title || spec}</h1>
            <p className="text-gray-600 dark:text-gray-400">
              {openApiSpec.info?.description}
            </p>
            
            {openApiSpec.info?.version && (
              <div className="mt-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-sm">
                  Version: {openApiSpec.info.version}
                </span>
              </div>
            )}
          </div>
          
          <Link
            href={`/api-reference/${category}/${spec}/swagger`}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            Swagger UI
          </Link>
        </div>
      </div>
      
      {openApiSpec.servers && openApiSpec.servers.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Base URLs</h2>
          <div className="space-y-2">
            {openApiSpec.servers.map((server, index) => (
              <div key={index} className="p-3 bg-gray-50 dark:bg-gray-900 rounded border font-mono">
                {server.url}
                {server.description && (
                  <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                    ({server.description})
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Endpoints</h2>
        
        {paths.length === 0 ? (
          <div className="text-gray-500 dark:text-gray-400">
            No endpoints found in this API specification.
          </div>
        ) : (
          <div className="space-y-4">
            {paths.map((endpoint, index) => {
              const methodColor = methodColors[endpoint.method as keyof typeof methodColors] || 'bg-gray-500';
              // Convert path to URL-friendly format
              const endpointPath = endpoint.path.replace(/^\//, '').replace(/\//g, '-');
              
              return (
                <Link
                  href={`/api-reference/${category}/${spec}/${endpointPath}`}
                  key={index}
                  className="border rounded-lg p-4 flex flex-col sm:flex-row hover:shadow-md transition-shadow block"
                >
                  <div className="flex items-center mb-2 sm:mb-0 sm:mr-4">
                    <span className={`px-2 py-1 ${methodColor} text-white rounded-md text-sm font-semibold mr-3 uppercase`}>
                      {endpoint.method}
                    </span>
                    <code className="font-mono text-sm">{endpoint.path}</code>
                  </div>
                  <div className="sm:ml-auto text-gray-600 dark:text-gray-400 text-sm">
                    {endpoint.summary}
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
      
      {openApiSpec.info?.contact && (
        <div className="border-t pt-6">
          <h2 className="text-xl font-semibold mb-3">Contact</h2>
          <dl>
            {openApiSpec.info.contact.name && (
              <div className="mb-2">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Name</dt>
                <dd className="mt-1">{openApiSpec.info.contact.name}</dd>
              </div>
            )}
            
            {openApiSpec.info.contact.email && (
              <div className="mb-2">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</dt>
                <dd className="mt-1">
                  <a href={`mailto:${openApiSpec.info.contact.email}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                    {openApiSpec.info.contact.email}
                  </a>
                </dd>
              </div>
            )}
            
            {openApiSpec.info.contact.url && (
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">URL</dt>
                <dd className="mt-1">
                  <a href={openApiSpec.info.contact.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                    {openApiSpec.info.contact.url}
                  </a>
                </dd>
              </div>
            )}
          </dl>
        </div>
      )}
    </div>
  );
} 