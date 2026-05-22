import React from "react";

type Column<T> = {
  header: string;
  accessor: keyof T;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
};

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
}

function AdminTable<T extends Record<string, any>>({
  columns,
  data,
}: TableProps<T>) {
  if (!data?.length) {
    return (
      <div className="flex items-center justify-center py-14 text-lg font-medium text-gray-400 bg-white border border-gray-200 rounded-2xl shadow-sm">
        No data available
      </div>
    );
  }

  return (
    <div className="overflow-hidden bg-white border border-gray-200 rounded-2xl shadow-sm">

      {/* SCROLL CONTAINER */}
      <div className="max-h-[500px] overflow-y-auto overflow-x-auto">

        <table className="w-full min-w-[700px] border-collapse">

          {/* HEADER (STICKY) */}
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              {columns.map((col, index) => (
                <th
                  key={index}
                  className="
                    px-2 py-4
                    text-left
                    align-middle
                    text-sm font-semibold uppercase tracking-wide
                    text-gray-600
                    border-b border-gray-200
                    bg-gray-50
                  "
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={`
                  transition-all duration-200
                  hover:bg-gray-50
                  ${rowIndex % 2 === 0 ? "bg-white" : "bg-[rgba(0,0,0,0.02)]"}
                `}
              >
                {columns.map((col, colIndex) => {
                  const value = row[col.accessor];

                  return (
                    <td
                      key={colIndex}
                      className="
                        px-2 py-2
                        text-left
                        align-middle
                        text-sm text-gray-700
                        border-b border-gray-100
                      "
                    >
                      {col.render
                        ? col.render(value, row)
                        : String(value ?? "-")}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>

        </table>

      </div>
    </div>
  );
}

export default AdminTable;