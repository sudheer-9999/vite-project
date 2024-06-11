import React, { useState } from "react";
import { Recipie } from "../../utils/types";
import { FaWindowClose } from "react-icons/fa";
import { generateUniqueId } from "../../utils/localStorage";

interface Props {
  initialRecipe: Recipie;
  onClose: () => void;
  onSubmit: (recipe: Recipie) => void;
}

const RecipeForm: React.FC<Props> = ({ onSubmit, initialRecipe, onClose }) => {
  const [recipe, setRecipe] = useState(
    initialRecipe || {
      id: "",
      title: "",
      ingredients: [],
      instructions: [],
      preparationTime: 0,
      isFavourite: false,
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    let newValue;

    if (type === "checkbox") {
      newValue = checked;
    } else if (name === "ingredients" || name === "instructions") {
      // Split the value by '|' to create an array
      newValue = value.split("|");
    } else {
      newValue = value;
    }

    setRecipe((prevRecipe: Recipie) => ({
      ...prevRecipe,
      [name]: newValue,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ ...recipe, id: recipe.id ? recipe.id : generateUniqueId() });
    onClose();
    setRecipe({
      id: "",
      title: "",
      ingredients: [],
      instructions: [],
      preparationTime: 0,
      isFavourite: false,
    });
  };

  return (
    <div className="modal w-[80vw] h-[80vh]">
      <div className="modal-content">
        <div className="w-full flex">
          <button className="ml-auto" onClick={onClose}>
            <FaWindowClose className="h-[30px] w-[30px]" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="block mb-2 text-xl font-medium text-gray-900 ">
              Title:
            </label>
            <input
              className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              type="text"
              name="title"
              value={recipe.title}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block mb-2 text-xl font-medium text-gray-900 ">
              Ingredients:
            </label>
            <input
              className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              type="text"
              name="ingredients"
              value={recipe.ingredients.join("|")}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block mb-2 text-xl font-medium text-gray-900 ">
              Instructions:
            </label>
            <input
              className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              name="instructions"
              value={recipe.instructions.join("|")}
              onChange={handleChange}
            ></input>
          </div>
          <div>
            <label className="block mb-2 text-xl font-medium text-gray-900 ">
              Preparation Time (in minutes):
            </label>
            <input
              className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              type="number"
              name="preparationTime"
              value={recipe.preparationTime}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block mb-2 text-xl font-medium text-gray-900 ">
              Favourite:
            </label>
            <input
              type="checkbox"
              name="isFavourite"
              checked={recipe.isFavourite}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default RecipeForm;
