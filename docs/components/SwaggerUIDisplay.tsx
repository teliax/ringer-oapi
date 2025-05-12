'use client';

import { useEffect, useState } from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

interface SwaggerUIDisplayProps {
  specUrl?: string;
  specObject?: any;
}

export default function SwaggerUIDisplay({ specUrl, specObject }: SwaggerUIDisplayProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Handle client-side only rendering for Swagger UI
  if (!isMounted) {
    return <div className="p-10 text-center">Loading Swagger UI...</div>;
  }

  return (
    <div className="swagger-ui-container">
      <style jsx global>{`
        .swagger-ui .topbar {
          display: none;
        }
        .swagger-ui-container .info {
          margin-top: 20px;
        }
        .swagger-ui .scheme-container {
          background-color: transparent;
          box-shadow: none;
          margin: 0;
          padding: 0;
        }
      `}</style>
      <SwaggerUI url={specUrl} spec={specObject} />
    </div>
  );
} 