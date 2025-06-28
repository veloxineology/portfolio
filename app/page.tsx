import { siteData } from "@/lib/site-data"
import HomePageClient from "@/components/home-page-client"
import Image from "next/image"

export default function Page() {
  const { home, about } = siteData
  
  return (
    <div className="min-h-screen">
      {/* Server-rendered critical content for immediate LCP */}
      <div id="server-content" className="min-h-screen px-8 md:px-16 lg:px-24 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-12">
            {/* Hero Section - Critical content rendered immediately */}
            <div className="grid lg:grid-cols-3 gap-8 items-start">
              {/* Left: Profile & Intro */}
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-start gap-6">
                  {/* Profile Photo */}
                  <div className="relative flex-shrink-0">
                    <div className="w-24 h-24 rounded-lg overflow-hidden font-mono">
                      <Image
                        src={about.profileImage || "/image-not-found.png"}
                        width={120}
                        height={120}
                        alt="Kaushik"
                        className="w-full h-full object-cover"
                        priority
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                      />
                    </div>
                    <div className="absolute -bottom-2 -right-2 text-2xl">{about.signatureEmoji}</div>
                  </div>

                  {/* Name & Intro - Critical LCP content */}
                  <div className="flex-1 h-24 flex flex-col justify-center">
                    <div className="mb-1">
                      <h1 className="text-4xl md:text-5xl font-bold text-primary leading-tight font-sans">{home.name}</h1>
                      <div className="flex items-baseline gap-3 mt-1">
                        <p className="text-xl md:text-2xl font-medium text-accent font-sans">{home.tagline}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded Description - This is the LCP element */}
                <div className="max-w-2xl">
                  <p className="font-mono text-sm text-secondary leading-relaxed">{home.description}</p>
                </div>
              </div>

              {/* Right: Placeholder for client components */}
              <div className="space-y-6">
                <div className="h-32 bg-accent/5 rounded-lg border border-accent/20 animate-pulse"></div>
                <div className="h-48 bg-accent/5 rounded-lg border border-accent/20 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Client-side enhanced content */}
      <HomePageClient home={home} about={about} />
    </div>
  )
}
