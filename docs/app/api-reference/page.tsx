import { getAllOpenApiSpecs, loadOpenApiSpec } from '@/lib/openapi';
import Link from 'next/link';

export default function ApiReferencePage() {
  // Get all available OpenAPI specs
  const specs = getAllOpenApiSpecs();
  
  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">API Reference</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Browse all available API specifications and endpoints
      </p>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {specs.map(({ category, name }) => {
          const spec = loadOpenApiSpec(category, name);
          
          return (
            <div key={`${category}-${name}`} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{spec?.info?.title || name}</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                  {spec?.info?.description?.slice(0, 120)}
                  {spec?.info?.description && spec.info.description.length > 120 ? '...' : ''}
                </p>
                
                <div className="flex justify-between items-center">
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {spec?.info?.version && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800">
                        v{spec.info.version}
                      </span>
                    )}
                  </div>
                  
                  <Link
                    href={`/api-reference/${category}/${name}`}
                    className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
                  >
                    View Documentation →
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {specs.length === 0 && (
        <div className="text-center py-10">
          <h3 className="text-xl font-medium text-gray-600 dark:text-gray-400">
            No API specifications found
          </h3>
          <p className="mt-2 text-gray-500">
            Please check the openapi directory and ensure it contains valid specification files.
          </p>
        </div>
      )}
    </div>
  );
} 