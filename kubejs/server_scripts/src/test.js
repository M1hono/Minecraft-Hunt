const { $BlockPos } = require("packages/net/minecraft/core/$BlockPos")
const { $ServerLevel } = require("packages/net/minecraft/server/level/$ServerLevel")
const { $FallingBlockEntity } = require("packages/net/minecraft/world/entity/item/$FallingBlockEntity")
const { $Item } = require("packages/net/minecraft/world/item/$Item")

function screenshake(event) {
    const { x, y, z, level } = event
    level.getEntitiesWithin(AABB.of(x - 20, y - 20, z - 20, x + 20, y + 20, z + 20)).forEach(entity => {
        if (entity.isPlayer()) {
            let distance = entity.getDistance(x, y, z)
            distance = 20 - distance
            distance = distance / 20 * 2
            entity.sendData('screenshake', { i1: distance * 0.6, i2: distance, i3: distance * 0.2, duration: 15 })
        }
    })
}
LevelEvents.afterExplosion(event => {
    screenshake(event)
})
/**
 * 
 * @param {$FallingBlockEntity} entity 
 * @param {$ServerLevel} level 
 * @returns 
 */
function checkAndRemove(entity, level) {
    const pos = entity.getBlock().pos
    const block = level.getBlockState(pos)
    level.getServer().tell('Checking entity...')
    if (entity.isAlive()) {
        level.getServer().schedule(10, () => checkAndRemove(entity, level))
    } else {
        pos = entity.getBlock().pos
        block = level.getBlockState(pos)
        if (block.getBlock().id == "lootr:lootr_barrel") {
            level.getServer().tell('Barrel found, scheduling removal...')
            level.getBlock(pos).getEntity().persistentData.putBoolean('removed', true)
        } else {
            level.getServer().tell('No barrel found or already removed')
        }
    }
}
EntityEvents.spawned(event => {
    const entity = event.entity
    const level = entity.getLevel()
    if (entity instanceof $FallingBlockEntity && entity.persistentData.getBoolean('fishing_loot')) {
        if (level instanceof $ServerLevel) {
            level.getServer().tell('Fishing loot entity spawned, starting check...')
            level.getServer().schedule(20, () => checkAndRemove(entity, level))
        }
    }
})
BlockEvents.rightClicked(event => {
    const block = event.block
    const level = block.getLevel()
    if (block.id == "lootr:lootr_barrel") {
        const pos = block.pos
        const entity = level.getBlock(pos).getEntity()
        if (entity.persistentData.getBoolean('removed')) {
            level.removeBlock(pos,true)
        } else {
        }
    }
})