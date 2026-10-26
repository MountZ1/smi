# SMI – Recipes & Posts

Aplikasi web sederhana berbasis React yang menampilkan halaman login dan dua halaman data (Recipes dan Posts) dengan data dari [DummyJSON](https://dummyjson.com/docs). Dibuat sebagai coding test Front-End Engineer.

**Demo:** _(isi dengan link Vercel)_

## Fitur

- **Login** memakai endpoint `POST /auth/login` dari DummyJSON, lengkap dengan validasi form, loading state, dan pesan error dari server.
- **Proteksi route**: semua halaman di bawah `/auth` hanya bisa diakses setelah login. Pengguna yang belum login diarahkan ke `/login`, dan pengguna yang sudah login diarahkan dari `/login` ke `/auth/recipes`.
- **Sesi** disimpan di `localStorage` dan otomatis berakhir saat token kedaluwarsa (60 menit).
- **Recipes** (`/auth/recipes`) dan **Posts** (`/auth/posts`) dengan pencarian dan pagination. Halaman dan kata kunci tersimpan di URL (`?page=2&q=pasta`), jadi tetap ada setelah refresh.
- **Penanganan kondisi data**: loading (skeleton), error (dengan tombol "Coba lagi"), data kosong (hasil pencarian tidak ditemukan), dan data tidak valid (struktur respons dicek, item rusak dibuang).
- **Detail** resep (`/auth/recipes/:id`) berisi bahan dan langkah memasak, dan detail postingan (`/auth/posts/:id`) berisi komentar. Keduanya punya loading, error, dan not-found state sendiri.

## Akun demo

| Username | Password     |
| -------- | ------------ |
| `emilys` | `emilyspass` |

Catatan: endpoint login DummyJSON memakai **username**, bukan email. Daftar akun lain ada di <https://dummyjson.com/users>.

## Cara menjalankan

Prasyarat: [Bun](https://bun.sh) (atau Node.js 20+ dengan npm).

```bash
bun install
bun run dev      # development di http://localhost:5173
bun run build    # build production ke folder dist
bun run preview  # jalankan hasil build secara lokal
```

## Tools yang digunakan

| Kebutuhan   | Pilihan                                                                          |
| ----------- | -------------------------------------------------------------------------------- |
| Bahasa      | TypeScript                                                                       |
| Framework   | React 19 + Vite                                                                  |
| Routing     | React Router (declarative mode)                                                  |
| Styling     | Tailwind CSS v4                                                                  |
| Komponen UI | [shadcn/ui](https://ui.shadcn.com) (Button, Input, Label, Card, Badge, Skeleton) |
| HTTP        | Fetch API (dibungkus di `src/lib/http.ts`)                                       |
| Package mgr | Bun                                                                              |

**Library tambahan:** `react-router` untuk routing dan shadcn/ui untuk komponen dasar. Tidak ada library state management atau data fetching tambahan, karena kebutuhan aplikasi ini cukup ditangani oleh React Context dan satu custom hook.

## Struktur folder

```
src/
├── components/     Komponen UI yang dipakai ulang (DataState, Pagination, SearchBar, PaginatedList, kartu, layout)
│   └── ui/         Komponen shadcn/ui
├── context/        AuthProvider dan context autentikasi
├── hooks/          useAuth, useFetch, useListParams
├── lib/            Logic non-UI: wrapper fetch, validasi form, parsing respons
├── pages/          LoginPage, RecipesPage, PostsPage, NotFoundPage
├── services/       Pemanggilan API (auth, recipes, posts)
└── types/          Tipe TypeScript
```

## Keputusan desain

- **Logic dipisah dari UI.** Semua pemanggilan API ada di `services/`, validasi dan parsing di `lib/`, sedangkan komponen hanya merender state.
- **Reusable component.** `PaginatedList` menangani judul, pencarian, loading/error/empty state, grid, dan pagination, sehingga halaman Recipes dan Posts hanya berisi konfigurasi. `DataState`, `Pagination`, dan `SearchBar` juga berdiri sendiri.
- **Request aman.** `useFetch` membatalkan request lama dengan `AbortController` saat halaman atau kata kunci berubah, sehingga tidak ada race condition.
- **Keterbatasan.** Token disimpan di `localStorage` karena tidak ada backend sendiri. Untuk aplikasi production, pendekatan yang lebih aman adalah cookie `httpOnly` dari server.

## Deploy ke Vercel

Import repository di Vercel, preset Vite terdeteksi otomatis. File `vercel.json` mengarahkan semua path ke `index.html` agar refresh di `/auth/recipes` tidak menghasilkan 404.
