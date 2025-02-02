"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { TestimonyCard } from "./testimony-card";

interface TestimonyAccordionProps {
  testimonials: Array<{
    name: string;
    feedback: string;
    image?: string;
    company: string;
    role?: string;
  }>;
}

const TestimonyAccordion = ({ testimonials }: TestimonyAccordionProps) => {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = React.useState(false);
  const [showRightArrow, setShowRightArrow] = React.useState(true);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
  };

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = 400;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <div className="relative group">
      <AccordionPrimitive.Root 
        type="single" 
        defaultValue="0"
        className="w-full"
      >
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto scrollbar-hide snap-x space-x-4 px-4"
        >
          {testimonials.map((testimonial, index) => (
            <AccordionPrimitive.Item
              key={index}
              value={index.toString()}
              className="min-w-[400px] snap-start flex-shrink-0"
            >
              <TestimonyCard
                company={testimonial.company}
                name={testimonial.name}
                feedback={testimonial.feedback}
                image={testimonial.image}
                role={testimonial.role}
              />
            </AccordionPrimitive.Item>
          ))}
        </div>
      </AccordionPrimitive.Root>

      {showLeftArrow && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-opacity opacity-0 group-hover:opacity-100"
        >
          <ChevronLeft className="h-6 w-6 text-gray-600" />
        </button>
      )}
      
      {showRightArrow && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-opacity opacity-0 group-hover:opacity-100"
        >
          <ChevronRight className="h-6 w-6 text-gray-600" />
        </button>
      )}
    </div>
  );
};

export { TestimonyAccordion }; 