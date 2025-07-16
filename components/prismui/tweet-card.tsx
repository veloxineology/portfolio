"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Heart, MessageCircle } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import html2canvas from 'html2canvas';

export interface TweetCardProps {
  user: {
    name: string;
    screen_name: string;
    url: string;
    profile_image_url_https?: string;
    profile_image_shape?: "Circle" | "Square";
    verified?: boolean;
    is_blue_verified?: boolean;
    verified_type?: string;
  };
  text: string;
  date: string;
  url: string;
  like_url: string;
  reply_url: string;
  favorite_count: number;
  conversation_count: number;
  photos?: { url: string }[];
  video?: {
    poster: string;
    variants: { src: string; type: string; bitrate?: number }[];
  };
  iconVariant?: "twitter" | "x";
  className?: string;
  compact?: boolean;
  hideMedia?: boolean;
  likeCount: number;
  replyCount: number;
  avatarUrl: string;
  displayName: string;
  username: string;
}

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
}

function truncate(str: string, length: number) {
  if (!str || str.length <= length) return str;
  return str.slice(0, length) + "...";
}

export function TweetCard({
  user,
  text,
  date,
  url,
  like_url,
  reply_url,
  favorite_count,
  conversation_count,
  photos,
  video,
  iconVariant = "twitter",
  className,
  compact = false,
  hideMedia = false,
  likeCount,
  replyCount,
  id, // if available, or use index as fallback
  avatarUrl,
  displayName,
  username,
  ...rest
}: TweetCardProps & { id?: string | number }) {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = React.useState(false);
  const [showDownloadCard, setShowDownloadCard] = React.useState(false);

  // Helper: Inline-styled download card
  const DownloadCard = () => (
    <div
      id="tweetcard-download-temp"
      style={{
        width: 375,
        minHeight: 168,
        background: '#F5F8FA',
        color: '#0f1419',
        borderRadius: 16,
        boxShadow: '0 1px 3px rgba(20,23,26,0.04)',
        border: '1px solid #e1e8ed',
        fontFamily: 'Chirp, sans-serif',
        padding: 24,
        position: 'absolute',
        left: -9999,
        top: 0,
        zIndex: -1,
        display: 'block',
      }}
    >
      {/* Profile row */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
        <img src={avatarUrl} alt="avatar" style={{ width: 48, height: 48, borderRadius: '50%', marginRight: 12 }} />
        <div>
          <div style={{ fontWeight: 700, fontSize: 16 }}>{displayName}</div>
          <div style={{ color: '#536471', fontSize: 14 }}>{username}</div>
        </div>
        <img src="/twitterlogo.png" alt="twitter logo" style={{ width: 24, height: 24, marginLeft: 'auto' }} />
      </div>
      {/* Tweet text */}
      <div style={{ fontSize: 18, marginBottom: 16 }}>{text}</div>
      {/* Actions row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginTop: 16 }}>
        {/* Like */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <svg viewBox="0 0 24 24" width={20} height={20} style={{ display: 'inline', verticalAlign: 'middle' }}><g><path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"></path></g></svg>
          <span>{likeCount}</span>
        </div>
        {/* Reply */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <svg viewBox="0 0 24 24" width={20} height={20} style={{ display: 'inline', verticalAlign: 'middle' }}><g><path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"></path></g></svg>
          <span>{replyCount}</span>
        </div>
        {/* Reshare */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <svg viewBox="0 0 24 24" width={20} height={20} style={{ display: 'inline', verticalAlign: 'middle' }}><g><path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z"></path></g></svg>
          <span>{Math.floor(Math.random() * 100) + 1}</span>
        </div>
      </div>
    </div>
  );

  const handleDownload = async () => {
    setShowDownloadCard(true);
    await new Promise((r) => setTimeout(r, 20));
    const temp = document.getElementById('tweetcard-download-temp');
    if (!temp) return;
    const canvas = await html2canvas(temp, {
      backgroundColor: '#fff',
      scale: 2,
      useCORS: true,
    });
    setShowDownloadCard(false);
    const link = document.createElement('a');
    link.download = `pin-${id ?? Math.floor(Math.random() * 100000)}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  // Use the twitterlogo.png from public for the Twitter icon
  const createdAt = new Date(date);
  const hasMedia = !hideMedia && (video || (photos && photos.length > 0));
  const reshareCount = React.useMemo(() => Math.floor(Math.random() * 100) + 1, []);

  return (
    <>
      {showDownloadCard && <DownloadCard />}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card
          ref={cardRef}
          className={cn(
            "group relative overflow-hidden transition-all duration-200 hover:shadow-lg",
            "tweet-card-twitter-light",
            { 'tweetcard-download': downloading },
            "dark:bg-[#15202b] dark:border-[#22303c] dark:text-white",
            className
          )}
          style={{
            width: '100%',
            minHeight: 168,
            maxWidth: '100%',
            borderRadius: 16,
            boxShadow: '0 1px 3px rgba(20,23,26,0.04)',
            border: '1px solid #e1e8ed',
            position: 'relative',
            padding: 0,
            fontFamily: 'Chirp, sans-serif',
            color: 'var(--tweetcard-text, #0f1419)',
            backgroundColor: 'var(--tweetcard-bg, #F5F8FA)',
            // @ts-ignore
            '--tw-bg-opacity': '1',
          }}
        >
          <style jsx global>{`
            .tweetcard-download {
              background: #F5F8FA !important;
              color: #0f1419 !important;
              font-family: 'Chirp', sans-serif !important;
            }
            .tweetcard-download * {
              color: #0f1419 !important;
              font-family: 'Chirp', sans-serif !important;
            }
          `}</style>
          <div
            className={cn("p-6", {
              "pb-3": compact,
              "p-4": hideMedia || compact,
            })}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <a
                  href={user.url}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#1da1f2] focus:ring-offset-2"
                >
                  <div
                    className={cn(
                      "overflow-hidden border border-gray-200/50 bg-gradient-to-br from-white to-gray-50 transition-all not-prose",
                      {
                        "h-10 w-10": !compact,
                        "h-8 w-8": compact,
                        "rounded-full":
                          user.profile_image_shape === "Circle" ||
                          !user.profile_image_shape,
                        "rounded-md": user.profile_image_shape === "Square",
                      }
                    )}
                  >
                    <div className="relative h-full w-full">
                      <Image
                        alt={user.screen_name}
                        src={user.profile_image_url_https || "/favicon.png"}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  </div>
                </a>
                <div>
                  <a
                    href={user.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center font-semibold transition-colors hover:text-[#1da1f2] focus:outline-none focus:ring-2 focus:ring-[#1da1f2] focus:ring-offset-2 dark:text-white"
                    style={{ color: '#14171a' }}
                  >
                    {truncate(user.name, compact ? 15 : 20)}
                    {(user.verified ||
                      user.is_blue_verified ||
                      user.verified_type) && (
                      <motion.svg
                        aria-label="Verified Account"
                        className={cn("ml-1 inline", {
                          "h-4 w-4": !compact,
                          "h-3 w-3": compact,
                          "text-[#1da1f2]": user.is_blue_verified,
                          "text-yellow-500": user.verified_type === "Business",
                        })}
                        viewBox="0 0 24 24"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          damping: 10,
                        }}
                      >
                        <g fill="currentColor">
                          <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z" />
                        </g>
                      </motion.svg>
                    )}
                  </a>
                  <div className="flex items-center space-x-1">
                    <a
                      href={user.url}
                      target="_blank"
                      rel="noreferrer"
                      className={cn(
                        "transition-all duration-75 hover:text-[#1da1f2]",
                        {
                          "text-sm": !compact,
                          "text-xs": compact,
                        },
                        "dark:text-[#657786]"
                      )}
                      style={{ color: '#657786' }}
                    >
                      @{truncate(user.screen_name, compact ? 12 : 16)}
                    </a>
                    <span className="text-[#657786] dark:text-[#657786]">·</span>
                    <a
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      className={cn(
                        "transition-all duration-75 hover:text-[#1da1f2]",
                        {
                          "text-sm": !compact,
                          "text-xs": compact,
                        }
                      )}
                      style={{ color: '#657786' }}
                    >
                      {createdAt.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </a>
                  </div>
                </div>
              </div>
              {/* Twitter icon in top right */}
              <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="ml-2 flex-shrink-0">
                <Image
                  src="/twitterlogo.png"
                  alt="Twitter"
                  width={20}
                  height={20}
                  className="object-contain"
                  style={{ minWidth: 20, minHeight: 20 }}
                  priority
                />
              </a>
            </div>

            <div
              className={cn("whitespace-pre-wrap", {
                "mb-2 mt-4 text-[15px]": !compact,
                "mb-1 mt-2 text-sm": compact,
              })}
              style={{ color: '#14171a', fontFamily: 'Chirp, sans-serif' }}
            >
              {text}
            </div>

            {!hideMedia && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="my-3"
              >
                {video && (
                  <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-border not-prose">
                    {video.variants.length > 0 && (
                      <video
                        className="h-full w-full"
                        controls
                        preload="metadata"
                        poster={video.poster}
                      >
                        {video.variants
                          .filter((v) => v.type === "video/mp4")
                          .sort(
                            (a, b) =>
                              ((b as any).bitrate || 0) -
                              ((a as any).bitrate || 0)
                          )
                          .map((v, i) => (
                            <source key={i} src={v.src} type={v.type} />
                          ))}
                        Your browser does not support the video tag.
                      </video>
                    )}
                  </div>
                )}
                {photos && !video && (
                  <div
                    className={cn("grid gap-2 not-prose", {
                      "grid-cols-1": photos.length === 1,
                      "grid-cols-2": photos.length > 1,
                    })}
                  >
                    {photos.map((photo, i) => (
                      <a key={i} href={url} target="_blank" rel="noreferrer">
                        <div className="relative aspect-video overflow-hidden rounded-lg border border-border">
                          <Image
                            src={photo.url}
                            alt={text}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            unoptimized
                          />
                        </div>
                      </a>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* Actions row */}
            <div className="flex items-center justify-start space-x-6 mt-4">
              {/* Heart icon and count */}
              <div dir="ltr" style={{ color: 'rgb(113, 118, 123)', display: 'flex', alignItems: 'center' }}>
                <svg viewBox="0 0 24 24" aria-hidden="true" width={20} height={20} style={{ display: 'inline', verticalAlign: 'middle' }}>
                  <g>
                    <path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"></path>
                  </g>
                </svg>
                <span style={{ marginLeft: 6 }}>{likeCount}</span>
              </div>
              {/* Message icon and count */}
              <div dir="ltr" style={{ color: 'rgb(113, 118, 123)', display: 'flex', alignItems: 'center' }}>
                <svg viewBox="0 0 24 24" aria-hidden="true" width={20} height={20} style={{ display: 'inline', verticalAlign: 'middle' }}>
                  <g>
                    <path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"></path>
                  </g>
                </svg>
                <span style={{ marginLeft: 6 }}>{replyCount}</span>
              </div>
              {/* Reshare icon and count */}
              <div dir="ltr" style={{ color: 'rgb(113, 118, 123)', display: 'flex', alignItems: 'center' }}>
                <svg viewBox="0 0 24 24" aria-hidden="true" width={20} height={20} style={{ display: 'inline', verticalAlign: 'middle' }}>
                  <g>
                    <path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z"></path>
                  </g>
                </svg>
                <span style={{ marginLeft: 6 }}>{reshareCount}</span>
              </div>
            </div>
          </div>
          {/* Download icon at bottom right */}
          <button
            onClick={handleDownload}
            style={{
              position: 'absolute',
              bottom: 16,
              right: 16,
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
            }}
            aria-label="Download pin as PNG"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" width={20} height={20} style={{ color: 'rgb(113, 118, 123)', display: 'inline', verticalAlign: 'middle' }}>
              <g>
                <path d="M12 21.41l-5.7-5.7 1.41-1.42L11 17.59V8h2v9.59l3.3-3.3 1.41 1.42L12 21.41zM3 9l.02-3.51C3.02 4.11 4.14 3 5.52 3h12.98c1.38 0 2.5 1.12 2.5 2.49L21 9h-2V5.5c0-.28-.22-.5-.5-.5H5.52c-.28 0-.5.22-.5.5L5 9H3z"></path>
              </g>
            </svg>
          </button>
        </Card>
      </motion.div>
    </>
  );
} 