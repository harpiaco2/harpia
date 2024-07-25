"use client";

import * as React from "react";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const data: Data[] = [
  {
    id: "01",
    municipio: "Aceguá",
    estado: "RS",
    numContrato: 250.0,
    engResponsavel: "Credit Card",
    status: "Baixa",
    valor: 2.0,
  },
  {
    id: "02",
    municipio: "Barão",
    estado: "RS",
    numContrato: 250.0,
    engResponsavel: "Credit Card",
    status: "Alta Prioridade",
    valor: 1.0,
  },
  {
    id: "03",
    municipio: "Santa Maria",
    estado: "RS",
    numContrato: 250.0,
    engResponsavel: "Credit Card",
    status: "Média",
    valor: 1.0,
  },
  {
    id: "04",
    municipio: "Caçapava do Sul",
    estado: "RS",
    numContrato: 250.0,
    engResponsavel: "Credit Card",
    status: "Baixa",
    valor: 1.0,
  },
  {
    id: "05",
    municipio: "Belém",
    estado: "PA",
    numContrato: 250.0,
    engResponsavel: "Credit Card",
    status: "Média",
    valor: 1.0,
  },
  {
    id: "06",
    municipio: "Florianópolis",
    estado: "SC",
    numContrato: 250.0,
    engResponsavel: "Credit Card",
    status: "Máxima",
    valor: 1.0,
  },
  {
    id: "07",
    municipio: "São Paulo",
    estado: "SP",
    numContrato: 250,
    engResponsavel: "Credit Card",
    status: "Alta Prioridade",
    valor: 1.0,
  },
  {
    id: "08",
    municipio: "Brasília",
    estado: "DF",
    numContrato: 250,
    engResponsavel: "Credit Card",
    status: "Alta Prioridade",
    valor: 1.0,
  },
  {
    id: "09",
    municipio: "Rio de Janeiro",
    estado: "RJ",
    numContrato: 250,
    engResponsavel: "Credit Card",
    status: "Alta Prioridade",
    valor: 1.0,
  },
  {
    id: "10",
    municipio: "Fortaleza",
    estado: "CE",
    numContrato: 250,
    engResponsavel: "Credit Card",
    status: "Alta Prioridade",
    valor: 1.0,
  },
  {
    id: "11",
    municipio: "Recife",
    estado: "PE",
    numContrato: 250,
    engResponsavel: "Credit Card",
    status: "Alta Prioridade",
    valor: 1.0,
  },
];

export type Data = {
  id: string;
  municipio: string;
  estado: string;
  numContrato: number;
  valor: number;
  status: "Baixa" | "Média" | "Alta Prioridade" | "Máxima";
  engResponsavel: string;
};

export const columns: ColumnDef<Data>[] = [
  {
    accessorKey: "municipio",
    header: () => (
      <div className="font-semibold text-center text-sm">Município</div>
    ),
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("municipio")}</div>
    ),
  },
  {
    accessorKey: "estado",
    header: () => (
      <div className="font-semibold text-center text-sm">Estado</div>
    ),
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("estado")}</div>
    ),
  },
  {
    accessorKey: "numContrato",
    header: () => (
      <div className="font-semibold text-center text-sm">Nº Contrato</div>
    ),
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("numContrato")}</div>
    ),
  },
  {
    accessorKey: "engResponsavel",
    header: () => (
      <div className="font-semibold text-center text-sm">Eng Responsável</div>
    ),
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("engResponsavel")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: () => (
      <div className="font-semibold text-center text-sm">Status</div>
    ),
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("status")}</div>
    ),
  },
  {
    accessorKey: "valor",
    header: () => (
      <div className="font-semibold text-center text-sm">Valor</div>
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("valor"));

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(amount);

      return <div className="text-center">{formatted}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <div className="text-center">
          <Button variant="outline" className="h-8 w-8 p-2">
            <span>Ver</span>
          </Button>
        </div>
      );
    },
  },
];

export default function DataTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className=" flex flex-col gap-7 rounded-lg m-5 bg-white">
      <div className="flex items-center p-4">
        <Input
          placeholder="Filtrar Municipios..."
          value={
            (table.getColumn("municipio")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("municipio")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Colunas
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between space-x-2 p-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Anterior
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Próximo
        </Button>
      </div>
    </div>
  );
}
