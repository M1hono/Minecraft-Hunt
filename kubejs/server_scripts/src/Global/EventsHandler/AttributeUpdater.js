// priority: 50
const { $PlayerEvent$Clone } = require("packages/net/minecraftforge/event/entity/player/$PlayerEvent$Clone")
const { PlayerAttributeManager } = require("../../Dice/AttributeManager")
/**
 * @param {$PlayerEvent$Clone} event
 */
global.playerClone = event => {
    const { entity : player  , original } = event
    player.persistentData.put("attributes" , original.persistentData.getCompound("attributes"))
    PlayerAttributeManager.update(player)
}