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
        "relative w-[320px] md:w-[420px] lg:w-[540px] aspect-[4/5] rounded-3xl bg-white dark:bg-neutral-900 cursor-pointer transition-all duration-300 ease-out overflow-hidden flex-shrink-0",
        isHovered && "scale-105",
        isSelected && "scale-110"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsSelected(!isSelected)}
    >
      <img
        src={card.src}
        alt={card.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 ease-out z-0"
        style={{
          transform: isHovered ? "scale(1.08)" : "scale(1)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent z-10" />
      <div className="absolute top-0 left-0 right-0 p-6 z-20">
        <div className="mb-2 text-sm font-medium text-white/80 drop-shadow">
          {card.category}
        </div>
        <h3 className="text-2xl font-bold text-white drop-shadow-lg leading-tight">
          {card.title}
        </h3>
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