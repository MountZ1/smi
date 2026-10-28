import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { AuthLayout } from "@/components/AuthLayout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { AuthProvider } from "@/context/AuthProvider";
import { LoginPage } from "@/pages/LoginPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { PostsPage } from "@/pages/PostsPage";
import { RecipesPage } from "@/pages/RecipesPage";
import { RecipeDetailPage } from "./pages/RecipeDetailPage";
import { PostDetailPage } from "./pages/PostDetailPage";
import { RecipesPageByTag } from "./pages/RecipesPageByTag";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/auth/recipes" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/auth" element={<ProtectedRoute />}>
            <Route element={<AuthLayout />}>
              <Route index element={<Navigate to="recipes" replace />} />
              <Route path="recipes" element={<RecipesPage />} />
              <Route path="recipes/:id" element={<RecipeDetailPage />} />
              <Route path="recipes/tag/:tag" element={<RecipesPageByTag />} />
              <Route path="posts" element={<PostsPage />} />
              <Route path="posts/:id" element={<PostDetailPage />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
