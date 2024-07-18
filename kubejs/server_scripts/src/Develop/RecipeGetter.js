// packmode: Dev
const { $RecipeType } = require("packages/mezz/jei/api/recipe/$RecipeType");
const { extractName } = require("../API/Utils");

PlayerEvents.chat(event => {
    if (event.getMessage() != 'recipe') return;
    getRecipesList(event, "mna:ritual_type");
});
/**
 * 
 * @param {$EventJS_} event 
 * @param {$RecipeTypes_} recipe
 */
function getRecipesList (event,recipe) {
    const level = event.getLevel();
    let info = "";
    const recipes = level.getRecipeManager().getAllRecipesFor(recipe);
    recipes.forEach(recipe => {
        info += `${extractName(recipe.getId().toString())}\n`
    });
    console.info("\n" + info);
}

