import * as React from "react";
import { cn } from "@/lib/utils";

const TransparentCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "border border-gray-200 bg-gray-100 hover:bg-transparent transition-colors duration-200 rounded-lg p-6",
      className
    )}
    {...props}
  />
));
TransparentCard.displayName = "TransparentCard";

const TransparentCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-2", className)}
    {...props}
  />
));
TransparentCardHeader.displayName = "TransparentCardHeader";

const TransparentCardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-xl font-bold text-gray-800", className)}
    {...props}
  />
));
TransparentCardTitle.displayName = "TransparentCardTitle";

const TransparentCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-gray-600", className)}
    {...props}
  />
));
TransparentCardDescription.displayName = "TransparentCardDescription";

const TransparentCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("mt-4", className)} {...props} />
));
TransparentCardContent.displayName = "TransparentCardContent";

const TransparentCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center justify-end mt-4", className)}
    {...props}
  />
));
TransparentCardFooter.displayName = "TransparentCardFooter";

export {
  TransparentCard,
  TransparentCardHeader,
  TransparentCardTitle,
  TransparentCardDescription,
  TransparentCardContent,
  TransparentCardFooter,
}; 