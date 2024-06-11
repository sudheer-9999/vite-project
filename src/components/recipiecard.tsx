import React from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { MdEdit } from "react-icons/md";
import { Recipie } from "../../utils/types";
import { BiLike } from "react-icons/bi";
import { AiFillLike } from "react-icons/ai";

interface Props {
  recipie: Recipie;
  onDelete: (id: string) => void;
  addFavourite: (id: string) => void;
  onEdit: (recipie: Recipie) => void;
}

const RecipieCard: React.FC<Props> = ({
  recipie,
  onDelete,
  addFavourite,
  onEdit,
}) => {
  const { ingredients, instructions, preparationTime, title, isFavourite, id } =
    recipie;
  return (
    <>
      <div className="flex flex-col bg-white border shadow-sm rounded-xl p-4 md:p-5">
        <button onClick={() => addFavourite(id)} className="ml-auto">
          {isFavourite ? (
            <AiFillLike className="h-[30px] w-[30px]" />
          ) : (
            <BiLike className="h-[30px] w-[30px]" />
          )}
        </button>

        <h3 className="text-lg font-bold text-gray-800">{title}</h3>
        <h1 className="text-[25px] font-extrabold">ingredients</h1>
        <ul>
          {ingredients.map((e) => (
            <li className="mt-2 text-gray-500">{e}</li>
          ))}
        </ul>
        <h1 className="text-[25px] font-extrabold">instructions</h1>
        <ol start={1}>
          {instructions.map((e) => (
            <li className="mt-2 text-gray-500">{e}</li>
          ))}
        </ol>
        <p className="mt-2 text-gray-900">{preparationTime} miniutes</p>
        <div className="flex">
          <button onClick={() => onEdit(recipie)}>
            <MdEdit className="h-[30px] w-[30px]" />
          </button>
          <button onClick={() => onDelete(id)}>
            <RiDeleteBin6Fill className="h-[30px] w-[30px] ml-[30px]" />
          </button>
        </div>
      </div>
    </>
  );
};

export default RecipieCard;
