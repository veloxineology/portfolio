"use client"

import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useNavigation } from "@/hooks/use-navigation";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Sun, Moon, Home, Briefcase, Image, Book, Menu, X, LucideIcon } from "lucide-react";
import { useRef, useState } from "react";
import { siteData } from "@/lib/site-data";

// Types
interface NavItem {
  href: string;
  label: string;
  icon?: React.ReactNode;
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
  icon: React.ReactNode;
  href: string;
}

// Icon mapping for nav items
const navIcons: Record<string, LucideIcon> = {
  Home,
  Work: Briefcase,
  Gallery: Image,
  Blog: Book,
};

export default function FloatingDock({
  desktopClassName,
  mobileClassName,
}: FloatingDockProps) {
  // Compose nav items from siteData.navigation
  const navItems: NavItem[] = siteData.navigation.map((item: { href: string; label: string }) => ({
    ...item,
    icon: navIcons[item.label] ? navIcons[item.label]({ className: "w-full h-full" }) : null,
    title: item.label,
  }));
  // Add theme toggle as a dock item
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
            className="absolute right-0 bottom-full mb-2 flex flex-col gap-2"
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
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 dark:bg-neutral-900 shadow"
              >
                <div className="h-5 w-5">{item.icon}</div>
              </motion.a>
            ))}
            <ThemeToggleButtonMobile />
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen(!open)}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-50 dark:bg-neutral-800 shadow"
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
        "fixed bottom-6 left-1/2 z-50 -translate-x-1/2 mx-auto hidden h-20 items-end gap-4 rounded-2xl bg-gray-50/80 dark:bg-neutral-900/80 backdrop-blur-xl px-8 pb-4 md:flex shadow-lg border border-gray-200 dark:border-neutral-800",
        className
      )}
    >
      {items.map((item: NavItem) => (
        <IconContainer mouseX={mouseX} key={item.title ?? ""} title={item.title ?? ""} icon={item.icon} href={item.href} />
      ))}
      <ThemeToggleButton />
    </motion.div>
  );
}

function IconContainer({ mouseX, title, icon, href }: IconContainerProps) {
  const ref = useRef<HTMLButtonElement | null>(null);
  const pathname = usePathname();
  const { navigateTo } = useNavigation();

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthTransform = useTransform(distance, [-150, 0, 150], [48, 80, 48]);
  const heightTransform = useTransform(distance, [-150, 0, 150], [48, 80, 48]);
  const widthIcon = useTransform(distance, [-150, 0, 150], [24, 40, 24]);
  const heightIcon = useTransform(distance, [-150, 0, 150], [24, 40, 24]);

  const width = useSpring(widthTransform, { mass: 0.1, stiffness: 150, damping: 12 });
  const height = useSpring(heightTransform, { mass: 0.1, stiffness: 150, damping: 12 });
  const widthIconSpring = useSpring(widthIcon, { mass: 0.1, stiffness: 150, damping: 12 });
  const heightIconSpring = useSpring(heightIcon, { mass: 0.1, stiffness: 150, damping: 12 });

  const [hovered, setHovered] = useState(false);

  return (
    <button
      ref={ref}
      style={{ width: width as any, height: height as any }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => navigateTo(href)}
      className={cn(
        "relative flex aspect-square items-center justify-center rounded-full transition-colors",
        pathname === href
          ? "bg-gray-200 dark:bg-neutral-800 border-2 border-accent"
          : "bg-gray-100 dark:bg-neutral-900 border border-transparent hover:bg-gray-200/80 dark:hover:bg-neutral-800/80"
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
      <motion.div
        style={{ width: widthIconSpring as any, height: heightIconSpring as any }}
        className="flex items-center justify-center"
      >
        {icon}
      </motion.div>
    </button>
  );
}

function ThemeToggleButton() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="flex aspect-square h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 hover:bg-gray-200/80 dark:hover:bg-neutral-800/80 transition-colors"
      aria-label="Toggle theme"
    >
      {isDark ? <Sun className="h-6 w-6 text-yellow-400" /> : <Moon className="h-6 w-6 text-neutral-600" />}
    </button>
  );
}

function ThemeToggleButtonMobile() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 dark:bg-neutral-900 shadow mt-2"
      aria-label="Toggle theme"
    >
      {isDark ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-neutral-600" />}
    </button>
  );
}
