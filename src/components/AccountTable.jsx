// src/components/AccountTable.jsx
import React, { useState, useMemo, useEffect } from 'react';
import { Box, TextField, Typography, IconButton, Button } from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table';
import * as XLSX from 'xlsx';
import { useSelector } from 'react-redux';
import ExcelLogo from '../assets/excel-logo.png'; // Custom Excel logo image

export default function AccountTable() {
  const data = useSelector((state) => state.table.data);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState([]);

  useEffect(() => {
    console.log('Updated account data:', data);
  }, [data]);

  // Define columns (keys must match Redux data, e.g., "AccountName")
  const columns = useMemo(() => [
    {
      accessorKey: 'AccountName',
      header: 'Account Name',
      cell: info => info.getValue(),
    },
    {
      accessorKey: 'email',
      header: 'Email',
      cell: info => info.getValue(),
    },
    {
      accessorKey: 'phone',
      header: 'Phone no',
      cell: info => info.getValue(),
    },
    {
      accessorKey: 'website',
      header: 'Website',
      cell: info => info.getValue(),
    },
    {
      accessorKey: 'industry',
      header: 'Industry',
      cell: info => info.getValue(),
    },
    {
      accessorKey: 'accountStatus',
      header: 'Account Status',
      cell: info => info.getValue(),
    },
    {
      accessorKey: 'remark',
      header: 'Remark',
      cell: info => info.getValue(),
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: () => <Typography variant="body2">...</Typography>,
    },
  ], []);

  const table = useReactTable({
    data,
    columns,
    state: { globalFilter, sorting },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    globalFilterFn: (row, columnId, filterValue) => {
      return row.getAllCells().some(cell =>
        String(cell.getValue()).toLowerCase().includes(String(filterValue).toLowerCase())
      );
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  // Toggle sorting for the "AccountName" column
  const handleToggleSort = () => {
    const currentSort = sorting.find(s => s.id === 'AccountName');
    if (!currentSort) {
      setSorting([{ id: 'AccountName', desc: false }]);
    } else if (currentSort && !currentSort.desc) {
      setSorting([{ id: 'AccountName', desc: true }]);
    } else {
      setSorting([]);
    }
  };

  // Download the filtered/sorted data as an Excel file
  const handleDownload = () => {
    const filteredData = table.getRowModel().rows.map(row => row.original);
    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Accounts");
    XLSX.writeFile(wb, "accounts.xlsx");
  };

  return (
    <Box>
      {/* Top row: Left header & Right control area */}
      <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 2, 
          flexWrap: 'wrap' 
        }}>
        {/* Left Header Section */}
        <Box sx={{ textAlign: 'left', mb: { xs: 1, sm: 0 } }}>
          <Typography variant="h6" gutterBottom>
            Account Lists
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Here is the list of your accounts
          </Typography>
        </Box>
        {/* Right Control Area */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton onClick={handleDownload} title="Download Excel">
            <img src={ExcelLogo} alt="Excel Download" style={{ width: '24px', height: '24px' }} />
          </IconButton>
          <Button 
            variant="outlined" 
            onClick={handleToggleSort} 
            title="Toggle Sort (Account Name)"
            startIcon={<SortIcon sx={{ fontSize: '20px' }} />}
            sx={{ textTransform: 'none' }}
          >
            View
          </Button>
          <TextField 
            variant="outlined" 
            placeholder="Search..." 
            value={globalFilter} 
            onChange={(e) => setGlobalFilter(e.target.value)} 
            size="small"
          />
        </Box>
      </Box>
      
      {/* Responsive Table Container */}
      <Box sx={{ overflowX: 'auto', width: '100%' }}>
        <table style={{ width: '100%', minWidth: '600px', borderCollapse: 'collapse', border: 'none' }}>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id} style={{ padding: '8px', textAlign: 'center', border: 'none' }}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())
                    }
                    <span>
                      {header.column.getIsSorted()
                        ? header.column.getIsSorted() === 'desc'
                          ? ' 🔽'
                          : ' 🔼'
                        : ''}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} style={{ padding: '8px', textAlign: 'center', border: 'none' }}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
    </Box>
  );
}
