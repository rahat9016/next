// "use client";

// import { getUsers } from "@/api/api";
// import { rowValue } from "@/lib/redux/Reducer/MainSlice";
// import { useQuery } from "@tanstack/react-query";
// import { useMemo, useState } from "react";
// import { useDispatch } from "react-redux";

// import {
//   getCoreRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   SortingState,
//   useReactTable
// } from "@tanstack/react-table";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle
// } from "../ui/dialog";
// import TooltipDiv from "../ui/share/TooltipDiv";
// import FilterTable from "../ui/table/FilterTable";
// import TableAll from "../ui/table/TableAll";
// import TablePagination from "../ui/table/TablePagination";
// import AddUser from "./AddUser";
// import EditUser from "./EditUser";

// interface EditDataProps {
//   name: string;
//   email: string;
//   gender: string;
// }

// const User = () => {
//   const [editData, setEditData] = useState<EditDataProps | null>(null);
//   const [editModalOpen, setEditModalOpen] = useState(false); // State for edit modal
//   const [filterModalOpen, setFilterModalOpen] = useState(false); // Separate state for the filter modal
//   const dispatch = useDispatch();

//   const handleEdit = (rowData: any) => {
//     dispatch(rowValue(rowData)); // Dispatching the action to update Redux store
//     setEditData(rowData); // Set the data to edit
//     setEditModalOpen(true); // Open the Edit Dialog
//   };

//   const COLUMNS = [
//     {
//       header: "ID",
//       accessorKey: "id",
//       enableColumnFilter: false,
//       enableSorting: false,
//       // cell: (info: CellContext<any, any>) => info.row.index + 1, // Auto-generate serial number
//     },
//     // {
//     //   header: "ID",
//     //   accessorKey: "id",
//     //   enableColumnFilter: false,
//     //   enableSorting: false,
//     //   cell: (info: CellContext<any, any>) => info.row.index + 1, // Auto-generate serial number
//     // },
//     {
//       header: "Name",
//       accessorKey: "name",
//     },
//     {
//       header: "Email",
//       accessorKey: "email",
//     },
//     {
//       header: "Action",
//       accessor: "edit",
//       enableSorting: false,
//       cell: (row: any) => (
//         <div className="flex gap-3 justify-center items-center w-full">
//           <button
//             onClick={() => handleEdit(row.row.original)}
//             className=" flex"
//           >
//             <TooltipDiv name="Edit" />
//           </button>
//         </div>
//       ),
//     },
//   ];

//   const {
//     isLoading,
//     isError,
//     data: allUserData,
//     refetch,
//   } = useQuery({
//     queryKey: ["allUserData"],
//     queryFn: () => getUsers(),
//   });

//   console.log("allUserData", allUserData);

//   const columns = useMemo(() => COLUMNS, []);
//   const data = useMemo(() => allUserData, [allUserData]);

//   const [sorting, setSorting] = useState<SortingState>([]);
//   const [filtering, setFiltering] = useState("");
//   const [columnVisibility, setColumnVisibility] = useState({});

//   const table = useReactTable({
//     data: data ?? [], // Fallback to empty array if data is undefined
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     state: {
//       sorting: sorting,
//       globalFilter: filtering,
//       columnVisibility: columnVisibility,
//     },
//     onSortingChange: setSorting,
//     onGlobalFilterChange: setFiltering,
//     onColumnVisibilityChange: setColumnVisibility,
//   });

//   return (
//     <div>
//       <p className="underline text-5xl font-bold text-sky-900">User</p>

//       <FilterTable
//         filtering={filtering}
//         setFiltering={setFiltering}
//         data={data}
//         table={table}
//         buttonName="Add"
//         headerName="Add User Information"
//         open={filterModalOpen}
//         setOpen={setFilterModalOpen}
//         userName="User"
//         usersNumber={data?.length}
//       >
//         <AddUser setOpen={setFilterModalOpen} refetch={refetch} />
//       </FilterTable>

//       {isLoading ? <div>loading ...</div> : <TableAll table={table} />}

//       {!isLoading && <TablePagination table={table} />}

//       <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
//         <DialogContent className="bg-white w-[80vw]">
//           <DialogHeader>
//             <DialogTitle>User Information Edit</DialogTitle>
//           </DialogHeader>
//           <EditUser setEditModalOpen={setEditModalOpen} refetch={refetch} />
//         </DialogContent>
//       </Dialog>

//       <ToastContainer />
//     </div>
//   );
// };

// export default User;

import React from 'react'

export default function User() {
  return (
    <div>User</div>
  )
}

