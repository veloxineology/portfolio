"use client";
import { ThemeProvider } from "@/components/theme-provider";
import FloatingNavbar from "@/components/floating-navbar";
import LoadingScreen from "@/components/loading-screen";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function ClientRootLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);
  const pathname = usePathname();
  const isFirstLoad = useRef(true);

  useEffect(() => {
    if (isFirstLoad.current) {
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false);
        setHasLoaded(true);
        isFirstLoad.current = false;
      }, 5000);
      return () => clearTimeout(timer);
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isFirstLoad.current) {
      setLoading(false);
    }
  }, [pathname]);

  return (
    <ThemeProvider>
      <FloatingNavbar />
      <AnimatePresence mode="wait">
        {loading && !hasLoaded ? (
          <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <LoadingScreen />
          </motion.div>
        ) : (
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <div className="pt-0 md:pt-20 pb-20 md:pb-0 min-h-screen">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </ThemeProvider>
  );
} 