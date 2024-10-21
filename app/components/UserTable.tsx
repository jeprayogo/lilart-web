"use client";

import { useEffect, useState, useMemo } from "react";
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    flexRender,
} from '@tanstack/react-table';
import { useRouter } from "next/navigation";
import {
    FaRegEye,
    FaPenToSquare,
    FaBackwardStep,
    FaForwardStep,
    FaKey,
    FaBackward,
    FaForward,
    FaUserPlus
} from "react-icons/fa6";
import { encrypt } from "../lib/util";

export default function UserTable() {
    const [data, setData] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [pageSize, setPageSize] = useState(10);
    const [pageIndex, setPageIndex] = useState(0);

    const fetchData = async (pageIndex: number, pageSize: number) => {
        setLoading(true);

        const res = await fetch(`/api/users?page=${pageIndex + 1}&limit=${pageSize}`);
        const { data, pageCount } = await res.json();

        setData(data);
        setPageCount(pageCount);
        setLoading(false);
    };

    const router = useRouter();

    const handleAddButton = () => {
        router.push("/dashboard/master/user/create");
    };

    useEffect(() => {
        fetchData(pageIndex, pageSize);
    }, [pageIndex, pageSize]);

    const columns = useMemo(() => [
        {
            accessorKey: 'userId',
            header: 'User ID',
        },
        {
            accessorKey: 'email',
            header: 'Email',
        },
        {
            accessorKey: 'name',
            header: 'Nama',
        },
        {
            accessorKey: 'noHP',
            header: 'Nomor HP',
        },
        {
            accessorKey: 'isActive',
            header: 'Aktif ?',
        },
        {
            header: 'Aksi',
            id: 'action',
            cell: ({ row }: any) => (
                <div className="inline-flex rounded-md shadow-sm" role="group">
                    <button
                        onClick={() => router.push(`/dashboard/master/user/${encodeURIComponent(encrypt(row.original.userId))}`)}
                        className="inline-flex items-center text-white bg-purple-600 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-xs w-full sm:w-auto px-3 py-1.5 text-center me-1"><FaRegEye className="fill-white mr-1" /> Lihat</button>

                    <button
                        onClick={() => router.push(`/dashboard/master/user/${encodeURIComponent(encrypt(row.original.userId))}/edit`)}
                        className="inline-flex items-center text-white bg-purple-600 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-xs w-full sm:w-auto px-3 py-1.5 text-center mx-1"><FaPenToSquare className="fill-white mr-1" /> Edit</button>
                    <button
                        onClick={() => router.push(`/dashboard/master/user/${encodeURIComponent(encrypt(row.original.userId))}/changePassword`)}
                        className="inline-flex items-center text-white bg-purple-600 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-xs w-full sm:w-auto px-3 py-1 text-center ms-1"><FaKey className="fill-white mr-1" /> Ubah Password</button>
                </div>
            ),
        },
    ], [router]);

    const table = useReactTable({
        data,
        columns,
        pageCount,
        state: {
            pagination: { pageIndex, pageSize },
        },
        manualPagination: true,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: (updater) => {
            const nextPagination = typeof updater === 'function' ? updater(table.getState().pagination) : updater;
            setPageIndex(nextPagination.pageIndex);
            setPageSize(nextPagination.pageSize);
        },
    });

    return (
        <>
            <div className="flex justify-end items-center mb-4">
                <button className="inline-flex items-center text-white bg-purple-600 hover:bg-purple-800 hover:shadow-md focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" onClick={handleAddButton}><FaUserPlus fill="#ffff" className="me-2" /> Tambah Data</button>
            </div>
            <hr />
            <div className="m-4">
                Tampilkan {' '}
                <select value={table.getState().pagination.pageSize} onChange={e => table.setPageSize(Number(e.target.value))} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1.5">
                    {[10, 20, 30, 40, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            {pageSize}
                        </option>
                    ))}
                </select>
                {' '} data per halaman
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-700 border">
                    <thead className="text-xs bg-purple-600">
                        {
                            table.getHeaderGroups().map(headerGroup => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map(header => (
                                        <th key={header.id} scope="col" className="px-3 py-1.5 text-xs border text-white text-center">
                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                        </th>
                                    ))}
                                </tr>
                            ))
                        }
                    </thead>
                    <tbody>
                        {loading ? <tr><td colSpan={5} className="text-center font-medium text-md">Loading Data</td></tr> : table.getRowModel().rows.map(row => (
                            <tr key={row.id} className="odd:bg-white even:bg-gray-50 border-b hover:bg-gray-100">
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id} className="px-3 py-1.5 text-xs border">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-3 mx-4 flex flex-row items-center justify-end" >
                <span>
                    Page{' '}
                    <strong>
                        {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                    </strong>{' '}
                </span>
                <div className="inline-flex ms-2 xs:mt-0">
                    <button
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}
                        className="flex items-center justify-center px-2 h-8 text-xs font-medium bg-white fill-purple-700 hover:fill-white border border-gray-300 rounded-l-lg hover:bg-purple-200 hover:text-white"
                    >
                        <FaBackwardStep className="fill-purple-700" />
                    </button>
                    <button
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="flex items-center justify-center px-2 h-8 text-xs font-medium bg-white border border-gray-300 hover:bg-purple-200 "
                    >
                        <FaBackward className="fill-purple-700" />
                    </button>
                    <button
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className="flex items-center justify-center px-2 h-8 text-xs font-medium bg-white border border-gray-300 hover:bg-purple-200"
                    >
                        <FaForward className="fill-purple-700" />
                    </button>
                    <button
                        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                        disabled={!table.getCanNextPage()}
                        className="flex items-center justify-center px-2 h-8 text-base font-medium bg-white border border-gray-300 rounded-r-lg hover:bg-purple-200"
                    >
                        <FaForwardStep className="fill-purple-700" />
                    </button>
                </div>
            </div>
        </>

    );
}