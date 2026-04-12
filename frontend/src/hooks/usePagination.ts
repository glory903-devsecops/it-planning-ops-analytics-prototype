import { useState, useEffect, useMemo, useCallback } from 'react';

interface SortConfig<T> {
  key: keyof T | string;
  direction: 'asc' | 'desc';
}

interface UsePaginationProps<T> {
  data: T[];
  itemsPerPage: number;
  searchFields: (keyof T)[];
  initialSearchTerm?: string;
  initialSort?: SortConfig<T>;
}

export function usePagination<T>({
  data,
  itemsPerPage,
  searchFields,
  initialSearchTerm = '',
  initialSort,
}: UsePaginationProps<T>) {
  const [displaySearchTerm, setDisplaySearchTerm] = useState(initialSearchTerm);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(initialSearchTerm);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<SortConfig<T> | undefined>(initialSort);

  // Search debounce logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(displaySearchTerm);
      setCurrentPage(1); // Reset to page 1 on search
    }, 400);
    return () => clearTimeout(timer);
  }, [displaySearchTerm]);

  // Filtering and Sorting logic
  const processedData = useMemo(() => {
    let result = [...data];

    // 1. Filter
    if (debouncedSearchTerm) {
      const lowerTerm = debouncedSearchTerm.toLowerCase();
      result = result.filter((item) => {
        return searchFields.some((field) => {
          const value = item[field];
          if (value === null || value === undefined) return false;
          return String(value).toLowerCase().includes(lowerTerm);
        });
      });
    }

    // 2. Sort
    if (sortConfig) {
      result.sort((a: any, b: any) => {
        const aVal = a[sortConfig.key];
        const bVal = b[sortConfig.key];
        
        if (aVal === bVal) return 0;
        if (aVal === null || aVal === undefined) return 1;
        if (bVal === null || bVal === undefined) return -1;

        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [data, debouncedSearchTerm, searchFields, sortConfig]);

  // Pagination calculations
  const totalPages = Math.ceil(processedData.length / itemsPerPage);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return processedData.slice(start, start + itemsPerPage);
  }, [processedData, currentPage, itemsPerPage]);

  const toggleSort = useCallback((key: keyof T | string) => {
    setSortConfig((prev) => {
      if (prev?.key === key) {
        return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
      }
      return { key, direction: 'desc' };
    });
    setCurrentPage(1);
  }, []);

  return {
    displaySearchTerm,
    setDisplaySearchTerm,
    debouncedSearchTerm,
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedData,
    totalRecords: processedData.length,
    sortConfig,
    toggleSort,
  };
}
