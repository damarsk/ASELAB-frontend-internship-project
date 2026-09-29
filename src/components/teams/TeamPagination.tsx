import { ArrowLeft, ArrowRight } from "lucide-react";

type TeamPaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function TeamPagination({
  currentPage,
  totalPages,
  onPageChange,
}: TeamPaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <nav
      className="mt-10 flex items-center justify-center gap-2"
      aria-label="Pagination tim"
    >
      <button
        type="button"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="flex size-10 items-center justify-center rounded-lg border border-border text-text-secondary transition-colors hover:border-brand-primary hover:text-brand-primary disabled:opacity-40"
        aria-label="Halaman sebelumnya"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
      </button>
      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (pageNumber) => (
          <button
            key={pageNumber}
            type="button"
            onClick={() => onPageChange(pageNumber)}
            aria-current={pageNumber === currentPage ? "page" : undefined}
            className={`size-10 rounded-lg text-sm font-medium transition-colors ${
              pageNumber === currentPage
                ? "bg-brand-primary text-white"
                : "border border-border text-text-secondary hover:border-brand-primary hover:text-brand-primary"
            }`}
          >
            {pageNumber}
          </button>
        ),
      )}
      <button
        type="button"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="flex size-10 items-center justify-center rounded-lg border border-border text-text-secondary transition-colors hover:border-brand-primary hover:text-brand-primary disabled:opacity-40"
        aria-label="Halaman berikutnya"
      >
        <ArrowRight className="size-4" aria-hidden="true" />
      </button>
    </nav>
  );
}
