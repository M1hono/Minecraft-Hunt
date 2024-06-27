// priority: 101
import { $ItemFishedEvent } from "packages/net/minecraftforge/event/entity/player/$ItemFishedEvent"
import { $Player } from "packages/net/minecraft/world/entity/player/$Player"

/**
 * 
 * @param {$ItemFishedEvent} event 
 */
global.fishingLoot = (event) => {
    /** @type {$Player} */
    const player = event.getEntity()
    const hook = event.getHookEntity()

    if (!player.isPlayer()) return

    const falling_block = player.level.createEntity('falling_block')
    falling_block.setPos(hook.getX(), hook.getY()+1, hook.getZ())
    const dx = (player.getX() - hook.getX()) * 0.1
    const dy = (player.getY() - hook.getY() + 1) * 0.1
    const dz = (player.getZ() - hook.getZ()) * 0.1
    falling_block.setMotion(dx, dy, dz)
    falling_block.mergeNbt({
        BlockState: {Name: "minecraft:barrel"},
    })
    falling_block.persistentData.putBoolean('fishing_loot', true)
    falling_block.spawn()
    event.setCanceled(true)
}