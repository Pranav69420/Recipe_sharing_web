const Recipes = require("../models/recipeSchema");

const getRecipes = async (req, res) => {
  const recipe = await Recipes.find();
  return res.json(recipe);
};

const getRecipe = async (req, res) => {
  const recipe = await Recipes.findById(req.params.id);
  return res.json(recipe);
};

const addRecipe = async (req, res) => {
  const { title, ingredients, instructions, time, CoverImage } = req.body;

  if (!title || !ingredients || !instructions || !time) {
    return res.status(400).json({ message: "Required fields cannot be empty" });
  }

  try {
    const newRecipe = await Recipes.create({
      title,
      ingredients,
      instructions,
      time,
      CoverImage,
    });
    return res.status(201).json(newRecipe);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error creating recipe", error: error.message });
  }
};

const editRecipe = async (req, res) => {
  const { title, ingredients, instructions, time } = req.body;
  let recipe = await Recipes.findById(req.params.id);
  try {
    if (recipe) {
      await Recipes.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json({ title, ingredients, instructions, time });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error updating recipe", error: error.message });
  }
};
const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipes.findByIdAndDelete(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    return res.json({ message: "Recipe deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error deleting recipe", error: error.message });
  }
};

module.exports = { getRecipes, getRecipe, addRecipe, editRecipe, deleteRecipe };
