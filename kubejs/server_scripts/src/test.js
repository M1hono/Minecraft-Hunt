const { $ResourceLocation } = require("packages/net/minecraft/resources/$ResourceLocation")
const { $ServerLevel } = require("packages/net/minecraft/server/level/$ServerLevel")
const { $FallingBlockEntity } = require("packages/net/minecraft/world/entity/item/$FallingBlockEntity")
const { $LootParams$Builder } = require("packages/net/minecraft/world/level/storage/loot/$LootParams$Builder")
const { $LootContextParamSets } = require("packages/net/minecraft/world/level/storage/loot/parameters/$LootContextParamSets")
const { $LootrBarrelBlockEntity } = require("packages/noobanidus/mods/lootr/block/entities/$LootrBarrelBlockEntity")
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
 * tracking falling block's alive status.
 * @param {$FallingBlockEntity} entity
 * @param {$ServerLevel} level
 */
function trackingFallingBlock(entity, level) {
    let pos = entity.getBlock().pos
    let block = level.getBlockState(pos)
    if (entity.isAlive()) {
        level.getServer().schedule(20, () => trackingFallingBlock(entity, level))
    } else {
        pos = entity.getBlock().pos
        block = level.getBlockState(pos)
        if (block.getBlock().id == "minecraft:barrel") {
            level.getBlock(pos).getEntity().persistentData.putBoolean('fallingblock', true)
        }
    }
}
EntityEvents.spawned(event => {
    const {entity , level } = event
    if (entity instanceof $FallingBlockEntity && entity.persistentData.getBoolean('fishing_loot') == true) {
        if (level instanceof $ServerLevel) {
            trackingFallingBlock(entity, level)
        }
    }
})
const $LootDataType = Java.loadClass('net.minecraft.world.level.storage.loot.LootDataType')
BlockEvents.rightClicked(event => {
    const {block , server} = event
    let pos = block.pos
    let entity = block.getEntity()
    if (block.id == "minecraft:barrel") {
        if (entity.persistentData.getBoolean('fallingblock') == true) {
            let lootData = Utils.getServer().getLootData()
            let allTables = lootData.getKeys($LootDataType.TABLE)
            let filteredList = allTables.stream().filter(id => id.path.contains('chest')).map(id => id.toString()).toList()
            fishingChestLoot(event , filteredList[Math.floor(Math.random() * filteredList.length)])
            event.level.removeBlock(pos , false)
            event.player.playNotifySound("block.wood.place" , "ambient" , 1 , 1)
        }
    }
})
/**
 * 
 * @param {import("packages/dev/latvian/mods/kubejs/block/$BlockRightClickedEventJS").$BlockRightClickedEventJS$Type} event 
 * @param {$LootTable_} loot 
 */
function fishingChestLoot(event,loot) {
    let lootParam = new $LootParams$Builder(event.getLevel()).create($LootContextParamSets.EMPTY)
    let lootTable = event.getServer().lootData.getLootTable(loot).getRandomItems(lootParam)
    lootTable.forEach(item => {
        event.block.popItem(item)
    })
}