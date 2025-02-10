
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage, setItemsPerPage } from '../../../../Documents/Dev/wink-task/wink-task/src/store/booksSlice';
import type { RootState } from '../../../../Documents/Dev/wink-task/wink-task/src/store/store';
export default function Pagination() {
  const dispatch = useDispatch();
  const { currentPage, itemsPerPage, totalItems } = useSelector((state: RootState) => state.books);

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const itemsPerPageOptions = [5, 10, 15, 20];

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(Math.max(1, Math.min(page, totalPages))));
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-700">Items per page:</span>
        <select
          className="rounded border border-gray-300 p-1"
          value={itemsPerPage}
          onChange={(e) => dispatch(setItemsPerPage(Number(e.target.value) as typeof itemsPerPageOptions[number]))}
        >
          {itemsPerPageOptions.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <button
          className="rounded p-1 hover:bg-gray-100 disabled:opacity-50"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <img src='./left.svg' className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-1">
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNumber: number;
            if (totalPages <= 5) {
              pageNumber = i + 1;
            } else if (currentPage <= 3) {
              pageNumber = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNumber = totalPages - 4 + i;
            } else {
              pageNumber = currentPage - 2 + i;
            }

            return (
              <button
                key={pageNumber}
                className={`h-8 w-8 rounded ${
                  currentPage === pageNumber ? 'bg-green-500 text-white' : 'hover:bg-gray-100'
                }`}
                onClick={() => handlePageChange(pageNumber)}
              >
                {pageNumber}
              </button>
            );
          })}
        </div>

        <button
          className="rounded p-1 hover:bg-gray-100 disabled:opacity-50"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <img src='./right.svg' className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}