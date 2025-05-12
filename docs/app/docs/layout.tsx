import React from 'react';
import Link from 'next/link';

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row">
      <aside className="w-full md:w-64 p-6 bg-gray-50 dark:bg-gray-800 border-r dark:border-gray-700">
        <h2 className="text-xl font-bold mb-6">Documentation</h2>
        <nav>
          <ul className="space-y-2">
            <li>
              <span className="font-semibold block mb-2">Getting Started</span>
              <ul className="space-y-1 ml-4">
                <li>
                  <Link href="/docs/introduction" className="hover:underline">
                    Introduction
                  </Link>
                </li>
                <li>
                  <Link href="/docs/authentication" className="hover:underline">
                    Authentication
                  </Link>
                </li>
              </ul>
            </li>
            <li className="mt-4">
              <span className="font-semibold block mb-2">Products</span>
              <ul className="space-y-1 ml-4">
                <li>
                  <Link href="/docs/products/telique" className="hover:underline">
                    Telique
                  </Link>
                </li>
              </ul>
            </li>
            <li className="mt-4">
              <span className="font-semibold block mb-2">API Reference</span>
              <ul className="space-y-1 ml-4">
                <li>
                  <Link href="/api-reference/ringer" className="hover:underline">
                    Ringer
                  </Link>
                </li>
                <li>
                  <Link href="/api-reference/ringer-business" className="hover:underline">
                    Ringer Business
                  </Link>
                </li>
                <li>
                  <Link href="/api-reference/ringer-mobile" className="hover:underline">
                    Ringer Mobile
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
} 