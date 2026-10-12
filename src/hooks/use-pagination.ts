'use client'
import { useEffect, useState } from "react";

export default function usePagination<T>(list: T[], itemsPerPage: number) {

    const [currentPage, setCurrentPage] = useState(1);
    const [pagedList, setPagedList] = useState<T[]>([]);

    const totalPages = Math.ceil(list.length / itemsPerPage);

    useEffect(() => {
        const newPagedList = list.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
        setPagedList(newPagedList);
    }, [currentPage, totalPages]);

    return { pagedList, currentPage, setCurrentPage, totalPages };

}
