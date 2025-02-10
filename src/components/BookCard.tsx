import { useDispatch } from 'react-redux';
import { Book } from '../types/books';
import { setSelectedBook } from '../store/booksSlice';
interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  const dispatch = useDispatch();

  return (
    <div
      className="cursor-pointer overflow-hidden rounded-lg bg-white shadow-md transition-transform hover:scale-105"
      onClick={() => dispatch(setSelectedBook(book))}
    >
      <div className="aspect-[3/4] w-full">
        <img
          src={book.volumeInfo.imageLinks?.thumbnail || ''}
          alt={book.volumeInfo.title}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="mb-2 text-lg font-semibold">{book.volumeInfo.title}</h3>
        <p className="mb-2 text-sm text-gray-600">
          {book.volumeInfo.authors?.join(', ') || 'Unknown Author'}
        </p>
        <p className="line-clamp-2 text-sm text-gray-500">
          {book.volumeInfo.description || 'No description available'}
        </p>
      </div>
    </div>
  );
}