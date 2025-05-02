'use client'

import Filter from '@/components/icons/filter'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'

export default function Filters() {
  const categories = [
    'Private Equity',
    'VC Fund',
    'Alternative VC Models',
    'Startup',
    'Private Debt',
    'Hedge Funds',
    'Real Estate',
    'Infrastructure',
    'Commodities',
    'Natural Resources',
    'Collectibles & Passion Assets',
    'Digital Assets',
    'Secondaries & Special Situations',
    'IP & Royalties',
  ]

  const [selected, setSelected] = useState<string[]>([])

  const toggle = (item: string) => {
    setSelected((prev) => (prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]))
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">
          <Filter className="size-4.5" /> Filters
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[1094px]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-semibold text-[#111928]">
            Select Filters. Step 1/3.
          </DialogTitle>
          <DialogDescription className="flex justify-center">
            <span className="mt-2.5 block h-[3px] w-[90px] rounded-full bg-[#2665F0]"></span>
          </DialogDescription>
        </DialogHeader>
        <div className="mt-8 space-y-9">
          <div>
            <p className="text-xl font-bold text-[#111928]">
              Just type what you are looking for, or select filters bellow...
            </p>
            <hr className="mt-2 mb-4 bg-[#EBEDF1]" />
            <Textarea placeholder="I need all Funds of Funds VC, that are founded by ex-startups founders after 2020 and have AUM more then $20B with investment focus in.."></Textarea>
          </div>
          <div>
            <p className="text-xl font-bold text-[#111928]">
              Select all company types you are looking for
            </p>
            <hr className="mt-2 mb-4 bg-[#EBEDF1]" />
            <div className="flex flex-wrap gap-3">
              {categories.map((item, index) => (
                <Badge
                  key={index}
                  variant={selected.includes(item) ? 'default' : 'outline'}
                  onClick={() => toggle(item)}
                  className="cursor-pointer select-none"
                >
                  {item}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex w-full gap-9">
            <div className="mb-9 flex-1">
              <p className="text-xl font-bold text-[#111928]">Founding Period</p>
              <hr className="mt-2 mb-4 bg-[#EBEDF1]" />
              <Input placeholder="Type here.. from 2022 until  December 2024.." />
            </div>
            <div className="mb-9 flex-1">
              <p className="text-xl font-bold text-[#111928]">HQ Location</p>
              <hr className="mt-2 mb-4 bg-[#EBEDF1]" />
              <Input placeholder="Type here.. North America, but exclude.." />
            </div>
          </div>
        </div>
        <DialogFooter>
          <div className="flex w-full justify-between">
            <DialogClose asChild>
              <Button className="w-[190px]" variant="defaultOutline">
                Back
              </Button>
            </DialogClose>
            <Button className="w-[190px]" variant="secondary" disabled>
              Next
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
