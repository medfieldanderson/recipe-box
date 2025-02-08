export interface Recipe {
  id: number;
  title: string;
  created_at?: Date;
}

export interface Ingredient {
  id: number;
  recipeId: number;
  name: string;
  quantity: number;
  unit: string;
}

export interface Instruction {
  id: number;
  recipeId: number;
  step: number;
  description: string;
}