import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { Book, BooksResponse } from '../types/books';

interface BooksState {
  items: Book[];
  totalItems: number;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  selectedBook: Book | null;
  currentPage: number;
  itemsPerPage: 5 | 10 | 15 | 20;
  searchTerm: string;
  isTyping: boolean;
}

const initialState: BooksState = {
  items: [],
  totalItems: 0,
  status: 'idle',
  error: null,
  selectedBook: null,
  currentPage: 1,
  itemsPerPage: 5,
  searchTerm: '',
  isTyping: false,
};

export const fetchBooks = createAsyncThunk(
  'books/fetchBooks',
  async ({ searchTerm, page, limit }: { searchTerm: string; page: number; limit: number }) => {
    if (!searchTerm.trim()) return { items: [], totalItems: 0 };
    const startIndex = (page - 1) * limit;
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchTerm)}&startIndex=${startIndex}&maxResults=${limit}`
    );
    const data: BooksResponse = await response.json();
    return data;
  }
);

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    // Select book
    setSelectedBook: (state, action: PayloadAction<Book | null>) => {
      state.selectedBook = action.payload;
    },
    // Pagination
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    // Items per page
    setItemsPerPage: (state, action: PayloadAction<5 | 10 | 15 | 20>) => {
      state.itemsPerPage = action.payload;
      state.currentPage = 1;
    },
    // Search
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      state.currentPage = 1;
    },
    // Typing
    setIsTyping: (state, action: PayloadAction<boolean>) => {
      state.isTyping = action.payload;
      if (action.payload) {
        state.status = 'loading';
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.items || [];
        state.totalItems = action.payload.totalItems || 0;
        state.isTyping = false;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch books';
        state.isTyping = false;
      });
  },
});

export const { setSelectedBook, setCurrentPage, setItemsPerPage, setSearchTerm, setIsTyping } = booksSlice.actions;
export default booksSlice.reducer;