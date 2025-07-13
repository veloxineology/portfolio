"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export const useOutsideClick = (
  ref: React.RefObject<HTMLElement | null>,
  callback: (event: MouseEvent | TouchEvent) => void
) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      callback(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, callback]);
};

interface CardProps {
  card: {
    category: string;
    title: string;
    src: string;
    content: React.ReactNode;
  };
  index: number;
}

export const Card = ({ card, index }: CardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useOutsideClick(cardRef, () => {
    setIsSelected(false);
  });

  return (
    <div
      ref={cardRef}
      className={cn(
        "relative z-10 flex h-80 w-56 md:h-[40rem] md:w-96 flex-col items-start justify-start overflow-hidden rounded-3xl bg-gray-100 dark:bg-neutral-900 cursor-pointer transition-all duration-300 ease-out",
        isHovered && "scale-105",
        isSelected && "scale-110"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsSelected(!isSelected)}
    >
      {/* Image fills the card */}
      <img
        src={card.src}
        alt={card.title}
        className="absolute inset-0 z-10 w-full h-full object-cover transition-transform duration-300 ease-out"
        style={{
          transform: isHovered ? "scale(1.08)" : "scale(1)",
        }}
      />
      {/* Gradient overlay at top */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-full bg-gradient-to-b from-black/50 via-transparent to-transparent" />
      {/* Text at the top */}
      <div className="relative z-40 p-8">
        <div className="text-left font-sans text-sm font-medium text-white md:text-base mb-2">
          {card.category}
        </div>
        <div className="mt-2 max-w-xs text-left font-sans text-xl font-semibold [text-wrap:balance] text-white md:text-3xl">
          {card.title}
        </div>
      </div>
      {/* Show expanded content on click */}
      {isSelected && (
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm rounded-3xl z-30 flex items-center justify-center">
          <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 max-w-sm mx-4 max-h-96 overflow-y-auto">
            {card.content}
          </div>
        </div>
      )}
    </div>
  );
};

interface CarouselProps {
  items: React.ReactNode[];
}

export const Carousel = ({ items }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (carouselRef.current?.offsetLeft || 0));
    setScrollLeft(carouselRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (carouselRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const scrollToIndex = (index: number) => {
    setCurrentIndex(index);
    if (carouselRef.current) {
      const card = carouselRef.current.querySelectorAll('div[role="card"]')[index] as HTMLElement;
      if (card) {
        carouselRef.current.scrollTo({
          left: card.offsetLeft,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <div className="w-full mx-auto px-4">
      <div
        ref={carouselRef}
        className="flex gap-8 overflow-x-auto scrollbar-hide py-8"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        style={{ cursor: isDragging ? "grabbing" : "grab" }}
      >
        {items.map((item, idx) => (
          <div role="card" key={idx} className="flex-shrink-0">
            {item}
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-2 mt-8">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToIndex(index)}
            className={cn(
              "w-3 h-3 rounded-full transition-all duration-300",
              currentIndex === index
                ? "bg-neutral-800 dark:bg-neutral-200"
                : "bg-neutral-300 dark:bg-neutral-600"
            )}
          />
        ))}
      </div>
    </div>
  );
}; 