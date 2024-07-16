// priority: 50
const { $PlayerEvent$Clone } = require("packages/net/minecraftforge/event/entity/player/$PlayerEvent$Clone")
/**
 * @param {$PlayerEvent$Clone} event
 */
global.playerClone = event => {
    const { entity : player  , original } = event
    player.persistentData.put("attributes" , original.persistentData.getCompound("attributes"))
    PlayerAttributeManage.update(player)
}