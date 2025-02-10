import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { setSelectedBook } from '../store/booksSlice';

export default function BookDetail() {
  const dispatch = useDispatch();
  const book = useSelector((state: RootState) => state.books.selectedBook);

  if (!book) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-6">
        <button
          className="absolute right-4 top-4 rounded-full p-1 hover:bg-gray-100"
          onClick={() => dispatch(setSelectedBook(null))}
        >
          <img src='./close.svg' className="h-6 w-6" />
        </button>

        <div className="mb-6 flex flex-col gap-6 sm:flex-row">
          <img
            src={book.volumeInfo.imageLinks?.thumbnail || ''}
            alt={book.volumeInfo.title}
            className="h-48 w-32 rounded object-cover shadow-md"
          />
          <div>
            <h2 className="mb-2 text-2xl font-bold">{book.volumeInfo.title}</h2>
            <p className="mb-2 text-gray-600">{book.volumeInfo.authors?.join(', ') || 'Unknown Author'}</p>
            {book.volumeInfo.publisher && (
              <p className="mb-1 text-sm text-gray-500">
                Publisher: {book.volumeInfo.publisher}
              </p>
            )}
            {book.volumeInfo.publishedDate && (
              <p className="mb-1 text-sm text-gray-500">
                Published: {book.volumeInfo.publishedDate}
              </p>
            )}
            {book.volumeInfo.pageCount && (
              <p className="mb-1 text-sm text-gray-500">
                Pages: {book.volumeInfo.pageCount}
              </p>
            )}
          </div>
        </div>

        {book.volumeInfo.description && (
          <div className="mb-6">
            <h3 className="mb-2 text-lg font-semibold">Description</h3>
            <p className="text-gray-700">{book.volumeInfo.description}</p>
          </div>
        )}

        {book.volumeInfo.categories && (
          <div className="mb-6">
            <h3 className="mb-2 text-lg font-semibold">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {book.volumeInfo.categories.map((category) => (
                <span
                  key={category}
                  className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-800"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        )}

        <a
          href={book.volumeInfo.infoLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-green-600"
        >
          View on Google Books
        </a>
      </div>
    </div>
  );
}