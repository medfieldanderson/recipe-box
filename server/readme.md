# MySql2

## Table Structure

```sql
CREATE TABLE Recipes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE Ingredients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    recipe_id INT,
    ingredient TEXT NOT NULL,
    FOREIGN KEY (recipe_id) REFERENCES Recipes(id)
);

CREATE TABLE Instructions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    recipe_id INT,
    instruction TEXT NOT NULL,
    FOREIGN KEY (recipe_id) REFERENCES Recipes(id)
);
```

## SQL `INSERT INTO` Statements

You'd first insert the recipe into the `Recipes` table and get the inserted recipe's id. Then, you'd insert the ingredients and instructions using that recipe id.

Sure thing! `mysql2` is a popular MySQL client for Node.js. Here’s an example of how you can use it to insert a recipe, ingredients, and instructions into your database with the same structure:

## Dependencies

First, you'll need to install `mysql2` and `dotenv` (for managing environment variables):

```sh
npm install mysql2 dotenv
```

## Environment Variables

Create a `.env` file to store your database connection details:

```plaintext
DB_HOST=your_host
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=your_database
```

## Database Insertion Script

Here's a script using `mysql2`:

```javascript
require('dotenv').config();
const mysql = require('mysql2/promise');

(async () => {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });

    try {
        // Insert recipe
        const [recipeResult] = await connection.execute(
            'INSERT INTO Recipes (name) VALUES (?)',
            ['Chocolate Chip Cookies']
        );
        const recipeId = recipeResult.insertId;

        // Insert ingredients
        const ingredients = [
            'Flour', 'Sugar', 'Butter', 'Chocolate Chips', 'Eggs',
            'Vanilla Extract', 'Baking Soda', 'Salt'
        ];
        for (const ingredient of ingredients) {
            await connection.execute(
                'INSERT INTO Ingredients (recipe_id, ingredient) VALUES (?, ?)',
                [recipeId, ingredient]
            );
        }

        // Insert instructions
        const instructions = [
            'Preheat oven to 350°F (175°C).',
            'In a large bowl, cream together the butter and sugar until smooth.',
            'Beat in eggs one at a time, then stir in vanilla.',
            'Combine the flour, baking soda, and salt; gradually stir into the butter mixture.',
            'Fold in the chocolate chips.',
            'Drop by rounded spoonfuls onto ungreased cookie sheets.',
            'Bake for 8 to 10 minutes, or until edges are lightly browned.'
        ];
        for (const instruction of instructions) {
            await connection.execute(
                'INSERT INTO Instructions (recipe_id, instruction) VALUES (?, ?)',
                [recipeId, instruction]
            );
        }

        console.log('Recipe, ingredients, and instructions inserted successfully.');
    } catch (err) {
        console.error(err);
    } finally {
        await connection.end();
    }
})();
```

## Explanation

1. **Environment Setup**: Use `.env` to store your database connection details securely.
2. **Connection**: Establish a connection to the database using `mysql2`.
3. **Insert Recipe**: Insert the recipe name and get the generated `recipeId`.
4. **Insert Ingredients**: Loop through the ingredients array and insert each ingredient with the corresponding `recipeId`.
5. **Insert Instructions**: Loop through the instructions array and insert each instruction with the corresponding `recipeId`.

This approach keeps your database queries organized and makes sure everything is linked properly using the foreign keys.

Absolutely! Wrapping your database operations in a transaction is a great way to ensure data integrity. If any part of the process fails, you can roll back the entire transaction to maintain consistency.

Here’s how you can modify the Node.js script to use transactions with `mysql2`:

```javascript
require('dotenv').config();
const mysql = require('mysql2/promise');

(async () => {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });

    try {
        // Start transaction
        await connection.beginTransaction();

        // Insert recipe
        const [recipeResult] = await connection.execute(
            'INSERT INTO Recipes (name) VALUES (?)',
            ['Chocolate Chip Cookies']
        );
        const recipeId = recipeResult.insertId;

        // Insert ingredients
        const ingredients = [
            'Flour', 'Sugar', 'Butter', 'Chocolate Chips', 'Eggs',
            'Vanilla Extract', 'Baking Soda', 'Salt'
        ];
        for (const ingredient of ingredients) {
            await connection.execute(
                'INSERT INTO Ingredients (recipe_id, ingredient) VALUES (?, ?)',
                [recipeId, ingredient]
            );
        }

        // Insert instructions
        const instructions = [
            'Preheat oven to 350°F (175°C).',
            'In a large bowl, cream together the butter and sugar until smooth.',
            'Beat in eggs one at a time, then stir in vanilla.',
            'Combine the flour, baking soda, and salt; gradually stir into the butter mixture.',
            'Fold in the chocolate chips.',
            'Drop by rounded spoonfuls onto ungreased cookie sheets.',
            'Bake for 8 to 10 minutes, or until edges are lightly browned.'
        ];
        for (const instruction of instructions) {
            await connection.execute(
                'INSERT INTO Instructions (recipe_id, instruction) VALUES (?, ?)',
                [recipeId, instruction]
            );
        }

        // Commit transaction
        await connection.commit();

        console.log('Recipe, ingredients, and instructions inserted successfully.');
    } catch (err) {
        // Rollback transaction in case of error
        await connection.rollback();
        console.error('Transaction failed. Changes rolled back.', err);
    } finally {
        await connection.end();
    }
})();
```

## Key Points

1. **Begin Transaction**: Use `beginTransaction()` to start a transaction.
2. **Commit Transaction**: Use `commit()` to commit all changes if everything is successful.
3. **Rollback Transaction**: Use `rollback()` to undo changes if any part of the transaction fails.

By doing this, you ensure that either all operations succeed or none of them are applied, maintaining your database's integrity.
