import type { ReactNode } from "react";
import type { ListParams, Paginated } from "@/types";
import { useFetch } from "@/hooks/useFetch";
import { useListParams } from "@/hooks/useListParams";
import { DataState } from "@/components/DataState";
import { Pagination } from "@/components/Pagination";
import { SearchBar } from "@/components/SearchBar";

interface PaginatedListProps<T extends { id: number }> {
  title: string;
  description: string;
  searchPlaceholder: string;
  pageSize: number;
  fetcher: (params: ListParams, signal: AbortSignal) => Promise<Paginated<T>>;
  renderItem: (item: T) => ReactNode;
  renderSkeleton: () => ReactNode;
  gridClassName: string;
}

export function PaginatedList<T extends { id: number }>({
  title,
  description,
  searchPlaceholder,
  pageSize,
  fetcher,
  renderItem,
  renderSkeleton,
  gridClassName,
}: PaginatedListProps<T>) {
  const { page, q, setPage, setQuery } = useListParams();

  const { data, error, loading, retry } = useFetch(
    (signal) => fetcher({ limit: pageSize, skip: (page - 1) * pageSize, q }, signal),
    [fetcher, pageSize, page, q],
  );

  const totalPages = data ? Math.ceil(data.total / pageSize) : 0;

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <SearchBar key={q} initialValue={q} placeholder={searchPlaceholder} onSearch={setQuery} />
      </div>

      <DataState
        loading={loading}
        error={error}
        isEmpty={!data || data.items.length === 0}
        onRetry={retry}
        loadingFallback={
          <div className={gridClassName}>
            {Array.from({ length: pageSize }, (_, index) => (
              <div key={index}>{renderSkeleton()}</div>
            ))}
          </div>
        }
        emptyTitle={q ? `Tidak ada hasil untuk "${q}"` : "Belum ada data"}
        emptyDescription={q ? "Coba kata kunci lain." : undefined}
      >
        <div className="space-y-8">
          <div className={gridClassName}>
            {data?.items.map((item) => (
              <div key={item.id}>{renderItem(item)}</div>
            ))}
          </div>
          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </div>
      </DataState>
    </section>
  );
}
