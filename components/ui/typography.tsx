'use client'

import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import Link from 'next/link'
import * as React from 'react'

import { cn } from '@/lib/utils'

const typographyVariants = cva('font-sans', {
  variants: {
    variant: {
      h1: 'scroll-m-20 text-4xl py-2 font-extrabold tracking-tight lg:text-5xl',
      h2: 'scroll-m-20 border-b py-2 text-3xl font-semibold tracking-tight first:mt-0',
      h3: 'scroll-m-20 text-2xl py-2 font-semibold tracking-tight',
      h4: 'scroll-m-20 text-xl py-2 font-semibold tracking-tight',
      p: 'leading-7 [&:not(:first-child)]:mt-6',
      span: '',
      blockquote: 'mt-6 border-l-2 pl-6 italic',
      ul: 'my-6 ml-6 list-disc [&>li]:mt-2',
      ol: 'my-6 ml-6 list-decimal [&>li]:mt-2',
      code: 'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
      a: 'underline-offset-4 hover:underline',
      link: 'underline-offset-4 hover:underline',
    },
    color: {
      default: 'text-foreground',
      primary: 'text-primary-foreground',
      secondary: 'text-secondary-foreground',
      destructive: 'text-destructive-foreground',
      muted: 'text-muted-foreground',
      accent: 'text-accent-foreground',
      success: 'text-green-600 dark:text-green-400',
      warning: 'text-yellow-600 dark:text-yellow-400',
      error: 'text-red-600 dark:text-red-400',
    },
  },
  defaultVariants: {
    variant: 'p',
    color: 'default',
  },
})

export interface TypographyProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'color'>,
    VariantProps<typeof typographyVariants> {
  href?: string
  isExternal?: boolean
}

export const Typography = React.forwardRef<HTMLParagraphElement, TypographyProps>(
  ({ variant = 'p', color, className = '', href = '/', isExternal = false, ...props }, ref) => {
    if (variant === 'link')
      return (
        <Link
          {...props}
          href={href}
          className={cn(typographyVariants({ variant, color, className }))}
          {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        />
      )

    const Comp = variant === 'p' ? 'p' : Slot
    const InnerComp = variant === 'p' ? React.Fragment : `${variant}`

    return (
      <Comp className={cn(typographyVariants({ variant, color, className }))} ref={ref} {...props}>
        <InnerComp>{props.children}</InnerComp>
      </Comp>
    )
  },
)

Typography.displayName = 'Typography'
