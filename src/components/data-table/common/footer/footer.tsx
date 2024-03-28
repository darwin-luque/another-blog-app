import {
  Pagination,
  PaginationItem,
  PaginationNext,
  PaginationContent,
  // PaginationEllipsis,
  PaginationPrevious,
  // PaginationButton,
} from "@/components/ui/pagination";
import { type Table } from "@tanstack/react-table";

export type DataTableFooterProps<TData> = {
  table: Table<TData>;
};

export const DataTableFooter = <TData,>({
  table,
}: DataTableFooterProps<TData>) => {
  return (
    <Pagination className="justify-end">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={() => table.previousPage()} />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext onClick={() => table.nextPage()} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
