export interface AuthUser {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  image?: string;
}

export interface Session {
  user: AuthUser;
  accessToken: string;
  expiresAt: number;
}

export interface Recipe {
  id: number;
  name: string;
  image?: string;
  cuisine?: string;
  difficulty?: string;
  prepTimeMinutes?: number;
  cookTimeMinutes?: number;
  servings?: number;
  caloriesPerServing?: number;
  rating?: number;
  reviewCount?: number;
  tags?: string[];
  mealType?: string[];
  ingredients?: string[];
  instructions?: string[];
}

export interface Post {
  id: number;
  title: string;
  body?: string;
  tags?: string[];
  reactions?: { likes?: number; dislikes?: number };
  views?: number;
  userId?: number;
}

export interface PostComment {
  id: number;
  body: string;
  likes?: number;
  user?: { id?: number; username?: string; fullName?: string };
}

export interface Paginated<T> {
  items: T[];
  total: number;
  skip: number;
  limit: number;
}

export interface ListParams {
  limit: number;
  skip: number;
  q?: string;
}
