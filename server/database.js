// https://youtu.be/Hej48pi_lOc?si=7h5G6JuFMXghwW14
import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

// Create a connection pool to the MySQL database using environment variables
const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

/**
 * Retrieves all recipes from the database
 * @async
 * @returns {Promise<Array>} Array of recipe objects from the database
 * @throws {Error} If database query fails
 */
export const getRecipes = async () => {
  const [rows] = await pool.query("SELECT * FROM recipes");
  return rows;
};

/**
 * Retrieves a single recipe from the database by ID
 * @async
 * @param {number} id - The ID of the recipe to retrieve
 * @returns {Promise<Object|undefined>} Recipe object if found, undefined if not found
 * @throws {Error} If database query fails
 */
export const getRecipe = async (id) => {
  const [rows] = await pool.query(
    `SELECT *
        FROM recipes
        WHERE id = ?`,
    [id]
  );
  return rows[0];
};

/**
 * Creates a new recipe in the database
 * @param {string} title - The title of the recipe to create
 * @returns {Promise<Object>} The newly created recipe object
 * @throws {Error} If the database query fails
 * @async
 */
export const createRecipe = async (title) => {
  const [result] = await pool.query(
    `INSERT INTO 
     recipes 
     (title) 
     VALUES (?)`,
    [title]
  );

  const id = result.insertId;
  return await getRecipe(id);
};

/**
 *
 * @param {*} recipeId
 * @returns
 */
export const getIngredients = async (recipeId) => {
  const [rows] = await pool.query(
    `SELECT * 
        FROM ingredients 
        WHERE recipe_id = ?`,
    [recipeId]
  );
  return rows;
};

export const getIngredient = async (ingredientId) => {
  const [rows] = await pool.query(
    `SELECT * 
        FROM ingredients 
        WHERE id = ?`,
    [ingredientId]
  );
  return rows[0];
};

export const createIngredient = async (recipeId, name, quantity, unit) => {
  const [result] = await pool.query(
    `INSERT INTO 
     ingredients 
     (recipe_id, name, quantity, unit) 
     VALUES (?, ?, ?, ?)`,
    [recipeId, name, quantity, unit]
  );

  const id = result.insertId;
  return await getIngredient(id);
};

export const getInstructions = async (recipeId) => {
  const [rows] = await pool.query(
    `SELECT * 
        FROM instructions 
        WHERE recipe_id = ?`,
    [recipeId]
  );
  return rows;
};

export const getInstruction = async (instructionId) => {
  const [rows] = await pool.query(
    `SELECT * 
        FROM instructions 
        WHERE id = ?`,
    [instructionId]
  );
  return rows[0];
};

export const createInstruction = async (recipeId, step, description) => {
  const [result] = await pool.query(
    `INSERT INTO 
     instructions 
     (recipe_id, step, description) 
     VALUES (?, ?, ?)`,
    [recipeId, step, description]
  );

  const id = result.insertId;
  return await getInstruction(id);
};

// const recipe1 = await createRecipe('Cookies');
// await createIngredient(recipe1.id, 'flour', 1, 'cup');
// await createIngredient(recipe1.id, 'sugar', .5, 'cup');
// await createIngredient(recipe1.id, 'eggs', 2, '');

// const recipe2 = await createRecipe('Chili');
// await createIngredient(recipe2.id, 'beef', 1, 'lb');
// await createIngredient(recipe2.id, 'beans', 1, 'can');
// await createIngredient(recipe2.id, 'tomatoes', 1, 'can');
// await createIngredient(recipe2.id, 'onion', 1, 'cup');

// let ingredients = await getIngredients(recipe1.id);
// console.log(ingredients);
// ingredients = await getIngredients(recipe2.id);
// console.log(ingredients);
