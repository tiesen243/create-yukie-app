import type { VariantProps } from 'class-variance-authority'
import * as React from 'react'
import { cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const typographyVariants = cva('font-sans text-base font-normal text-foreground', {
  variants: {
    level: {
      h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
      h2: 'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0',
      h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
      h4: 'scroll-m-20 text-xl font-semibold tracking-tight',
      p: 'leading-7 [&:not(:first-child)]:mt-4',
      blockquote: 'my-4 border-l-2 pl-6 italic',
      code: 'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
    },
    color: {
      primary: 'text-primary',
      secondary: 'text-secondary',
      info: 'text-info',
      success: 'text-success',
      warning: 'text-warning',
      destructive: 'text-destructive',
      muted: 'text-muted-foreground',
    },
  },
  defaultVariants: {
    level: 'p',
    color: 'primary',
  },
})

export interface TypographyProps
  extends Omit<React.HTMLAttributes<HTMLParagraphElement>, 'color'>,
    VariantProps<typeof typographyVariants> {}

const Typography = React.forwardRef<HTMLButtonElement, TypographyProps>(
  ({ className, level = 'p', color, ...props }, ref) => {
    const Comp = level as React.ElementType

    return (
      <Comp className={cn(typographyVariants({ level, color, className }))} ref={ref} {...props} />
    )
  },
)
Typography.displayName = 'Typography'

export { Typography, typographyVariants }
