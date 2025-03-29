import * as React from "react";
import { cn } from "../../lib/utils"; 

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("bg-white rounded-lg shadow-md p-4", className)}
      {...props}
    />
  )
);
Card.displayName = "Card";

const CardHeader: React.FC<CardProps> = ({ className, ...props }) => (
  <div className={cn("p-4 border-b border-gray-200", className)} {...props} />
);

const CardTitle: React.FC<CardProps> = ({ className, ...props }) => (
  <h2 className={cn("text-lg font-semibold", className)} {...props} />
);

const CardContent: React.FC<CardProps> = ({ className, ...props }) => (
  <div className={cn("p-4", className)} {...props} />
);

export { Card, CardHeader, CardTitle, CardContent };
