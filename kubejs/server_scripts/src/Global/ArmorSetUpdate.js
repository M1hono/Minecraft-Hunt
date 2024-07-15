const { $PlayerEvent$Clone } = require("packages/net/minecraftforge/event/entity/player/$PlayerEvent$Clone");
const { attributeupdater } = require("../Dice/AttributeManager");
/**
 * @param {$PlayerEvent$Clone} event
 */
global.playerClone = event => {
    const { entity  , original } = event
    attributeupdater(entity)
    entity.health = original.health
}