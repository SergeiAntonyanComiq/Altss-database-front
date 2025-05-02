
import * as React from "react";

import { cn } from "@/lib/utils";

const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <div data-slot="table-container" className="relative w-full overflow-x-auto">
      <table
        data-slot="table"
        ref={ref}
        className={cn("w-full max-w-full caption-bottom text-lg", className)}
        {...props}
      />
    </div>
  ),
);
Table.displayName = "Table";

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead data-slot="table-header" ref={ref} className={cn(className)} {...props} />
));
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody data-slot="table-body" ref={ref} className={cn(className)} {...props} />
));
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    data-slot="table-footer"
    ref={ref}
    className={cn("bg-muted/50 border-t font-medium [&>tr]:last:border-b-0", className)}
    {...props}
  />
));
TableFooter.displayName = "TableFooter";

const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <tr
      data-slot="table-row"
      ref={ref}
      className={cn(
        "min-h-[46px] bg-background data-[state=selected]:bg-muted border-b border-b-[#DFE4EA] transition-colors",
        className,
      )}
      {...props}
    />
  ),
);
TableRow.displayName = "TableRow";

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    data-slot="table-head"
    ref={ref}
      className={cn(
      "h-12 border-r border-[#DFE4EA] bg-[#F3F4F6] px-4 py-3 pb-1 text-left align-middle font-medium whitespace-nowrap text-sm text-[#637381] last:border-r-0 [&:has([role=checkbox])]:px-3 [&>[role=checkbox]]:translate-y-1",
      className?.includes("sticky") ? "bg-[#F3F4F6] z-20 shadow-none" : "",
      className,
    )}
    {...props}
  />
));
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    data-slot="table-cell"
    ref={ref}
    className={cn(
      "min-h-[46px] border-r border-[#DFE4EA] bg-inherit px-4 py-3 align-middle font-medium whitespace-nowrap text-sm text-[#1F2A37] last:border-r-0 [&:has([role=checkbox])]:px-3 [&>[role=checkbox]]:translate-y-1",
      className?.includes("sticky") ? "bg-white z-20" : "",
      className,
    )}
    {...props}
  />
));
TableCell.displayName = "TableCell";

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    data-slot="table-caption"
    ref={ref}
    className={cn("text-muted-foreground mt-4 text-sm", className)}
    {...props}
  />
));
TableCaption.displayName = "TableCaption";

export { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow };
