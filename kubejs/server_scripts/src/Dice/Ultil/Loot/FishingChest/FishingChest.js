// priority: 99
import { $Player } from "packages/net/minecraft/world/entity/player/$Player"
import { $FishingHook } from "packages/net/minecraft/world/entity/projectile/$FishingHook"
import { getSkillLevel } from "../../../../API/Pmmo"
import { lootbigFailure, lootbigSuccess } from "../RewardEvents"
const { $ServerLevel } = require("packages/net/minecraft/server/level/$ServerLevel")
const { $FallingBlockEntity } = require("packages/net/minecraft/world/entity/item/$FallingBlockEntity")
const { $LootParams$Builder } = require("packages/net/minecraft/world/level/storage/loot/$LootParams$Builder")
const { $LootContextParamSets } = require("packages/net/minecraft/world/level/storage/loot/parameters/$LootContextParamSets")
/**
 * @author M1hono
 * @description Spawn a fishing chest when the player catch a item by fishing.
 * @param {$Player} player
 * @param {$FishingHook} hook
 * @param {double} dx
 * @param {double} dy
 * @param {double} dz
 */
export function fishingChest(player, hook, dx, dy, dz , event) {
    const {
        level
    } = player
    const {
        x,
        y,
        z
    } = hook
    if (Math.floor(Math.random() * 100) + 1 >= 50) {
        const falling_block = level.createEntity('falling_block')
        falling_block.setPos(x, y + 1, z)
        falling_block.setMotion(dx, dy, dz)
        falling_block.mergeNbt({
            BlockState: { Name: "minecraft:barrel" }
        })
        falling_block.persistentData.putBoolean('fishing_loot', true)
        let uuid = falling_block.getUuid()
        falling_block.spawn()
        let entity = level.getEntity(uuid)
        trackingFallingBlock(entity)
        event.setCanceled(true)
    }
}
/**
 * @author M1hono
 * @description Tracking falling block's alive status.
 * @param {$FallingBlockEntity} entity
 * @param {$ServerLevel} level
 */
function trackingFallingBlock(entity) {
    const {
        block: { pos },
        server,
        level
    } = entity
    let blockState = level.getBlockStates(pos)
    if (entity.isAlive()) {
        server.scheduleInTicks(10, () => trackingFallingBlock(entity))
    } else {
        pos = entity.getBlock().pos
        blockState = level.getBlockState(pos)
        if (blockState.getBlock().id == "minecraft:barrel") {
            level.getBlock(pos).getEntity().persistentData.putBoolean('fallingblock', true)
        }
    }
}
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
    // let diceRoll = 1
    // let diceRoll = 20
    let score = diceRoll + skill

    if (diceRoll == 20) {
        lootTable = lootData.getLootTable('minecraft:gameplay/fishing_chest/epic').getRandomItems(lootParam)
        popItem(lootTable, block)
        lootbigSuccess(level, player, block)
        return
    } else if (diceRoll == 1) {
        lootTable = lootData.getLootTable('minecraft:gameplay/fishing_chest/pool').getRandomItems(lootParam)
        console.info(lootTable)
        popItem(lootTable, block)
        lootbigFailure(level, player, block)
        return
    }

    switch (score) {
        case score >= 15:
            lootTable = lootData.getLootTable('minecraft:gameplay/fishing_chest/rare').getRandomItems(lootParam)
            popItem(lootTable, block)
            lootNormalEvents(level, player, block)
            break;
        case score >= 10:
            lootTable = lootData.getLootTable('minecraft:gameplay/fishing_chest/uncommon').getRandomItems(lootParam)
            popItem(lootTable, block)
            lootNormalEvents(level, player, block)
            break;
        case score >= 5:
            lootTable = lootData.getLootTable('minecraft:gameplay/fishing_chest/common').getRandomItems(lootParam)
            popItem(lootTable, block)
            break;
        default:
            break;
    }
}
/**
 * @author M1hono
 * @description Pop item from loot table.
 * @param {Array} lootTable
 * @param {$Block} block
 */
function popItem(lootTable, block) {
    lootTable.forEach(
        item => {
            block.popItem(item)
        }
    )
}