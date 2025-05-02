import { columns, Company } from '@/app/(companies)/columns'
import { companiesData } from '@/app/(companies)/data'
import { DataTable } from '@/app/(companies)/data-table'
import Filters from '@/app/(companies)/filters'
import Footer from '@/app/(companies)/footer'
import Heart from '@/components/icons/heart'
import Save from '@/components/icons/save'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

async function getData(): Promise<Company[]> {
  return companiesData
}

export default async function Companies() {
  const data = await getData()

  return (
    <div className="flex min-h-screen flex-col py-8">
      <div className="flex-1">
        <header className="mb-10">
          <h1 className="text-2xl font-semibold text-[#111928]">Companies</h1>
        </header>
        <div className="mb-8 flex gap-4">
          <div className="relative w-[363px]">
            <Input placeholder="Search the company" className="rounded-full px-5" />
            <Search className="absolute top-3.5 right-3.5 h-4 w-4 text-[#9CA3AF]" />
          </div>
          <Filters />
          <Button variant="secondary" disabled>
            <Save /> Save this Search
          </Button>
          <Button variant="secondary">
            <Heart className="size-5" /> Add to Favorites
          </Button>
        </div>
        <DataTable columns={columns} data={data} />
      </div>
      <Footer />
    </div>
  )
}
