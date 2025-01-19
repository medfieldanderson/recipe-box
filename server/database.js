// https://youtu.be/Hej48pi_lOc?si=7h5G6JuFMXghwW14
import mysql from "mysql2";

import dotenv from "dotenv";
dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

export async function getRecipes() {
  const [rows] = await pool.query("select * from recipes");
  return rows
}

export async function getRecipe(id) {
  const [rows] = await pool.query(
    `SELECT *
        FROM recipes
        WHERE id = ?`,
    [id]
  );
  return rows[0];
}

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
