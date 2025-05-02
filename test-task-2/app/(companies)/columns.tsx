'use client'

import Heart from '@/components/icons/heart'
import HeartFilled from '@/components/icons/heart-filled'
import Plus from '@/components/icons/plus'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { ColumnDef } from '@tanstack/react-table'
import { useState } from 'react'

export type Company = {
  id: string
  companyName: string
  companyType: string[]
  aum: number
  foundedYear: number
  knownTeam: string[]
  favorited: boolean
}

export const columns: ColumnDef<Company>[] = [
  {
    accessorKey: 'companyName',
    header: ({ table }) => (
      <div
        className="flex h-full items-center px-4"
        style={{
          boxShadow: '4px -1px 6px 0px #00000020',
          clipPath: 'inset(0 -15px 0 0)',
        }}
      >
        <div className="flex h-full items-center border-r border-[#DFE4EA] pr-3">
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && 'indeterminate')
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        </div>
        <div className="ml-3 flex items-center gap-2.5">Company Name</div>
      </div>
    ),
    cell: ({ row }) => {
      const [favorited, setFavorited] = useState(row.original.favorited)

      return (
        <div
          className="flex h-full items-center px-4"
          style={{
            boxShadow: '4px -1px 6px 0px #00000020',
            clipPath: 'inset(0 -15px 0 0)',
          }}
        >
          <div className="flex h-full items-center border-r border-[#DFE4EA] pr-3">
            <Checkbox
              checked={row.getIsSelected()}
              onCheckedChange={(value) => row.toggleSelected(!!value)}
              aria-label="Select row"
            />
          </div>
          <div className="ml-3 flex items-center gap-2.5">
            <span>{row.original.companyName}</span>
            <Button onClick={() => setFavorited(!favorited)} variant="ghost" size="icon">
              {favorited ? <HeartFilled /> : <Heart />}
            </Button>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: 'companyType',
    header: 'Company Type',
    meta: {
      cellClassName: 'shadow-[inset_10px_0px_6px_-5px_rgba(0,0,0,0.1)]',
      headerClassName: 'shadow-[inset_10px_0px_6px_-5px_rgba(0,0,0,0.1)]',
    },
    cell: ({ row }) => (
      <div className="flex gap-2.5 overflow-hidden text-ellipsis whitespace-nowrap">
        {row.original.companyType.map((item, i) => (
          <Badge key={i}>{item}</Badge>
        ))}
      </div>
    ),
  },
  {
    accessorKey: 'aum',
    header: 'AUM, $mln.',
  },
  {
    accessorKey: 'foundedYear',
    header: 'Founded year',
    cell: ({ row }) => `${row.original.foundedYear} y.`,
  },
  {
    accessorKey: 'knownTeam',
    header: 'Known Team',
    cell: ({ row }) => {
      const items = row.original.knownTeam
      const maxVisible = 1

      return (
        <div className="flex gap-2.5 overflow-hidden text-ellipsis whitespace-nowrap">
          {items.slice(0, maxVisible).map((item, i) => (
            <Badge variant="secondary" key={i}>
              {item}
            </Badge>
          ))}

          {items.length > maxVisible && (
            <Badge variant="secondary">+{items.length - maxVisible}</Badge>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: 'plus',
    header: () => <Plus />,
    meta: {
      headerClassName: 'w-[44px] p-2.5',
    },
  },
]
