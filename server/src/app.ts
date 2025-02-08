// https://youtu.be/Hej48pi_lOc?si=7h5G6JuFMXghwW14
import express, {Request, Response, NextFunction} from "express";
import cors from "cors";
import {
  createRecipe,
  getRecipes,
  getRecipe,
  createIngredient,
  getIngredients,
  getIngredient,
  createInstruction,
  getInstructions,
  getInstruction,
} from "./database.js";
import { parse } from "dotenv";

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cors());

app.post("/recipe", async (req, res) => {
  const { title } = req.body;
  const recipe = await createRecipe(title);
  res.send(recipe);
});

app.get("/recipes", async (req, res) => {
  const recipes = await getRecipes();
  res.send(recipes);
});

app.get("/recipe/:id", async (req, res) => {
  const recipeId = parseInt(req.params.id);
  const recipe = await getRecipe(recipeId);
  res.send(recipe);
});

app.get("/recipe/:recipeId/ingredients", async (req, res) => {
  const recipeId = parseInt(req.params.recipeId);
  console.log("recipeId", recipeId);  
  const ingredients = await getIngredients(recipeId);
  res.send(ingredients);
});

app.get("/ingredient/:ingredientId", async (req, res) => {
  const ingredientId = parseInt(req.params.ingredientId);
  const ingredient = await getIngredient(ingredientId);
  res.send(ingredient);
});

app.post("/recipe/:recipeId/ingredient", async (req, res) => {
  const recipeId = parseInt(req.params.recipeId);
  const { name, quantity, unit } = req.body;
  const ingredient = await createIngredient(recipeId, name, quantity, unit);
  res.send(ingredient);
});

app.get("/recipe/:recipeId/instructions", async (req, res) => {
  const recipeId = parseInt(req.params.recipeId);
  const instructions = await getInstructions(recipeId);
  res.send(instructions);
});

app.get("/instruction/:instructionId", async (req, res) => {
  const instructionId = parseInt(req.params.instructionId);
  const instruction = await getInstruction(instructionId);
  res.send(instruction);
});

app.post("/recipe/:recipeId/instruction", async (req, res) => {
  const recipeId = parseInt(req.params.recipeId);
  console.log("recipeId", recipeId);
  const {step, description } = req.body;
  console.log("step", step);
  console.log("description", description);
  const instruction = await createInstruction(recipeId, step, description);
  res.send(instruction);
});
  

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Something broke.");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
