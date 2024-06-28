// priority: 99
const { $ServerLevel } = require("packages/net/minecraft/server/level/$ServerLevel")
const { $FallingBlockEntity } = require("packages/net/minecraft/world/entity/item/$FallingBlockEntity")
const { $Player } = require("packages/net/minecraft/world/entity/player/$Player")
const { $LootDataType } = require("packages/net/minecraft/world/level/storage/loot/$LootDataType")
const { $LootParams$Builder } = require("packages/net/minecraft/world/level/storage/loot/$LootParams$Builder")
const { $LootContextParamSets } = require("packages/net/minecraft/world/level/storage/loot/parameters/$LootContextParamSets")
const { $LootTable } = require("packages/net/minecraft/world/level/storage/loot/$LootTable")
const { getSkillLevel } = require("../../API/Pmmo")
const { handleDiceRoll } = require("../../GlobalImports")
/**
 * @author M1hono
 * @description tracking falling block's alive status.
 * @param {$FallingBlockEntity} entity
 * @param {$ServerLevel} level
 */
function trackingFallingBlock(entity, level) {
    let pos = entity.block.pos
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
/**
 * @author M1hono
 * @description fire tracking function when targeted falling block spawned.
 */
EntityEvents.spawned(event => {
    const {entity , level } = event
    if (entity instanceof $FallingBlockEntity
        &&
        entity.persistentData.getBoolean('fishing_loot') == true) {
        if (level instanceof $ServerLevel) {
            trackingFallingBlock(entity, level)
        }
    }
})
/**
 * @author M1hono
 * @description fire loot drops event when the player right-clicked the fishing-chest.
 */
BlockEvents.rightClicked(event => {
    const {
        block : { pos , entity }
    } = event
    if (Block.id == "minecraft:barrel") {
        if (entity.persistentData.getBoolean('fallingblock') == true) {
            fishingChestLoot(event)
            event.level.removeBlock(pos , false)
            event.player.playNotifySound("block.wood.place" , "ambient" , 1 , 1)
        }
    }
})
/**
 * @author M1hono
 * @description handle loot drops event when the player right-clicked the fishing-chest.
 * @param {$BlockRightClickedEventJS_} event
 */
function fishingChestLoot(event) {
    if (!event.getEntity().isPlayer()) return

    const {
        level,
        server: { lootData },
        block,
        player
    } = event

    let lootParam = new $LootParams$Builder(level)
    .create($LootContextParamSets.EMPTY)
    let lootTable = getLootTable(player , lootData)

    let lootRarity = true
    let largeLoot = true
    if (lootTable.contains(
        item =>{
            item.rairity == 'EPIC'})) lootRarity = true
    if (lootTable.size()>=12) largeLoot = true
    let wis = getSkillLevel("wisdom" , player)
    let dex = getSkillLevel("dexterity" , player)
    let dice = handleDiceRoll(player , "ultil" , 20 + wis + ( dex/2 | 0 ) )

    while (!fishingchestOpenCheck(player , dice , wis , dex , lootRarity , largeLoot)) {
        lootTable = getLootTable(player , lootData)
        if (lootTable.contains(
            item =>{
                item.rairity == 'EPIC'})) lootRarity = true
        if (lootTable.size()>=12) largeLoot = true
    }

    lootTable.forEach(
        item => {
            block.popItem(item)
    })
}
/**
 * @author M1hono
 * @description get loot table from the chest.
 * @param {$Player} player 
 * @param {$LootDataManager_} lootData 
 * @returns 
 */
function getLootTable(player , lootData) {
    return lootData
    .getLootTable(chestloot(player))
    .getRandomItems(lootParam)

}
/**
 * @author M1hono
 * @description check if the player can open the fishing chest.
 * @param {$Player} player - player instance
 * @param {integer} dice - dice roll result
 * @param {integer} wis - wisdom skill level
 * @param {integer} dex - dexterity skill level
 * @param {boolean} lootRarity - if the loot table contains epic rarity item
 * @param {boolean} largeLoot - if the loot table contains more than 12 items
 * @returns {boolean} - if the player can open the chest
 */
function fishingchestOpenCheck(player, dice , wis , dex , lootRarity , largeLoot) {
    if (largeLoot) {
        if (dice < 10) return false
        if (lootRarity) {
            if (dice < 15) return false
        }
    }
}
/**
 * @author M1hono
 * @description return a random chest loot table.
 * @param {$Player} player
 * @returns {$LootTable}
 */
function chestloot(player) {
    const {
        server: { lootData }
    } = player

    let filteredList = lootData.getKeys($LootDataType.TABLE)
    .stream()
    .filter(id => id.path.contains('chest'))
    .map(id => id.toString()).toList()

    return filteredList[Math.floor(Math.random() * filteredList.length)]
}