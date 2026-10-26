import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface DataStateProps {
  loading: boolean;
  error: string | null;
  isEmpty: boolean;
  onRetry: () => void;
  loadingFallback: ReactNode;
  emptyTitle: string;
  emptyDescription?: string;
  children: ReactNode;
}

export function DataState({
  loading,
  error,
  isEmpty,
  onRetry,
  loadingFallback,
  emptyTitle,
  emptyDescription,
  children,
}: DataStateProps) {
  if (loading) return <>{loadingFallback}</>;

  if (error) {
    return (
      <div
        role="alert"
        className="flex flex-col items-center gap-3 rounded-lg border border-destructive/40 bg-destructive/5 p-8 text-center"
      >
        <p className="font-medium">Gagal memuat data</p>
        <p className="text-sm text-muted-foreground">{error}</p>
        <Button variant="outline" size="sm" onClick={onRetry}>
          Coba lagi
        </Button>
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="flex flex-col items-center gap-1 rounded-lg border border-dashed p-12 text-center">
        <p className="font-medium">{emptyTitle}</p>
        {emptyDescription && <p className="text-sm text-muted-foreground">{emptyDescription}</p>}
      </div>
    );
  }

  return <>{children}</>;
}
