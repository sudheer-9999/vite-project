import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import "./App.css";
import RecipieCard from "./components/recipiecard";
import Header from "./components/header";
import RecipeForm from "./components/recipieForm";
import { recipes } from "../utils/data";
import { filterRecipes } from "../utils/helperFunctions";
import { saveRecipes, getRecipes } from "../utils/localStorage";
import { Recipie, FilterTypes } from "../utils/types";

function App() {
  const [recipesData, setRecipesData] = useState<Recipie[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<Recipie>({
    id: "",
    title: "",
    ingredients: [],
    instructions: [],
    preparationTime: 0,
    isFavourite: false,
  });

  useEffect(() => {
    const data = getRecipes() || recipes;
    setRecipesData(data);
  }, []);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const openEditModal = (recipe: Recipie) => {
    setEditingRecipe(recipe);
    toggleModal();
  };

  const handleSubmit = (recipe: Recipie) => {
    const updatedRecipes = editingRecipe.id
      ? recipesData.map((r) => (r.id === recipe.id ? recipe : r))
      : [...recipesData, recipe];

    setRecipesData(updatedRecipes);
    saveRecipes(updatedRecipes);
    toggleModal();
  };

  const handleDeleteRecipe = (id: string) => {
    const updatedRecipes = recipesData.filter((recipe) => recipe.id !== id);
    setRecipesData(updatedRecipes);
    saveRecipes(updatedRecipes);
  };

  const handleFavourite = (id: string) => {
    const updatedRecipes = recipesData.map((recipe) =>
      recipe.id === id
        ? { ...recipe, isFavourite: !recipe.isFavourite }
        : recipe
    );

    setRecipesData(updatedRecipes);
    saveRecipes(updatedRecipes);
  };

  const filterChanges = (query: string, filter: FilterTypes) => {
    const data = getRecipes();
    const filteredData = filterRecipes(data, filter, query);
    console.log("🚀 ~ filterChanges ~ filteredData:", filteredData)
    setRecipesData(filteredData);
  };

  return (
    <>
      <Header filter={filterChanges} onEdit={openEditModal} />
      <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 gap-1">
        {recipesData.map((recipe) => (
          <RecipieCard
            key={recipe.id}
            onEdit={openEditModal}
            onDelete={handleDeleteRecipe}
            addFavourite={handleFavourite}
            recipie={recipe}
          />
        ))}
        <Modal
          style={{
            content: {
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
            },
          }}
          isOpen={isModalOpen}
        >
          <RecipeForm
            initialRecipe={editingRecipe}
            onSubmit={handleSubmit}
            onClose={toggleModal}
          />
        </Modal>
      </div>
    </>
  );
}

export default App;
