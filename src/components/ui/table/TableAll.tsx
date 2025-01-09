"use client";
import { useState } from "react";
import { flexRender } from "@tanstack/react-table";
import { CiSearch } from "react-icons/ci";
import {
  TiArrowSortedDown,
  TiArrowSortedUp,
  TiArrowUnsorted,
} from "react-icons/ti";

type ITable = {
  table: any;
};

const TableAll: React.FC<ITable> = ({ table }) => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  // const handleRowClick = (rowId: string) => {
  //   setSelectedRows((prevSelectedRows) => {
  //     if (prevSelectedRows.includes(rowId)) {
  //       return prevSelectedRows.filter((id) => id !== rowId);
  //     } else {
  //       return [...prevSelectedRows, rowId];
  //     }
  //   });
  // };

  return (
    <div className="rounded-md px-2">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full border-2 border-[#bdbdbd]">
          <thead className="">
            {table
              .getHeaderGroups()
              .map((headerGroup: { id: string; headers: any[] }) => (
                <tr key={headerGroup.id} className="">
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="p-4 bg-[#F5F5F5] border-r border-b border-[#D4D4D4]"
                    >
                      <div onClick={header.column.getToggleSortingHandler()}>
                        <div className="flex items-center gap-2 justify-start cursor-pointer select-none">
                          <div className="text-base text-secondary">
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </div>
                          {header.column.getCanSort() &&
                            (header.column.getIsSorted() === "asc" ? (
                              <TiArrowSortedUp className="inline" />
                            ) : header.column.getIsSorted() === "desc" ? (
                              <TiArrowSortedDown className="inline" />
                            ) : (
                              <TiArrowUnsorted className="inline" />
                            ))}
                        </div>
                      </div>
                      {header.column.getCanFilter() ? (
                        <div className="relative">
                          <CiSearch className="absolute text-xl top-3 left-2" />
                          <input
                            type="text"
                            className="my-1 px-8 py-1 w-full column-filter bg-white border border-[#D4D4D4] outline-none rounded-md "
                            onChange={(e : any) =>
                              header.column.setFilterValue(e.target.value)
                            }
                          />
                        </div>
                      ) : null}
                    </th>
                  ))}
                </tr>
              ))}
          </thead>

          <tbody>
            {table
              .getRowModel()
              .rows.map(
                (
                  row: { id: string; getVisibleCells: () => any[] },
                  index: number
                ) => (
                  <tr
                    key={row.id}
                    className={`border border-[#D4D4D4]  ${
                      selectedRows.includes(row.id) ? "" : ""
                    } ${index % 2 === 1 ? "bg-white" : "bg-gray-50"} `}

                    // onClick={() => handleRowClick(row.id)}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="px-4 text-secondary py-2 border-r border-[#D4D4D4]"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                )
              )}
          </tbody>
        </table>
      </div>
    </div>
  );
};


export default TableAll;