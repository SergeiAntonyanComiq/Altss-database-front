
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

const CompaniesTableSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#F6F6F7] hover:bg-[#F6F6F7]">
              <TableHead className="w-12 align-middle"><Skeleton className="h-4 w-4 mx-auto" /></TableHead>
              <TableHead className="font-medium text-[#343C6A] align-middle">Company Name</TableHead>
              <TableHead className="font-medium text-[#343C6A] align-middle">Company Type</TableHead>
              <TableHead className="font-medium text-[#343C6A] align-middle">AUM, $mln.</TableHead>
              <TableHead className="font-medium text-[#343C6A] align-middle">Founded year</TableHead>
              <TableHead className="font-medium text-[#343C6A] align-middle">Known Team</TableHead>
              <TableHead className="w-12 align-middle"><Skeleton className="h-4 w-4 mx-auto" /></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 9 }).map((_, index) => (
              <TableRow key={index} className="border-t border-gray-100">
                <TableCell className="p-3 align-middle"><Skeleton className="h-4 w-4" /></TableCell>
                <TableCell className="align-middle"><Skeleton className="h-6 w-32" /></TableCell>
                <TableCell className="align-middle"><Skeleton className="h-6 w-24" /></TableCell>
                <TableCell className="align-middle"><Skeleton className="h-6 w-16" /></TableCell>
                <TableCell className="align-middle"><Skeleton className="h-6 w-20" /></TableCell>
                <TableCell className="align-middle"><Skeleton className="h-6 w-24" /></TableCell>
                <TableCell className="align-middle"></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CompaniesTableSkeleton;
