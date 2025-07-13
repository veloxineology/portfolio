import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import type { ReactElement } from 'react';

// Dynamically import the client component with no SSR
const BlogPageClient = dynamic(() => import('./blog-page'), {
  ssr: false,
  loading: () => <BlogLoadingState />,
});

// Simple loading state component
function BlogLoadingState(): ReactElement {
  return (
    <div className="min-h-screen px-8 md:px-16 lg:px-24 py-12 main-content-mobile-pb">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
          <h1 className="text-3xl font-mono font-bold text-primary">// Blog & Thoughts</h1>
          <div className="relative max-w-md w-full h-12 bg-card animate-pulse rounded-xl"></div>
        </div>
        <div className="space-y-8 mb-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-8 bg-card rounded-lg w-3/4 mb-4"></div>
              <div className="h-4 bg-card rounded-lg w-full mb-2"></div>
              <div className="h-4 bg-card rounded-lg w-5/6 mb-6"></div>
              <div className="flex gap-4 mb-4">
                <div className="h-4 bg-card rounded-lg w-24"></div>
                <div className="h-4 bg-card rounded-lg w-24"></div>
              </div>
              <div className="flex gap-3">
                <div className="h-4 bg-card rounded-lg w-16"></div>
                <div className="h-4 bg-card rounded-lg w-16"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function BlogPageServer(): ReactElement {
  return (
    <Suspense fallback={<BlogLoadingState />}>
      <BlogPageClient />
    </Suspense>
  );
}