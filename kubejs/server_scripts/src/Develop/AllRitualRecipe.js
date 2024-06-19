const { extractRitualName } = require("../API/ExtractRitualName");

PlayerEvents.chat(event => {
    const player = event.getPlayer();
    const level = player.getLevel();

    let allRitualInfo = "";
    if (event.getMessage() !== 'ritual') return;
    const ritualRecipes = level.getRecipeManager().getAllRecipesFor('mna:ritual-type');
    ritualRecipes.forEach(recipe => {
        allRitualInfo += `${extractRitualName(recipe.getId().toString())}\n`;
    });

    console.info("\n" + allRitualInfo);
});