// priority: 50
const { $PlayerEvent$Clone } = require("packages/net/minecraftforge/event/entity/player/$PlayerEvent$Clone");
const { PlayerAttributeManager } = require("../Dice/AttributeManager");
/**
 * @param {$PlayerEvent$Clone} event
 */
global.playerClone = event => {
    const { entity  , original } = event
    PlayerAttributeManager.update(entity)
    entity.health = original.health
}