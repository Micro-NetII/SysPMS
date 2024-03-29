import React from "react";
import { Pagination } from "@nextui-org/react";
 
export default function CustomPagination({
  page,
  pages,
  rowsPerPage,
  handleChangeRowsPerPage,
  items,
  setPage,
  children,
}) {
  return (
    <>
      <div className="bg-tableFooter border border-tableFooterBorder flex justify-end items-center lg:pl-72 w-full min-h-10vh fixed bottom-0 right-0 z-20 text-sm text-default-400 py-3">
        <div className="flex flex-row items-center">
          <Pagination
            isCompact
            showControls
            color="primary"
            variant="flat"
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
            className="mx-5"
          />
          <div>
            <span className="text-sm text-black">Items por página:</span>
            <select
              value={rowsPerPage}
              onChange={handleChangeRowsPerPage}
              className="ml-2 py-1 px-2 border rounded bg-transparent text-sm text-default-600 mx-5"
            >
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={150}>150</option>
              <option value={250}>250</option>
            </select>
          </div>
          <div className="ml-5 mr-10 text-black">
            {items?.length > 0
              ? `${(page - 1) * rowsPerPage + 1}-${Math.min(
                  page * rowsPerPage,
                  items.length
                )} de ${items.length}`
              : "0 resultados"}
          </div>
        </div>
      </div>
 
      {children}
    </>
  );
}