// https://youtu.be/Hej48pi_lOc?si=7h5G6JuFMXghwW14
import express from "express";
import { createRecipe, getRecipe, getRecipes } from "./database.js";

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.get("/recipes", async (req, res) => {
  const recipes = await getRecipes();
  res.send(recipes);
});

app.get("/recipe/:id", async (req, res) => {
  const recipeId = req.params.id;
  const recipe = await getRecipe(recipeId);
  res.send(recipe);
});

app.post("/recipes", async (req, res) => {
  const { title } = req.body;
  const recipe = await createRecipe(title);
  res.send(recipe);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke.");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
