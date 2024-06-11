import React, { useState } from "react";
import { FilterTypes, Recipie } from "../../utils/types";
import { debounce } from "lodash";

interface Props {
  onEdit: (recipie: Recipie) => void;
  filter: (query: string, filter: FilterTypes) => void;
}
const Header: React.FC<Props> = ({ onEdit, filter }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterTypes>("None");

  const handleSearchChange = debounce((query: string) => {
    filter(query, filters);
  }, 3000);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    handleSearchChange(query);
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const updatedFilter = e.target.value as FilterTypes;
    setFilters(updatedFilter);
    filter(searchQuery, updatedFilter);
  };
  return (
    <div className="my-[15px] flex justify-around">
      <div>
        <select
          className="h-[50px]"
          id="preparationTimeFilter"
          onChange={handleSelect}
        >
          <option value="none">None</option>
          <option value="lessThan30">Less than 30 minutes</option>
          <option value="between30And60">30-60 minutes</option>
          <option value="moreThan60">More than 60 minutes</option>
        </select>
      </div>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleSearch}
      />
      <button
        onClick={() =>
          onEdit({
            id: "",
            title: "",
            ingredients: [],
            instructions: [],
            preparationTime: 0,
            isFavourite: false,
          })
        }
        type="button"
        className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
      >
        ADD NEW RECIPIE
      </button>
    </div>
  );
};

export default Header;
