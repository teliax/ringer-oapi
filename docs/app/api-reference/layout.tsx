import React from 'react';
import Link from 'next/link';

export default function ApiReferenceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row">
      <aside className="w-full md:w-64 p-6 bg-gray-50 dark:bg-gray-800 border-r dark:border-gray-700">
        <h2 className="text-xl font-bold mb-6">API Reference</h2>
        <nav>
          <ul className="space-y-2">
            <li>
              <span className="font-semibold block mb-2">Ringer</span>
              <ul className="space-y-1 ml-4">
                <li>
                  <span className="font-medium block mb-1">Telique</span>
                  <ul className="space-y-1 ml-4">
                    <li>
                      <Link href="/api-reference/ringer/telique/lookup" className="hover:underline">
                        Lookup
                      </Link>
                    </li>
                    <li>
                      <Link href="/api-reference/ringer/telique/bulk-lookup" className="hover:underline">
                        Bulk Lookup
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li className="mt-4">
              <span className="font-semibold block mb-2">Ringer Business</span>
              <ul className="space-y-1 ml-4">
                <li>
                  <Link href="/api-reference/ringer-business" className="hover:underline">
                    Overview
                  </Link>
                </li>
              </ul>
            </li>
            <li className="mt-4">
              <span className="font-semibold block mb-2">Ringer Mobile</span>
              <ul className="space-y-1 ml-4">
                <li>
                  <Link href="/api-reference/ringer-mobile" className="hover:underline">
                    Overview
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