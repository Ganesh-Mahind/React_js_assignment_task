import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import * as XLSX from "xlsx";
import FilterInput from "./FilterInput";
import TablePagination from "./TablePagination";
import AddEntryForm from "./AddEntryForm";

const DataTable = () => {
  const data = useSelector((state) => state.table.data);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [showForm, setShowForm] = useState(false);

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "name",
        header: "Name",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "age",
        header: "Age",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "email",
        header: "Email",
        cell: (info) => info.getValue(),
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter: globalFilterValue,
    },
    onGlobalFilterChange: setGlobalFilterValue,
    globalFilterFn: (row, columnId, filterValue) => {
      // Check all cells in the row for a match (global search)
      return row.getAllCells().some(cell => {
        const cellValue = cell.getValue();
        return String(cellValue).toLowerCase().includes(String(filterValue).toLowerCase());
      });
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Data");
    XLSX.writeFile(wb, "table_data.xlsx");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <h2 style={{ textAlign: "center" }}>React Table with Redux</h2>
      <button onClick={() => setShowForm(true)} style={{ margin: "10px" }}>
        + Add New Entry
      </button>
      {showForm && <AddEntryForm onClose={() => setShowForm(false)} />}
      <FilterInput
        globalFilter={globalFilterValue}
        setGlobalFilter={setGlobalFilterValue}
      />
      <button onClick={exportToExcel} style={{ marginBottom: "20px" }}>
        Download Excel
      </button>
      <table
        style={{ margin: "20px auto", width: "80%", textAlign: "center" }}
        border="1"
      >
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  <span>
                    {header.column.getIsSorted()
                      ? header.column.getIsSorted() === "desc"
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <TablePagination
        previousPage={table.previousPage}
        nextPage={table.nextPage}
        canPreviousPage={table.getCanPreviousPage()}
        canNextPage={table.getCanNextPage()}
      />
    </div>
  );
};

export default DataTable;
