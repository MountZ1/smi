import { Link } from "react-router";

export function NotFoundPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-3 p-4 text-center">
      <h1 className="text-4xl font-semibold">404</h1>
      <p className="text-muted-foreground">Halaman tidak ditemukan.</p>
      <Link to="/" className="text-sm underline underline-offset-2">
        Kembali ke beranda
      </Link>
    </div>
  );
}
