import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks } from './store/booksSlice';
import type { RootState, AppDispatch } from './store/store';
import SearchBar from './components/SearchBar';
import BookList from './components/BookList';
import Pagination from './components/Pagination';
import BookDetail from './components/BookDetail';

function BooksApp() {
  const dispatch = useDispatch<AppDispatch>();
  const { searchTerm, currentPage, itemsPerPage } = useSelector((state: RootState) => state.books);

  useEffect(() => {
    dispatch(fetchBooks({ searchTerm, page: currentPage, limit: itemsPerPage }));
  }, [dispatch, searchTerm, currentPage, itemsPerPage]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-4">
            <p className="text-2xl">📚</p>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Book Finder</h1>
            <p className="text-2xl">📚</p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex justify-center">
          <SearchBar />
        </div>
        <BookList />
        <div className="mt-8">
          <Pagination />
        </div>

        <BookDetail />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <BooksApp />
    </Provider>
  );
}