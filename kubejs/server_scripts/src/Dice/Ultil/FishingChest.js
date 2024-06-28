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
const { $ItemStack } = require("packages/net/minecraft/world/item/$ItemStack")
/**
 * @author M1hono
 * @description Tracking falling block's alive status.
 * @param {$FallingBlockEntity} entity
 * @param {$ServerLevel} level
 */
function trackingFallingBlock(entity, level) {
    const {
        block: { pos },
    } = entity
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
 * @description Fire tracking function when targeted falling block spawned.
 */
EntityEvents.spawned(event => {
    const {
        entity,
        level
    } = event
    if (entity instanceof $FallingBlockEntity &&
        entity.persistentData.getBoolean('fishing_loot') == true) {
        if (level instanceof $ServerLevel) {
            trackingFallingBlock(entity, level)
        }
    }
})
/**
 * @author M1hono
 * @description Fire loot drops event when the player right-clicked the fishing-chest.
 */
BlockEvents.rightClicked(event => {
    const {
        block,
        block: { pos, entity },
        level,
        player
    } = event
    if (block.id == "minecraft:barrel") {
        if (entity.persistentData.getBoolean('fallingblock') == true) {
            fishingChestLoot(event)
            level.removeBlock(pos, false)
            player.playNotifySound("block.wood.place", "ambient", 1, 1)
        }
    }
})
/**
 * @author M1hono
 * @description Handle loot drops event when the player right-clicked the fishing-chest.
 * @param {$BlockRightClickedEventJS_} event
 */
function fishingChestLoot(event) {
    const {
        level,
        server: { lootData },
        block,
        player
    } = event

    let lootParam = new $LootParams$Builder(level).create($LootContextParamSets.EMPTY)
    let checkObject = { lootRare: false, largeLoot: false }
    let lootTable = getLootTable(player, lootData, lootParam)

    rerollLoot(lootTable, checkObject)

    let skill = getSkillLevel("wisdom", player) + (getSkillLevel("dexterity", player) / 2 | 0)
    let diceRoll = handleDiceRoll(player, "ultil", 20)

    while (!fishingchestOpenCheck(diceRoll, skill, checkObject.lootRare, checkObject.largeLoot)) {
        console.info('test')
        lootTable = getLootTable(player, lootData, lootParam)
        rerollLoot(lootTable, checkObject)
    }

    lootTable.forEach(
        /**@param {$ItemStack} item */
        item => {
            console.log(item.rarity.toString())
            block.popItem(item)
        }
    )
}
/**
 * @author M1hono
 * @description Check if the loot table contains more than 10 items.
 * @param {$LootTable} lootTable
 * @returns {boolean}
 */
function sizeCheck(lootTable) {
    return lootTable.size() >= 10
}
/**
 * @description Check if the loot table contains uncommon item.
 * @param {$LootTable} lootTable
 * @returns {boolean}
 */
function rarityCheck(lootTable) {
    for (let index = 0; index < lootTable.size(); index++) {
        const item = lootTable[index]
        console.info(item.rarity.toString())
        if (item.rarity.toString() == 'UNCOMMON') {
            return true
        }
    }
    return false
}
/**
 * @author M1hono
 * @description Re-roll the loot table to check for rare and large loot.
 * @param {$LootTable} lootTable
 * @param {object} checkObject
 */
function rerollLoot(lootTable, checkObject) {
    checkObject.lootRare = rarityCheck(lootTable)
    checkObject.largeLoot = sizeCheck(lootTable)
    console.info('lootRare:' + checkObject.lootRare)
    console.info('largeLoot:' + checkObject.largeLoot)
}
/**
 * @author M1hono
 * @description Get loot table from the chest.
 * @param {$Player} player
 * @param {$LootDataManager_} lootData
 * @returns {$LootTable}
 */
function getLootTable(player, lootData, lootParam) {
    return lootData
        .getLootTable(chestloot(player))
        .getRandomItems(lootParam)
}
/**
 * @author M1hono
 * @description Check if the player can open the fishing chest.
 * @param {integer} diceRoll - Dice roll result
 * @param {integer} skill - Player's wisdom and dexterity level
 * @param {boolean} lootRare - If the loot table contains rare item
 * @param {boolean} largeLoot - If the loot table contains more than 12 items
 * @returns {boolean} - If the player can open the chest
 */
function fishingchestOpenCheck(diceRoll, skill, lootRare, largeLoot) {
    if (diceRoll >= 20) {
        return lootRare && largeLoot;
    }

    const totalScore = diceRoll + skill;
    if (lootRare && largeLoot) {
        return totalScore >= 18;
    } else if (lootRare) {
        return totalScore >= 15;
    } else if (largeLoot) {
        return totalScore >= 7;
    } else {
        return false;
    }
}
/**
 * @author M1hono
 * @description Return a random chest loot table.
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