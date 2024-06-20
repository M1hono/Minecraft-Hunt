const { $Recipe } = require("packages/net/minecraft/world/item/crafting/$Recipe");
const { extractName } = require("../API/ExtractName");
const { getMana } = require("../API/MNAmana");

PlayerEvents.chat(event => {
    if (event.getMessage() != 'recipe') return;
});
/**
 * 
 * @param {$ChatEvent$ChatComponent_} event 
 * @param {$Recipe} recipe 
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

