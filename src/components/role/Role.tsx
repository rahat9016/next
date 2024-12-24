"use client";

import { getUsers } from "@/api/api";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useQuery } from "@tanstack/react-query";
import {
    CellContext,
    ColumnVisibility,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { ToastContainer } from "react-toastify";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import TooltipDiv from "../ui/share/TooltipDiv";
import FilterTable from "../ui/table/FilterTable";
import TableAll from "../ui/table/TableAll";
import AddRole from "./AddRole";

export default function Role() {
    const [filtering, setFiltering] = useState("");
    const [editData, setEditData] = useState(null);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [filterModalOpen, setFilterModalOpen] = useState(false);
    const [columnVisibility, setColumnVisibility] = useState({});
    const [sorting, setSorting] = useState<SortingState>([]);
    const {
        isLoading,
        isError,
        data: allUserData,
        refetch,
    } = useQuery({
        queryKey: ["allUserData"],
        queryFn: () => getUsers(),
    });

    const data = useMemo(() => allUserData, [allUserData]);

    const handleEdit = (rowData: any) => {
        setEditData(rowData);
        setEditModalOpen(true);
    };
    const COLUMNS = [
        {
            header: "ID",
            accessorKey: "id",
            enableColumnFilter: false,
            enableSorting: false,
            cell: (info: CellContext<any, any>) => info.row.index + 1,
        },
        {
            header: "Name",
            accessorKey: "name",
        },
        {
            header: "Email",
            accessorKey: "email",
        },
        {
            header: "Action",
            accessor: "edit",
            enableSorting: false,
            cell: (row: any) => (
                <div className="flex gap-3 justify-center items-center w-full">
                    <button
                        onClick={() => handleEdit(row.row.original)}
                        className=" flex"
                    >
                        <TooltipDiv name="Edit" />
                    </button>
                </div>
            ),
        },
    ];
    const columns = useMemo(() => COLUMNS, []);

    const table = useReactTable({
        data: data ?? [], // Fallback to empty array if data is undefined
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting: sorting,
            globalFilter: filtering,
            columnVisibility: ColumnVisibility,
        },
        onSortingChange: setSorting,
        onGlobalFilterChange: setFiltering,
        onColumnVisibilityChange: setColumnVisibility,
    });

    return (
        <div>
            <FilterTable
                filtering={filtering}
                setFiltering={setFiltering}
                data={data}
                table={table}
                buttonName="Add"
                headerName="Add Role Information"
                open={filterModalOpen}
                setOpen={setFilterModalOpen}
                userName="User"
                usersNumber={data?.length}
            >
                <AddRole />
            </FilterTable>
            {isLoading ? <div>loading ...</div> : <TableAll table={table} />}

            <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
                <DialogContent className="bg-white w-[80vw]">
                    <DialogHeader>
                        <DialogTitle>Role Information Edit</DialogTitle>
                    </DialogHeader>
                    {/* <EditUser
                        setEditModalOpen={setEditModalOpen}
                        refetch={refetch}
                    /> */}
                </DialogContent>
            </Dialog>

            <ToastContainer />
        </div>
    );
}
