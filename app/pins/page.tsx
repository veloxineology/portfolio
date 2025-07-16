"use client";
import { TweetCard } from "@/components/prismui/tweet-card";
import { pins } from "@/lib/pins-data";
import Head from "next/head";
import { useMemo } from "react";

export default function PinsPage() {
  // Generate random like and reply counts for each pin
  const pinCounts = useMemo(
    () =>
      pins.map(() => ({
        likeCount: Math.floor(Math.random() * 1000) + 1,
        replyCount: Math.floor(Math.random() * 200) + 1,
      })),
    []
  );
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
      <div className="min-h-screen">
        <style jsx global>{`
          .pins-masonry {
            column-count: 3;
            column-gap: 20px;
            padding-left: 23px;
            padding-right: 23px;
            padding-top: 23px;
            padding-bottom: 23px;
            width: 100%;
            max-width: 100vw;
            margin: 0;
            background: none !important;
          }
          .pin-card-wrapper {
            break-inside: avoid;
            margin-bottom: 20px;
            width: 100%;
            display: block;
            padding: 0;
          }
        `}</style>
        <div className="pins-masonry">
          {pins.map((pin, i) => (
            <div key={i} className="pin-card-wrapper">
              <TweetCard {...pin} likeCount={pinCounts[i].likeCount} replyCount={pinCounts[i].replyCount} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
} 