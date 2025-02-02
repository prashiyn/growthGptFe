import * as React from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  TransparentCard, 
  TransparentCardHeader,
  TransparentCardContent 
} from "@/components/ui/transparent-card";

interface TestimonyCardProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  feedback: string;
  image?: string;
  company: string;
  role?: string;
}

function getInitials(name: string) {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase();
}

const TestimonyCard = React.forwardRef<HTMLDivElement, TestimonyCardProps>(
  ({ className, name, feedback, image, company, role, ...props }, ref) => (
    <TransparentCard 
      ref={ref} 
      className={cn("flex flex-col justify-between w-[300px] h-[280px]", className)} 
      {...props}
    >
      <div>
        <p className="text-sm font-medium text-blue-600">{company}</p>
        <TransparentCardContent className="mt-4">
          <p className="text-lg italic text-gray-600 line-clamp-4">&quot;{feedback}&quot;</p>
        </TransparentCardContent>
      </div>
      <TransparentCardHeader className="flex flex-row items-center space-x-4 mt-auto pt-6 border-t border-gray-100">
        <div className="flex items-center gap-4">
          <Avatar>
            {image && <img src={image} alt={name} />}
            <AvatarFallback>{getInitials(name)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-gray-800">{name}</p>
            {role && <p className="text-xs text-gray-500">{role}</p>}
          </div>
        </div>
      </TransparentCardHeader>
    </TransparentCard>
  )
);

TestimonyCard.displayName = "TestimonyCard";

export { TestimonyCard }; 