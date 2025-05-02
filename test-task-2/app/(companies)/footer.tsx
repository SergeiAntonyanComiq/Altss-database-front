'use client'

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationFirst,
  PaginationItem,
  PaginationLast,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select'
import { useState } from 'react'

export default function Footer() {
  const [perPage, setPerPage] = useState('50')

  return (
    <footer className="flex h-[48px] items-center justify-between py-3 pl-[13px]">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationFirst />
          </PaginationItem>
          <PaginationItem>
            <PaginationPrevious />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink isActive>2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>4</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>5</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>12</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext className="bg-[#F3F4F6]" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLast className="bg-[#F3F4F6]" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <Select value={perPage} onValueChange={setPerPage}>
        <SelectTrigger className="w-[250px]">
          <div className="truncate">{perPage ? `${perPage} results per page` : 'Select...'}</div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="25">25</SelectItem>
          <SelectItem value="50">50</SelectItem>
        </SelectContent>
      </Select>
    </footer>
  )
}
