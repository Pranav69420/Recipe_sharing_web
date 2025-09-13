const express = require("express");
const {
  getRecipes,
  getRecipe,
  addRecipe,
  editRecipe,
  deleteRecipe,
  searchRecipes,
} = require("../controller/recipeController");
const router = express.Router();
// Search and filter recipes
router.get("/search", searchRecipes);

// Get all recipes
router.get("/", getRecipes);

// Get a single recipe by ID
router.get("/:id", getRecipe);

// Add a new recipe
router.post("/", addRecipe);

// Edit a recipe
router.put("/:id", editRecipe);

// Delete a recipe
router.delete("/:id", deleteRecipe);

module.exports = router;
