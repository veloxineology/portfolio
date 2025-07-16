"use client";
import { CardStack } from "@/components/ui/card-stack";
import { pins } from "@/lib/pins-data";
import ReactMarkdown from "react-markdown";
import { CodeBlock } from "@/components/ui/code-block";
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
          <div className="flex justify-center">
            <CardStack
              items={pins.map((pin) => ({
                ...pin,
                content: (
                  <ReactMarkdown
                    components={{
                      code({node, inline, className, children, ...props}) {
                        const match = /language-(\w+)/.exec(className || "");
                        return !inline ? (
                          <CodeBlock
                            language={match ? match[1] : "text"}
                            filename={""}
                            code={String(children).replace(/\n$/, "")}
                          />
                        ) : (
                          <code className={className} {...props}>{children}</code>
                        );
                      },
                    }}
                  >
                    {pin.content}
                  </ReactMarkdown>
                ),
              }))}
            />
          </div>
        </div>
      </div>
    </>
  );
} 