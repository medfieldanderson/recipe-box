// filepath: /D:/dev/recipe-box/client/src/types/recipe.ts
export interface Recipe {
  id: number;
  title: string;
  author?: string;
  ingredients?: string[];
  instructions?: string;
}