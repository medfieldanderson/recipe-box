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
export async function getRecipes() {
  const [rows] = await pool.query("select * from recipes");
  return rows;
}

/**
 * Retrieves a single recipe from the database by ID
 * @async
 * @param {number} id - The ID of the recipe to retrieve
 * @returns {Promise<Object|undefined>} Recipe object if found, undefined if not found
 * @throws {Error} If database query fails
 */
export async function getRecipe(id) {
  const [rows] = await pool.query(
    `SELECT *
        FROM recipes
        WHERE id = ?`,
    [id]
  );
  return rows[0];
}

//
/**
 * Creates a new recipe in the database
 * @param {string} title - The title of the recipe to create
 * @returns {Promise<Object>} The newly created recipe object
 * @throws {Error} If the database query fails
 * @async
 */
export async function createRecipe(title) {
  const [result] = await pool.query(
    `INSERT INTO 
     recipes 
     (title) 
     VALUES (?)`,
    [title]
  );

  const id = result.insertId;
  return await getRecipe(id);
}
