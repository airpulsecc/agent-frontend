import {
  type ComponentPropsWithRef,
  forwardRef,
  type ComponentRef,
} from "react";

import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";

const textStyles = cva("block", {
  variants: {
    variant: {
      inherit: "typography-inherit",
      xs: "text-xs",
      sm: "text-sm",
      md: "text-md",
      basic: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
      "3xl": "text-[40px]",
    },
    color: {
      inherit: "text-inherit",
      main: "text-white",
      secondary: "text-secondary",
      primary: "text-primary",
      destructive: "text-destructive",
    },
    inline: {
      true: "inline",
    },
    align: {
      start: "text-start",
      center: "text-center",
      end: "text-end",
    },
    bold: {
      true: "font-bold",
    },
  },
});

type Props = ComponentPropsWithRef<"p"> &
  VariantProps<typeof textStyles> & {
    as?:
      | "h1"
      | "h2"
      | "h3"
      | "h4"
      | "h5"
      | "h6"
      | "p"
      | "span"
      | "dt"
      | "dd"
      | "strong";
    asChild?: boolean;
  };

const Text = forwardRef<ComponentRef<"p">, Props>(
  (
    {
      children,
      as: Tag = "p",
      className,
      variant = "md",
      align,
      asChild,
      color = "main",
      inline,
      bold,
      ...props
    },
    ref
  ) => {
    return (
      <Slot
        className={cn(
          textStyles({ variant, align, color, inline, bold }),
          className
        )}
        {...props}
        ref={ref}
      >
        {asChild ? children : <Tag>{children}</Tag>}
      </Slot>
    );
  }
);

Text.displayName = "Text";

export { Text };
