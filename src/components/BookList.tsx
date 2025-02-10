import { useSelector } from 'react-redux';
import type { RootState } from '../../../../Documents/Dev/wink-task/wink-task/src/store/store';
import BookCard from './BookCard';

export default function BookList() {
  const { items, status, error } = useSelector((state: RootState) => state.books);

  if (status === 'loading') {
    return (
      <div className="flex justify-center py-8">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-green-500 border-t-transparent"></div>
      </div>
    );
  }

  if (status === 'failed') {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (items.length === 0) {
    return <div className="text-center text-gray-500">No books found</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}