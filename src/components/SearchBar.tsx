import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchTerm, setIsTyping } from '../../../../Documents/Dev/wink-task/wink-task/src/store/booksSlice';
import debounce from 'debounce';

export default function SearchBar() {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');

  const debouncedSearch = React.useMemo(
    () => debounce((value: string) => {
      dispatch(setSearchTerm(value));
      dispatch(setIsTyping(false));
    }, 500),
    [dispatch]
  );

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    dispatch(setIsTyping(true));
    debouncedSearch(value);
  }, [debouncedSearch, dispatch]);

  return (
    <div className="relative w-full max-w-xl">
      <div className="relative">
        <img src='./search.svg' className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
          placeholder="Search books..."
          value={inputValue}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
}