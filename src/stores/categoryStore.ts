import { create } from "zustand";
import type { Category } from "../features/category/category.types";

interface CategoryStore {
    categories: Category[];
    loading: boolean;
    error: string | null;
    setCategories: (categories: Category[]) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    addCategory: (category: Category) => void;
    updateCategory: (id: string, category: Partial<Category>) => void;
    deleteCategory: (id: string) => void;
}

export const useCategoryStore = create<CategoryStore>((set) => ({
    categories: [],
    loading: false,
    error: null,
    setCategories: (categories) => set({ categories }),
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),
    addCategory: (category) => set((state) => ({ categories: [...state.categories, category] })),
    updateCategory: (id, category) => set((state) => ({
        categories: state.categories.map((c) => c.id === id ? { ...c, ...category } : c)
    })),
    deleteCategory: (id) => set((state) => ({
        categories: state.categories.filter((c) => c.id !== id)
    }))
}))