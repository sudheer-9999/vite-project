import { Recipie, FilterTypes } from "./types";

export const filterBasedOnPreparation = (
  recipes: Recipie[],
  filter: FilterTypes
) => {
  switch (filter) {
    case "lessThan30":
      return recipes.filter((recipe) => recipe.preparationTime < 30);
    case "between30And60":
      return recipes.filter(
        (recipe) => recipe.preparationTime >= 30 && recipe.preparationTime <= 60
      );
    case "moreThan60":
      return recipes.filter((recipe) => recipe.preparationTime > 60);
    default:
      return recipes;
  }
};

export const filterRecipes = (
  recipes: Recipie[],
  filter: FilterTypes,
  searchText: string
) => {
  let filteredRecipes = filterBasedOnPreparation(recipes, filter);

  if (searchText.trim() !== "") {
    filteredRecipes = filteredRecipes.filter(
      (recipe) =>
        recipe.title.toLowerCase().includes(searchText.toLowerCase()) ||
        recipe.ingredients.some((ingredient) =>
          ingredient.toLowerCase().includes(searchText.toLowerCase())
        )
    );
  }

  return filteredRecipes;
};
