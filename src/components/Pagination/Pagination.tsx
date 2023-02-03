import { Dispatch, SetStateAction } from 'react'
import usePagination from '../../hooks/usePagination'
import Button from '../Button/Button'

export interface PaginationProps {
    totalPages: number
    currentPage: number
    setPageNumber: Dispatch<SetStateAction<number>>
}

export default function Pagination({
    totalPages,
    setPageNumber,
    currentPage,
}: PaginationProps) {
    const { handleNextPage, handlePreviousPage } = usePagination(
        totalPages,
        currentPage,
        setPageNumber
    )

    return (
        <div className="flex gap-8">
            <Button
                fontSize="1.5rem"
                onclick={handlePreviousPage}
                mainColor={currentPage < 2 ? '--buttonGray' : '--buttonBlue'}
            >
                prev
            </Button>
            <Button
                fontSize="1.5rem"
                onclick={handleNextPage}
                mainColor={
                    currentPage === totalPages ? '--buttonGray' : '--buttonBlue'
                }
            >
                next
            </Button>
        </div>
    )
}
