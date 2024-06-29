// priority: 99
const { $ServerLevel } = require("packages/net/minecraft/server/level/$ServerLevel")
const { $FallingBlockEntity } = require("packages/net/minecraft/world/entity/item/$FallingBlockEntity")
const { $LootParams$Builder } = require("packages/net/minecraft/world/level/storage/loot/$LootParams$Builder")
const { $LootContextParamSets } = require("packages/net/minecraft/world/level/storage/loot/parameters/$LootContextParamSets")
const { getSkillLevel } = require("../../../API/Pmmo")
const { handleDiceRoll } = require("../../../GlobalImports")
const { lootbigSuccess, lootbigFailure, lootNormalEvents } = require("../../RewardEvents")
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
        entity.persistentData.getBoolean('fishing_loot') == true &&
        entity.nbt.get('BlockState').getString('Name') == 'minecraft:barrel'){
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
            player.playNotifySound("block.rooted_dirt.place", "ambient", 1, 1)
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
        player,
        block,
        server: { lootData }
    } = event

    let lootParam = new $LootParams$Builder(level).create($LootContextParamSets.EMPTY)
    let skill = getSkillLevel("wisdom", player) + (getSkillLevel("dexterity", player) / 2 | 0)
    let lootTable
    let diceRoll = handleDiceRoll(player, "ultil", 20)
    let score = diceRoll + skill

    if (diceRoll == 20) {
        lootTable = lootData.getLootTable('minecraft:gameplay/fishing_chest/epic').getRandomItems(lootParam)
        popItem( lootTable , block )
        lootbigSuccess( level, player, block )
        return
    } else if (diceRoll == 1) {
        lootTable = lootData.getLootTable('minecraft:gameplay/fishing_chest/pool').getRandomItems(lootParam)
        console.info(lootTable)
        popItem( lootTable , block )
        lootbigFailure( level, player, block )
        return
    }

    switch (score) {
        case score >= 15:
            lootTable = lootData.getLootTable('minecraft:gameplay/fishing_chest/rare').getRandomItems(lootParam)
            popItem( lootTable , block )
            lootNormalEvents( level, player, block )
            break;
        case score >= 10:
            lootTable = lootData.getLootTable('minecraft:gameplay/fishing_chest/uncommon').getRandomItems(lootParam)
            popItem( lootTable , block )
            lootNormalEvents( level, player, block )
            break;
        case score >= 5:
            lootTable = lootData.getLootTable('minecraft:gameplay/fishing_chest/common').getRandomItems(lootParam)
            popItem( lootTable , block )
            break;
        default:
            break;
    }
}
function popItem(lootTable, block) {
    lootTable.forEach(
        item => {
            block.popItem(item)
        }
    )
}