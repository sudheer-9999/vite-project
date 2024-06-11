export interface Recipie {
  id: string;
  title: string;
  ingredients: string[];
  instructions: string[];
  preparationTime: number;
  isFavourite: boolean;
}

export type FilterTypes = "None" | "lessThan30" | "between30And60" | "moreThan60"
