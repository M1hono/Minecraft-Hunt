// priority: 50
// import { $ItemFishedEvent } from "packages/net/minecraftforge/event/entity/player/$ItemFishedEvent"
// import { $Player } from "packages/net/minecraft/world/entity/player/$Player"
// import { handleDiceRoll as GlobalImports.handleDiceRoll, handleGetDice as GlobalImports.handleGetDice } from "../../../../../GlobalImports"
// import { fishingChest as FishingChest.fishingChest } from "../../../../../Dice/Ultil/Loot/FishingChest/FishingChest"

/**
 * 
 * @param {$ItemFishedEvent} event 
 */
global.fishingLoot = (event) => {
    if (!event.entity instanceof $Player) return
    /**@type {$Player} */
    const {
        entity : player,
        hookEntity : hook
    } = event
    const dx = (player.getX() - hook.getX()) * 0.1
    const dy = (player.getY() - hook.getY() + 1) * 0.1
    const dz = (player.getZ() - hook.getZ()) * 0.1

    GlobalImports.handleDiceRoll(event.entity, 'ultil', 20)
    let dice = GlobalImports.handleGetDice(player, 'ultil')

    // handle fishing chest events first.
    FishingChest.fishingChest(player , hook , dx , dy , dz , event)
    // then normal loot events.
}