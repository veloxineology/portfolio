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
}: TweetCardProps) {
  // Use the twitterlogo.png from public for the Twitter icon
  const createdAt = new Date(date);
  const hasMedia = !hideMedia && (video || (photos && photos.length > 0));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        className={cn(
          "group relative overflow-hidden transition-all duration-200 hover:shadow-lg",
          "tweet-card-twitter-light",
          "dark:bg-[#15202b] dark:border-[#22303c] dark:text-white",
          className
        )}
        style={{
          background: '#f5f8fa',
          width: 400,
          maxWidth: '100%',
          borderRadius: 16,
          boxShadow: '0 1px 3px rgba(20,23,26,0.04)',
          border: '1px solid #e1e8ed',
        }}
      >
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
            style={{ color: '#14171a' }}
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

          <div
            className={cn(
              "flex items-center justify-center space-x-8 transition-opacity group-hover:opacity-100",
              {
                "mt-4 opacity-90": !compact,
                "mt-2 opacity-75": compact,
              }
            )}
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    className="h-auto space-x-2 p-0 hover:bg-transparent"
                  >
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="group inline-flex items-center gap-1.5 text-muted-foreground/60 transition-colors hover:text-rose-500"
                      href={like_url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Heart
                        className={cn(
                          "transition-all duration-300 ease-in-out group-hover:fill-rose-500 group-hover:stroke-rose-500",
                          {
                            "h-4 w-4": !compact,
                            "h-3 w-3": compact,
                          }
                        )}
                      />
                      <span
                        className={cn(
                          "font-medium transition-colors duration-300 ease-in-out group-hover:text-rose-500",
                          {
                            "text-sm": !compact,
                            "text-xs": compact,
                          }
                        )}
                      >
                        {formatNumber(favorite_count)}
                      </span>
                    </motion.a>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Like on Twitter</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    className="h-auto space-x-2 p-0 hover:bg-transparent"
                  >
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="group inline-flex items-center gap-1.5 text-muted-foreground/60 transition-colors hover:text-sky-500"
                      href={reply_url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <MessageCircle
                        className={cn(
                          "transition-all duration-300 ease-in-out group-hover:fill-sky-500 group-hover:stroke-sky-500",
                          {
                            "h-4 w-4": !compact,
                            "h-3 w-3": compact,
                          }
                        )}
                      />
                      <span
                        className={cn(
                          "font-medium transition-colors duration-300 ease-in-out group-hover:text-sky-500",
                          {
                            "text-sm": !compact,
                            "text-xs": compact,
                          }
                        )}
                      >
                        {formatNumber(conversation_count)}
                      </span>
                    </motion.a>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Reply on Twitter</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </Card>
    </motion.div>
  );
} 