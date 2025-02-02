<template>
  <div>
    <h1>Recipe Box</h1>
    <p>Save your favorite recipes here.</p>
    <p>Share your favorite recipes.</p>

    <div class="top-recipes">
      <h2>Top Recipes</h2>
      <ul>
        <li v-for="recipe in topRecipes" :key="recipe.id">
          {{ recipe.title }} <span v-if="recipe.author">by</span>
          {{ recipe.author }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import axios from "axios";
import { type Recipe } from "../types/recipe";

const topRecipes = ref<Recipe[]>([]);

onMounted(async () => {
  console.log("Home mounted");
  try {
    const response = await axios.get("http://localhost:3000/recipes");
    topRecipes.value = response.data;
  } catch (error) {
    console.error("Error fetching recipes:", error);
  }
  console.log(topRecipes.value);
});
</script>

<style scoped></style>
