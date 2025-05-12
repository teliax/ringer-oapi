'use client';

import { loadOpenApiSpec } from '@/lib/openapi';
import SwaggerUIDisplay from '@/components/SwaggerUIDisplay';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export interface SwaggerUIPageProps {
  params: {
    category: string;
    spec: string;
  };
}

export default function SwaggerUIPage({ params }: SwaggerUIPageProps) {
  const { category, spec } = params;
  
  // Load the OpenAPI spec
  const openApiSpec = loadOpenApiSpec(category, spec);
  
  if (!openApiSpec) {
    notFound();
  }
  
  return (
    <div className="w-full">
      <div className="mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">{openApiSpec.info?.title || spec} API</h1>
        
        <Link
          href={`/api-reference/${category}/${spec}`}
          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
        >
          ← Back to Docs
        </Link>
      </div>
      
      <div className="border rounded-lg overflow-hidden bg-white dark:bg-gray-900">
        <SwaggerUIDisplay specObject={openApiSpec} />
      </div>
    </div>
  );
} 