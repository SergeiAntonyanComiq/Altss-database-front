import * as React from 'react'

import ChevronLeft from '@/components/icons/chevron-left'
import ChevronRight from '@/components/icons/chevron-right'
import ChevronsLeft from '@/components/icons/chevrons-left'
import ChevronsRight from '@/components/icons/chevrons-right'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { MoreHorizontalIcon } from 'lucide-react'

function Pagination({ className, ...props }: React.ComponentProps<'nav'>) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn(className)}
      {...props}
    />
  )
}

function PaginationContent({ className, ...props }: React.ComponentProps<'ul'>) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn('flex flex-row items-center gap-2', className)}
      {...props}
    />
  )
}

function PaginationItem({ ...props }: React.ComponentProps<'li'>) {
  return <li data-slot="pagination-item" {...props} className="size-[25px]" />
}

type PaginationLinkProps = {
  isActive?: boolean
} & Pick<React.ComponentProps<typeof Button>, 'size'> &
  React.ComponentProps<'a'>

function PaginationLink({
  className,
  isActive,
  size = 'pagination',
  ...props
}: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? 'page' : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(
        buttonVariants({
          variant: isActive ? 'default' : 'outline',
          size,
        }),
        className,
      )}
      {...props}
    />
  )
}

function PaginationFirst({ className, ...props }: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink aria-label="Go to first page" {...props}>
      <ChevronsLeft className="size-[13px]" />
    </PaginationLink>
  )
}

function PaginationPrevious({ className, ...props }: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink aria-label="Go to previous page" {...props}>
      <ChevronLeft className="size-[13px]" />
    </PaginationLink>
  )
}

function PaginationNext({ className, ...props }: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      className={cn('gap-1 px-2.5 sm:pr-2.5', className)}
      {...props}
    >
      <ChevronRight className="size-[13px]" />
    </PaginationLink>
  )
}

function PaginationLast({ className, ...props }: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink aria-label="Go to last page" className={cn('px-2.5', className)} {...props}>
      <ChevronsRight className="size-[13px] w-[21px]" />
    </PaginationLink>
  )
}

function PaginationEllipsis({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn('flex size-[25px] items-end justify-center text-[#637381]', className)}
      {...props}
    >
      <MoreHorizontalIcon className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationFirst,
  PaginationItem,
  PaginationLast,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
}
