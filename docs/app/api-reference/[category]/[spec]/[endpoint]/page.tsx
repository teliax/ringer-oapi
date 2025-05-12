import { loadOpenApiSpec, getEndpointDetails } from '@/lib/openapi';
import ApiEndpoint from '@/components/ApiEndpoint';
import { notFound } from 'next/navigation';

export interface EndpointPageProps {
  params: {
    category: string;
    spec: string;
    endpoint: string;
  };
}

export default function EndpointPage({ params }: EndpointPageProps) {
  const { category, spec, endpoint } = params;
  
  // Load the OpenAPI spec
  const openApiSpec = loadOpenApiSpec(category, spec);
  
  if (!openApiSpec) {
    notFound();
  }
  
  // Find the endpoint in the spec
  const paths = openApiSpec.paths || {};
  const endpointPath = Object.keys(paths).find(path => {
    // Remove leading slash and convert to kebab case
    const normalizedPath = path.replace(/^\//, '').replace(/\//g, '-');
    return normalizedPath === endpoint || path === `/${endpoint}`;
  });
  
  if (!endpointPath) {
    notFound();
  }
  
  // Find the HTTP method for this endpoint
  const methods = ['get', 'post', 'put', 'delete', 'patch'];
  const methodData = methods
    .map(method => ({ method, data: paths[endpointPath]?.[method] }))
    .find(({ data }) => !!data);
  
  if (!methodData) {
    notFound();
  }
  
  const { method, data } = methodData;
  
  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">{data.summary}</h1>
        <p className="text-gray-600 dark:text-gray-400">{data.description}</p>
      </div>
      
      <ApiEndpoint
        method={method}
        path={endpointPath}
        summary={data.summary}
        description={data.description}
        parameters={data.parameters}
        requestBody={data.requestBody}
        responses={data.responses}
      />
      
      {openApiSpec.info && (
        <div className="mt-12 border-t pt-6">
          <h2 className="text-xl font-semibold mb-2">API Information</h2>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">API Title</dt>
              <dd className="mt-1 text-lg">{openApiSpec.info.title}</dd>
            </div>
            
            <div>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Version</dt>
              <dd className="mt-1 text-lg">{openApiSpec.info.version}</dd>
            </div>
            
            {openApiSpec.info.contact && (
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Contact</dt>
                <dd className="mt-1">
                  {openApiSpec.info.contact.name && <div>{openApiSpec.info.contact.name}</div>}
                  {openApiSpec.info.contact.email && (
                    <a href={`mailto:${openApiSpec.info.contact.email}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                      {openApiSpec.info.contact.email}
                    </a>
                  )}
                </dd>
              </div>
            )}
          </dl>
        </div>
      )}
    </div>
  );
}

// Generate static paths for all endpoints
export async function generateStaticParams() {
  // For now, we'll return an empty array as we're working locally
  // This would be expanded when we want to pre-render pages
  return [];
} 