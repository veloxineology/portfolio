"use client";

import React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun, Home, Briefcase, FileText, Image } from "lucide-react";
import { useState, useEffect } from "react";

// Types
interface GlassEffectProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  href?: string;
  target?: string;
  onClick?: () => void;
}

interface DockIcon {
  icon: React.ReactNode;
  alt: string;
  onClick?: () => void;
  href?: string;
}

// Glass Effect Wrapper Component
const GlassEffect: React.FC<GlassEffectProps> = ({
  children,
  className = "",
  style = {},
  href,
  target = "_blank",
  onClick,
}) => {
  const glassStyle = {
    boxShadow: "0 6px 6px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1)",
    transitionTimingFunction: "cubic-bezier(0.175, 0.885, 0.32, 2.2)",
    ...style,
  };

  const content = (
    <div
      className={`relative flex font-semibold overflow-hidden text-black cursor-pointer transition-all duration-700 ${className}`}
      style={glassStyle}
      onClick={onClick}
    >
      {/* Glass Layers */}
      <div
        className="absolute inset-0 z-0 overflow-hidden rounded-inherit rounded-3xl"
        style={{
          backdropFilter: "blur(3px)",
          filter: "url(#glass-distortion)",
          isolation: "isolate",
        }}
      />
      <div
        className="absolute inset-0 z-10 rounded-inherit"
        style={{ background: "rgba(255, 255, 255, 0.25)" }}
      />
      <div
        className="absolute inset-0 z-20 rounded-inherit rounded-3xl overflow-hidden"
        style={{
          boxShadow:
            "inset 2px 2px 1px 0 rgba(255, 255, 255, 0.5), inset -1px -1px 1px 1px rgba(255, 255, 255, 0.5)",
        }}
      />

      {/* Content */}
      <div className="relative z-30">{children}</div>
    </div>
  );

  return href ? (
    <a href={href} target={target} rel="noopener noreferrer" className="block">
      {content}
    </a>
  ) : (
    content
  );
};

// Dock Component
const GlassDock: React.FC<{ icons: DockIcon[] }> = ({ icons }) => (
  <GlassEffect className="rounded-3xl p-3 hover:p-4 hover:rounded-4xl">
    <div className="flex items-center justify-center gap-2 rounded-3xl p-3 py-0 px-0.5 overflow-hidden">
      {icons.map((icon, index) => (
        <div
          key={index}
          className="w-16 h-16 transition-all duration-700 hover:scale-110 cursor-pointer flex items-center justify-center"
          style={{
            transformOrigin: "center center",
            transitionTimingFunction: "cubic-bezier(0.175, 0.885, 0.32, 2.2)",
          }}
          onClick={icon.onClick}
        >
          {icon.href ? (
            <a href={icon.href} className="w-full h-full flex items-center justify-center">
              {icon.icon}
            </a>
          ) : (
            icon.icon
          )}
        </div>
      ))}
    </div>
  </GlassEffect>
);

// SVG Filter Component
const GlassFilter: React.FC = () => (
  <svg style={{ display: "none" }}>
    <filter
      id="glass-distortion"
      x="0%"
      y="0%"
      width="100%"
      height="100%"
      filterUnits="objectBoundingBox"
    >
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.001 0.005"
        numOctaves="1"
        seed="17"
        result="turbulence"
      />
      <feComponentTransfer in="turbulence" result="mapped">
        <feFuncR type="gamma" amplitude="1" exponent="10" offset="0.5" />
        <feFuncG type="gamma" amplitude="0" exponent="1" offset="0" />
        <feFuncB type="gamma" amplitude="0" exponent="1" offset="0.5" />
      </feComponentTransfer>
      <feGaussianBlur in="turbulence" stdDeviation="3" result="softMap" />
      <feSpecularLighting
        in="softMap"
        surfaceScale="5"
        specularConstant="1"
        specularExponent="100"
        lightingColor="white"
        result="specLight"
      >
        <fePointLight x="-200" y="-200" z="300" />
      </feSpecularLighting>
      <feComposite
        in="specLight"
        operator="arithmetic"
        k1="0"
        k2="1"
        k3="1"
        k4="0"
        result="litImage"
      />
      <feDisplacementMap
        in="SourceGraphic"
        in2="softMap"
        scale="200"
        xChannelSelector="R"
        yChannelSelector="G"
      />
    </filter>
  </svg>
);

// Main Component
export default function GlassDockNavbar() {
  const { theme, setTheme } = useTheme();
  const [isClient, setIsClient] = useState(false);

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  const toggleTheme = () => {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("system");
    else setTheme("light");
  };

  const dockIcons: DockIcon[] = [
    {
      icon: <Home size={32} className="text-accent" />,
      alt: "Home",
      href: "/",
    },
    {
      icon: <Briefcase size={32} className="text-accent" />,
      alt: "Work",
      href: "/work",
    },
    {
      icon: <FileText size={32} className="text-accent" />,
      alt: "Blog",
      href: "/blog",
    },
    {
      icon: <Image size={32} className="text-accent" />,
      alt: "Gallery",
      href: "/gallery",
    },
    {
      icon: theme === "light" ? <Moon size={32} className="text-accent" /> : <Sun size={32} className="text-accent" />,
      alt: "Theme Toggle",
      onClick: toggleTheme,
    },
  ];

  if (!isClient) return null;

  return (
    <div className="hidden md:block">
      <GlassFilter />
      <div className="fixed bottom-4 left-0 right-0 flex justify-center z-50">
        <GlassDock icons={dockIcons} />
      </div>
    </div>
  );
} 