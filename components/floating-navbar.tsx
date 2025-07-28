"use client"

import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useNavigation } from "@/hooks/use-navigation";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { siteData } from "@/lib/site-data";

// Types
interface NavItem {
  href: string;
  label: string;
  title?: string;
}

interface FloatingDockProps {
  desktopClassName?: string;
  mobileClassName?: string;
}

interface FloatingDockListProps {
  items: NavItem[];
  className?: string;
}

interface IconContainerProps {
  mouseX: import("framer-motion").MotionValue<number>;
  title: string;
  href: string;
}

export default function FloatingDock({
  desktopClassName,
  mobileClassName,
}: FloatingDockProps) {
  const [navItems, setNavItems] = useState<NavItem[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const items: NavItem[] = siteData.navigation.map((item: { href: string; label: string }) => ({
      ...item,
      title: item.label,
    }));
    setNavItems(items);
  }, []);

  if (!isClient) return null;

  return (
    <>
      <FloatingDockDesktop items={navItems} className={desktopClassName} />
      <FloatingDockMobile items={navItems} className={mobileClassName} />
    </>
  );
}

function FloatingDockMobile({ items, className }: FloatingDockListProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className={cn("fixed bottom-4 right-4 z-50 block md:hidden", className)}>
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="nav"
            className="absolute right-0 bottom-full mb-2 flex flex-col gap-2 rounded-full backdrop-blur-3xl bg-white/30 dark:bg-white/10 border border-white/20 dark:border-white/10 shadow-xl p-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            {items.map((item: NavItem, idx: number) => (
              <motion.a
                href={item.href}
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10, transition: { delay: idx * 0.05 } }}
                transition={{ delay: (items.length - 1 - idx) * 0.05 }}
                className="flex h-10 px-4 items-center justify-center rounded-full bg-white dark:bg-neutral-900 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors shadow"
              >
                {item.label}
              </motion.a>
            ))}
            <ThemeToggleButtonMobile />
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen(!open)}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-white dark:bg-white/10 border border-white/20 dark:border-white/10 shadow"
      >
        {open ? <X className="h-6 w-6 text-neutral-500 dark:text-neutral-400" /> : <Menu className="h-6 w-6 text-neutral-500 dark:text-neutral-400" />}
      </button>
    </div>
  );
}

function FloatingDockDesktop({ items, className }: FloatingDockListProps) {
  const mouseX = useMotionValue(Infinity);
  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "fixed bottom-6 left-1/2 z-50 -translate-x-1/2 mx-auto hidden h-16 items-center gap-4 rounded-full bg-white/20 dark:bg-white/10 backdrop-blur-3xl px-6 md:flex border border-white/30 dark:border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.15)]",
        className
      )}
    >
      {items.map((item: NavItem) => (
        <IconContainer mouseX={mouseX} key={item.title ?? ""} title={item.title ?? ""} href={item.href} />
      ))}
      <ThemeToggleButton />
    </motion.div>
  );
}

function IconContainer({ mouseX, title, href }: IconContainerProps) {
  const ref = useRef<HTMLButtonElement | null>(null);
  const pathname = usePathname();
  const { navigateTo } = useNavigation();

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const scaleTransform = useTransform(distance, [-150, 0, 150], [0.9, 1.1, 0.9]);
  const scale = useSpring(scaleTransform, { mass: 0.1, stiffness: 150, damping: 12 });

  const [hovered, setHovered] = useState(false);

  return (
    <button
      ref={ref}
      style={{ scale: scale as any }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => navigateTo(href)}
      className={cn(
        "relative px-4 py-2 rounded-full transition-all duration-200 font-medium text-sm bg-white dark:bg-neutral-900 shadow",
        pathname === href
          ? "text-neutral-900 dark:text-white"
          : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
      )}
      aria-label={title}
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 2, x: "-50%" }}
            className="absolute -top-8 left-1/2 w-fit rounded-md border border-gray-200 bg-gray-100 px-2 py-0.5 text-xs whitespace-pre text-neutral-700 dark:border-neutral-900 dark:bg-neutral-800 dark:text-white shadow"
          >
            {title}
          </motion.div>
        )}
      </AnimatePresence>
      {title}
    </button>
  );
}

function ThemeToggleButton() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="flex aspect-square h-10 w-10 items-center justify-center rounded-full bg-white dark:bg-white/10 border border-white/30 dark:border-white/10 hover:bg-white/40 dark:hover:bg-white/20 transition-all shadow-md"
      aria-label="Toggle theme"
    >
      {isDark ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-neutral-600" />}
    </button>
  );
}

function ThemeToggleButtonMobile() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="flex h-10 w-10 items-center justify-center rounded-full bg-white dark:bg-neutral-900 shadow mt-2"
      aria-label="Toggle theme"
    >
      {isDark ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-neutral-600" />}
    </button>
  );
}
