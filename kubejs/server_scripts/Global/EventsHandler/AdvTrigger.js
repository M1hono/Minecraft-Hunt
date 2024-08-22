// priority: 50
// const { $Player } = require("packages/net/minecraft/world/entity/player/$Player")
// const { $AdvancementEvent$AdvancementEarnEvent } = require("packages/net/minecraftforge/event/entity/player/$AdvancementEvent$AdvancementEarnEvent")
/**
 * @description handle Advancement earn event
 * @param {$AdvancementEvent$AdvancementEarnEvent} event
 */
global.advancementEarn = event => {
    const {
        advancement,
        entity, entity : { level , server }
    } = event
    
    if (advancement = "") {

    }
    if (!player instanceof $Player) return;
    /**@type {$Player}*/
    let player = entity
    // player.revokeAdvancement(advancement.id)
}