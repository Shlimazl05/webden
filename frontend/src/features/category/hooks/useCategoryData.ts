// src/features/category/hooks/useCategoryData.ts
import { useState, useEffect, useCallback } from 'react';
import { categoryApi } from '../api/category.admin.api';
import { ICategory } from '../category.types';

export const useCategoryData = (itemsPerPage = 10) => {
    const [categories, setCategories] = useState<ICategory[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Hidden'>('All');

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchTerm);
            setCurrentPage(1);
        }, 500);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    const fetchCategories = useCallback(async (page: number, search: string, status: string) => {
        try {
            setLoading(true);
            const finalStatus = status === 'All' ? '' : status;
            const response = await categoryApi.getAll(page, itemsPerPage, search, finalStatus);
            setCategories(response.categories || []);
            setTotalPages(response.pagination?.totalPages || 1);
        } catch (err) {
            setCategories([]);
        } finally {
            setLoading(false);
        }
    }, [itemsPerPage]);

    useEffect(() => {
        fetchCategories(currentPage, debouncedSearch, statusFilter);
    }, [currentPage, debouncedSearch, statusFilter, fetchCategories]);

    return {
        categories, setCategories, loading, currentPage, setCurrentPage,
        totalPages, setSearchTerm, statusFilter, setStatusFilter,
        refresh: () => fetchCategories(currentPage, debouncedSearch, statusFilter)
    };
};