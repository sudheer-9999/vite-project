import { Recipie } from "./types";

const STORAGE_KEY = "recipes";

export function getRecipes(): Recipie[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveRecipes(recipes: Recipie[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
}


export function generateUniqueId(): string {
  const now = new Date();
  const timestamp = now.getTime().toString();
  const randomNum = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");
  return `${timestamp}-${randomNum}`;
}

export function toggleFavorite(id: string): Recipie | null {
  const recipes = getRecipes();
  const recipe = recipes.find((recipe) => recipe.id === id);
  if (recipe) {
    recipe.isFavourite = !recipe.isFavourite;
    saveRecipes(recipes);
  }
  return recipe || null;
}
