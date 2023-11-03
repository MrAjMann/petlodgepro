import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface HeadingProps {
  title: string;
  description: string;
  className?: ReactNode;
}

export const Heading: React.FC<HeadingProps> = ({
  title,
  description,
  className,
}) => {
  return (
    <div>
      <h2 className={cn("text-3xl font-bold tracking-tight", className)}>
        {title}
      </h2>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};
