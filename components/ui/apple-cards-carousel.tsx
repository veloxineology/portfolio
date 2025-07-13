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
        "relative h-[500px] w-[350px] rounded-3xl bg-white dark:bg-neutral-900 cursor-pointer transition-all duration-300 ease-out",
        isHovered && "scale-105",
        isSelected && "scale-110"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsSelected(!isSelected)}
    >
      <div className="relative h-full w-full overflow-hidden rounded-3xl">
        <img
          src={card.src}
          alt={card.title}
          className="h-full w-full object-cover transition-transform duration-300 ease-out"
          style={{
            transform: isHovered ? "scale(1.1)" : "scale(1)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="mb-2 text-sm font-medium opacity-80">
            {card.category}
          </div>
          <h3 className="text-xl font-bold">{card.title}</h3>
        </div>

        {isSelected && (
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm rounded-3xl">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 max-w-sm mx-4 max-h-96 overflow-y-auto">
                {card.content}
              </div>
            </div>
          </div>
        )}
      </div>
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
      const cardWidth = 350 + 24; // card width + gap
      carouselRef.current.scrollTo({
        left: index * cardWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <div
        ref={carouselRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide py-8"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        style={{ cursor: isDragging ? "grabbing" : "grab" }}
      >
        {items}
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