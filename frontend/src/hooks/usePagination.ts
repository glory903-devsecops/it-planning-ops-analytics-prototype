import { useState, useEffect, useMemo } from 'react';

interface UsePaginationProps<T> {
  data: T[];
  itemsPerPage: number;
  searchFields: (keyof T)[];
  initialSearchTerm?: string;
}

export function usePagination<T>({
  data,
  itemsPerPage,
  searchFields,
  initialSearchTerm = '',
}: UsePaginationProps<T>) {
  const [displaySearchTerm, setDisplaySearchTerm] = useState(initialSearchTerm);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(initialSearchTerm);
  const [currentPage, setCurrentPage] = useState(1);

  // Search debounce logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(displaySearchTerm);
      setCurrentPage(1); // Reset to page 1 on search
    }, 400);
    return () => clearTimeout(timer);
  }, [displaySearchTerm]);

  // Filtering and memoizing data
  const filteredData = useMemo(() => {
    if (!debouncedSearchTerm) return data;
    
    const lowerTerm = debouncedSearchTerm.toLowerCase();
    return data.filter((item) => {
      return searchFields.some((field) => {
        const value = item[field];
        if (value === null || value === undefined) return false;
        return String(value).toLowerCase().includes(lowerTerm);
      });
    });
  }, [data, debouncedSearchTerm, searchFields]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [filteredData, currentPage, itemsPerPage]);

  return {
    displaySearchTerm,
    setDisplaySearchTerm,
    debouncedSearchTerm,
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedData,
    totalRecords: filteredData.length,
  };
}
