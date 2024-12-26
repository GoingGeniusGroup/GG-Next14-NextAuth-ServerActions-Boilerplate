"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { cn } from "@/lib/utils";

const TooltipProvider = TooltipPrimitive.Provider;

// const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 dark:bg-black bg-white text-black dark:text-white",
        className
      )}
      {...props}
    />
  </TooltipPrimitive.Portal>
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

// Modify the Tooltip component to set delayDuration to 0
const InstantTooltip = ({
  children,
  delayDuration = 0,
  ...props
}: TooltipPrimitive.TooltipProps) => (
  <TooltipPrimitive.Root delayDuration={delayDuration} {...props}>
    {children}
  </TooltipPrimitive.Root>
);

export {
  InstantTooltip as Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
};

{
  /* 500ms delay */
}
{
  /* <Tooltip delayDuration={500}>  
  <TooltipTrigger>Hover me</TooltipTrigger>
  <TooltipContent>Delayed tooltip</TooltipContent>
</Tooltip> */
}
