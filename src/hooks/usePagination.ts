import { Dispatch, SetStateAction } from 'react'

export default function usePagination(
    totalPages: number,
    currentPage: number,
    setCurrentPage: Dispatch<SetStateAction<number>>
) {
    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1)
        }
    }

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prev) => prev + 1)
        }
    }

    return { handleNextPage, handlePreviousPage }
}
