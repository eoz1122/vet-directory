import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;

    return (
        <div className="flex justify-center gap-3 py-4 border-t border-primary/5 mt-8 border-dashed">
            <button
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-5 py-2 text-xs font-bold bg-white border border-primary/10 rounded-xl hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-primary"
            >
                ← Prev
            </button>
            <div className="flex items-center px-4 py-2 border border-primary/5 rounded-xl bg-white shadow-sm">
                 <span className="text-[14px] font-black text-primary/80">{currentPage} <span className="text-[10px] text-primary/40 font-bold uppercase mx-1">of</span> {totalPages}</span>
            </div>
            <button
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-5 py-2 text-xs font-bold bg-white border border-primary/10 rounded-xl hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-primary"
            >
                Next →
            </button>
        </div>
    );
};
