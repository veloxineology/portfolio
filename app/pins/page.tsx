"use client";
import { TweetCard } from "@/components/prismui/tweet-card";
import { pins } from "@/lib/pins-data";
import Head from "next/head";

export default function PinsPage() {
  return (
    <>
      <Head>
        <title>Pins | Kaushik S</title>
        <meta name="description" content="Curated pins, thoughts, and highlights from Kaushik S. Explore top ideas, code, and inspiration." />
        <link rel="canonical" href="https://kaushikieee.me/pins" />
        <meta property="og:title" content="Pins | Kaushik S" />
        <meta property="og:description" content="Curated pins, thoughts, and highlights from Kaushik S. Explore top ideas, code, and inspiration." />
        <meta property="og:url" content="https://kaushikieee.me/pins" />
        <meta property="og:type" content="website" />
      </Head>
      <div className="min-h-screen px-8 md:px-16 lg:px-24 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-primary mb-8">// Pins</h1>
          <div
            className="gap-6"
            style={{
              columnCount: 1,
              columnGap: 24,
            }}
          >
            {/* Responsive columns via media queries */}
            <style>{`
              @media (min-width: 600px) {
                .pins-masonry { column-count: 2; }
              }
              @media (min-width: 900px) {
                .pins-masonry { column-count: 3; }
              }
              @media (min-width: 1200px) {
                .pins-masonry { column-count: 4; }
              }
            `}</style>
            <div className="pins-masonry bg-white dark:bg-[#15202b]">
              {pins.map((pin, i) => (
                <div key={i} style={{ breakInside: 'avoid', marginBottom: 24 }}>
                  <TweetCard {...pin} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 