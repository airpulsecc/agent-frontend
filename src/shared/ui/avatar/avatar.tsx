import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

function Avatar({
  className,
  size = "default",
  rounded = "full",
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root> & {
  size?: VariantProps<typeof imageStyles>["size"];
  rounded?: VariantProps<typeof imageStyles>["rounded"];
}) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        "relative flex shrink-0 overflow-hidden",
        imageStyles({ size, rounded }),
        className
      )}
      {...props}
    />
  );
}

const imageStyles = cva("aspect-square object-cover", {
  variants: {
    size: {
      default: "size-13.5",
      sm: "size-10",
      md: "size-12",
      lg: "size-14",
      xl: "size-16",
      "2xl": "size-20",
    },
    rounded: {
      full: "rounded-full",
      lg: "rounded-lg",
      md: "rounded-md",
      sm: "rounded-sm",
      xs: "rounded-xs",
      none: "rounded-none",
    },
  },
});

function AvatarImage({
  className,
  size = "default",
  rounded = "full",
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image> & {
  size?: VariantProps<typeof imageStyles>["size"];
  rounded?: VariantProps<typeof imageStyles>["rounded"];
}) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn(imageStyles({ size, rounded }), className)}
      {...props}
    />
  );
}

function AvatarFallback({
  className,
  size = "default",
  rounded = "full",
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback> & {
  size?: VariantProps<typeof imageStyles>["size"];
  rounded?: VariantProps<typeof imageStyles>["rounded"];
}) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "bg-muted flex items-center justify-center",
        imageStyles({ size, rounded }),
        className
      )}
      {...props}
    />
  );
}

const Component = Object.assign(Avatar, {
  Image: AvatarImage,
  Fallback: AvatarFallback,
});

export { Component as Avatar };
