// priority: 155
import { $Server } from "packages/info/journeymap/shaded/org/eclipse/jetty/server/$Server";
import { $Dimension } from "packages/java/awt/$Dimension";
import { $Structure } from "packages/net/minecraft/world/level/levelgen/structure/$Structure";
import { $StructurePlaceSettings } from "packages/net/minecraft/world/level/levelgen/structure/templatesystem/$StructurePlaceSettings";
import { $LootDataType } from "packages/net/minecraft/world/level/storage/loot/$LootDataType";
import { $DamageSource } from "packages/net/minecraft/world/damagesource/$DamageSource";
import { $Registries } from "packages/net/minecraft/core/registries/$Registries";
import { $ResourceKey } from "packages/net/minecraft/resources/$ResourceKey";
import { $Entity } from "packages/net/minecraft/world/entity/$Entity";
import { $LevelUtils } from "packages/com/almostreliable/morejs/util/$LevelUtils";
import { $ResourceOrTag } from "packages/com/almostreliable/morejs/util/$ResourceOrTag";
import { $BlockPos } from "packages/net/minecraft/core/$BlockPos";
import { $AsyncLocator } from "packages/brightspark/asynclocator/$AsyncLocator";
import { $Player } from "packages/net/minecraft/world/entity/player/$Player";
import { $TagKey } from "packages/net/minecraft/tags/$TagKey";
const UUID = Java.loadClass('java.util.UUID');
const $UUIDUtil = Java.loadClass('net.minecraft.core.UUIDUtil');
/**
 * @author https://github.com/squoshi
 * @description Return a random UUID.
 * @returns {UUID}
 */
export let randomUUID = () => UUID.randomUUID();
/**
 * @description Convert a UUID to the IntegerArray that nbt can use.
 * @param {UUID} uuid
 * @returns {Array.<integer>}
 */
export let toNBTUUID = (uuid) => $UUIDUtil.uuidToIntArray(uuid);
/**
 * @author https://github.com/squoshi
 * @description Check the entity by UUID.
 * @param {UUID}
 * @returns {$Entity_}
 */
export let entityByUUID = (uuid) => {
    Utils.server.getEntities().forEach(entity => {
        if (entity.uuid.equals(uuid)) return entity;
        return null;
    });
}
/**
 * @author M1hono
 * @description Return a random chest loot table.
 * @param {$Entity} entity
 * @param {string} filter
 * @returns {$LootTable}
 */
export function chestloot(entity, filter) {
    const {
        server: { lootData }
    } = entity
    let filteredList = lootData.getKeys($LootDataType.TABLE)
        .stream()
        .filter(id => id.path.contains(filter))
        .map(id => id.toString()).toList()
    return filteredList[Math.floor(Math.random() * filteredList.length)]
}
/**
 * @author https://discord.com/channels/303440391124942858/1048591172165189632/threads/1100369951308664933
 * @description Spawn a structure in the world.
 * @param {$Server} server 
 * @param {$Dimension} dimension 
 * @param {$Structure} structure 
 * @param {integer} x 
 * @param {integer} y 
 * @param {integer} z 
 */
export function spawnStructure(server, dimension, structure, x, y, z) {
    let level = server.getLevel(dimension)
    let pos = BlockPos(x, y, z)
    server.structureManager.get(structure).ifPresent(e => e.placeInWorld(level, pos, pos, new $StructurePlaceSettings(), level.random, 3))
}
/**
 * @notification Require Lodestone
 * @author https://discord.com/channels/303440391124942858/1140369302571200562
 * @description Shake the screen.
 */
export function screenshake(event) {
    const {
        x,
        y,
        z,
        level
    } = event
    level.getEntitiesWithin(AABB.of(x - 20, y - 20, z - 20, x + 20, y + 20, z + 20)).forEach(entity => {
        if (entity.isPlayer()) {
            let distance = entity.getDistance(x, y, z)
            distance = 20 - distance
            distance = distance / 20 * 2
            entity.sendData('screenshake', { i1: distance * 0.6, i2: distance, i3: distance * 0.2, duration: 15 })
        }
    })
}
const { DAMAGE_TYPE } = $Registries;
/**
 * @typedef {"l2weaponry:trident-bypass_magic-no_projectile"
* |"tetra:bleeding"
* |"epicfight:shockwave"
* |"mna:spell_briars"
* |"l2hostility:mob_attack-bypass_cooldown"
* |"alexscaves:dark_arrow"
* |"alexsmobs:freddy"
* |"l2hostility:player_attack-bypass_cooldown-bypass_magic"
* |"l2weaponry:trident-bypass_armor-bypass_magic-no_projectile"
* |"attributeslib:fire_damage"
* |"minecraft:indirect_magic"
* |"minecraft:dragon_breath"
* |"attributeslib:cold_damage"
* |"l2hostility:player_attack-bypass_cooldown-no_anger"
* |"alexsmobs:farseer"
* |"l2weaponry:trident-bypass_armor-bypass_magic-no_anger"
* |"minecraft:sting"
* |"l2weaponry:trident-bypass_armor-no_anger-no_projectile"
* |"mna:spell_frost"
* |"minecraft:drown"
* |"l2complements:soul_flame"
* |"l2weaponry:mob_attack-bypass_armor-no_anger"
* |"iceandfire:dragon_fire"
* |"mna:wtf_boom"
* |"l2weaponry:trident-bypass_armor-no_anger"
* |"minecraft:mob_attack_no_aggro"
* |"iceandfire:dragon_lightning"
* |"l2complements:emerald"
* |"mna:spell_conflagrate"
* |"create:cuckoo_surprise"
* |"minecraft:starve"
* |"l2hostility:player_attack-bypass_armor-bypass_cooldown-no_anger"
* |"minecraft:thrown"
* |"minecraft:fireball"
* |"l2hostility:player_attack-bypass_cooldown"
* |"l2complements:void_eye"
* |"l2weaponry:mob_attack-bypass_magic-no_anger"
* |"l2weaponry:trident-no_anger-no_projectile"
* |"create:mechanical_roller"
* |"minecraft:player_attack"
* |"minecraft:mob_attack"
* |"minecraft:sweet_berry_bush"
* |"supplementaries:player_bomb_explosion"
* |"minecraft:explosion"
* |"l2hostility:mob_attack-bypass_cooldown-bypass_magic-no_anger"
* |"minecraft:falling_block"
* |"minecraft:on_fire"
* |"create:mechanical_drill"
* |"l2weaponry:mob_attack-no_anger"
* |"l2damagetracker:mob_attack-bypass_armor"
* |"l2hostility:mob_attack-bypass_cooldown-bypass_magic"
* |"minecraft:outside_border"
* |"create:mechanical_saw"
* |"minecraft:wither"
* |"l2weaponry:trident-bypass_armor"
* |"mna:spell_disperse"
* |"minecraft:magic"
* |"attributeslib:current_hp_damage"
* |"alexscaves:radiation"
* |"l2complements:bleed"
* |"minecraft:falling_anvil"
* |"alexscaves:desolate_dagger"
* |"minecraft:cramming"
* |"l2weaponry:trident-bypass_armor-bypass_magic-no_anger-no_projectile"
* |"l2damagetracker:player_attack-bypass_armor"
* |"alexscaves:nuke"
* |"attributeslib:bleeding"
* |"l2hostility:mob_attack-bypass_cooldown-no_anger"
* |"alexscaves:spirit_dinosaur"
* |"l2hostility:killer_aura"
* |"alexscaves:acid"
* |"minecraft:fly_into_wall"
* |"supplementaries:xp_extracting"
* |"minecraft:stalagmite"
* |"minecraft:mob_projectile"
* |"l2damagetracker:mob_attack-bypass_magic"
* |"l2complements:life_sync"
* |"l2weaponry:player_attack-bypass_magic-no_anger"
* |"create:crush"
* |"minecraft:arrow"
* |"minecraft:freeze"
* |"supplementaries:bomb_explosion"
* |"l2weaponry:player_attack-bypass_armor-no_anger"
* |"l2hostility:player_attack-bypass_armor-bypass_cooldown-bypass_magic-no_anger"
* |"minecraft:trident"
* |"dummmmmmy:critical"
* |"origins:no_water_for_gills"
* |"minecraft:cactus"
* |"l2hostility:player_attack-bypass_armor-bypass_cooldown"
* |"l2weaponry:trident-bypass_magic-no_anger-no_projectile"
* |"l2weaponry:trident-no_projectile"
* |"minecraft:player_explosion"
* |"l2weaponry:trident-bypass_armor-no_projectile"
* |"iceandfire:dragon_ice"
* |"l2hostility:mob_attack-bypass_armor-bypass_cooldown-bypass_magic"
* |"farmersdelight:stove_burn"
* |"create:run_over"
* |"l2damagetracker:player_attack-bypass_armor-bypass_magic"
* |"l2hostility:mob_attack-bypass_armor-bypass_cooldown-bypass_magic-no_anger"
* |"minecraft:in_wall"
* |"minecraft:fall"
* |"l2weaponry:player_attack-bypass_armor-bypass_magic-no_anger"
* |"minecraft:in_fire"
* |"minecraft:fireworks"
* |"alexscaves:tremorzilla_beam"
* |"l2hostility:player_attack-bypass_armor-bypass_cooldown-bypass_magic"
* |"mna:spell_lightning"
* |"iceandfire:gorgon"
* |"origins:hurt_by_water"
* |"attributeslib:detonation"
* |"minecraft:sonic_boom"
* |"create:fan_fire"
* |"l2weaponry:player_attack-no_anger"
* |"l2weaponry:trident-bypass_armor-bypass_magic"
* |"minecraft:generic"
* |"l2damagetracker:player_attack-bypass_magic"
* |"dummmmmmy:true"
* |"alexscaves:raygun"
* |"minecraft:hot_floor"
* |"l2damagetracker:mob_attack-bypass_armor-bypass_magic"
* |"l2hostility:mob_attack-bypass_armor-bypass_cooldown"
* |"minecraft:generic_kill"
* |"minecraft:thorns"
* |"l2hostility:player_attack-bypass_cooldown-bypass_magic-no_anger"
* |"supplementaries:bamboo_spikes"
* |"l2weaponry:trident-bypass_magic-no_anger"
* |"minecraft:falling_stalactite"
* |"minecraft:unattributed_fireball"
* |"l2hostility:mob_attack-bypass_armor-bypass_cooldown-no_anger"
* |"amendments:boiling"
* |"minecraft:wither_skull"
* |"minecraft:out_of_world"
* |"minecraft:lava"
* |"create:fan_lava"
* |"mna:shuriken"
* |"create:potato_cannon"
* |"minecraft:bad_respawn_point"
* |"epicfight:wither_beam"
* |"l2weaponry:trident-bypass_magic"
* |"minecraft:lightning_bolt"
* |"l2weaponry:mob_attack-bypass_armor-bypass_magic-no_anger"
* |"alexscaves:forsaken_sonic_boom"
* |"l2weaponry:trident-no_anger"
* |"minecraft:dry_out"} DamageType
*/
/**
 * @author M1hono
 * @description Get the damage source with the entity as the source.
 * @param {DamageType} damageType
 * @param {$Entity_} entity
 * @returns {$DamageSource}
 * @example
 * you must use target's attack method to deal damage to the target and use attacker as the argument.
 * player.attack(getOrSource("minecraft:fire", entity),10) // let the entity deal 10 fire damage to the player.
 */
export function getOrSource(damageType , entity ) {
    const { level } = entity
    const type = Utils.id(damageType)
    const damageTypeKey = $ResourceKey.create(DAMAGE_TYPE, type)
    const damageTypeHolder = 
    level
    .registryAccess()
    .registryOrThrow(DAMAGE_TYPE)
    .getHolderOrThrow(damageTypeKey)
    return new $DamageSource(damageTypeHolder , entity, entity)
}
const { STRUCTURE } = $Registries;
/**
 * @Require AsnycLocator
 * @author M1hono
 * @description Asynchronously searches for a specified structure around the player.
 * 
 * This function uses $AsyncLocator to search for the specified structure
 * around the player's current position. The search range is 100 blocks
 * around the player's location. The search result is returned via a callback.
 * 
 * @param {$Player} player - The player object, used to determine the starting position for the search.
 * @param {string} structure - The identifier of the structure to search for (e.g., "minecraft:ancient_city").
 * @param {function($BlockPos|null): void} callback - The callback function to be called when the search is complete.
 *        If a structure is found, the callback will receive a BlockPos object as an argument, representing the structure's position.
 *        If no structure is found, the callback will receive null as an argument.
 * 
 * @example
 * // Search for an ancient city and log the result to the console
 * structureLocator(player, "minecraft:ancient_city", (pos) => {
 *     if (pos) {
 *         console.log(`Ancient city found at: ${pos.x}, ${pos.y}, ${pos.z}`);
 *     } else {
 *         console.log("No ancient city found nearby.");
 *     }
 * });
 */
export function asyncStructureLocator(player, structure, callback) {
    const { level } = player
    const structureId = Utils.id(structure)
    const structureTagKey = $TagKey.create(STRUCTURE, structureId)
    $AsyncLocator.locate(level, structureTagKey, player.blockPosition(), 10000, false)
        .thenOnServerThread(pos => {
            if (pos != null) {
                callback(pos)
            } else {
                callback(null)
            }
        })
}
/**
 * @Require MoreJS
 * @author M1hono
 * @description searches for a specified structure around the player within 5000 chunks without async.
 * @param {$Player} player - The player object, used to determine the starting position for the search.
 * @param {string} structure - The identifier of the structure to search for (e.g., "minecraft:ancient_city").
 * @returns {$BlockPos} - The position of the structure if found.
 */
export function structureLocator(player, structure) {
    const { level } = player
    const structureId = Utils.id(structure)
    const resourceOrTag = $ResourceOrTag.get(structureId , STRUCTURE)
    return $LevelUtils.findStructure(player.blockPosition() , level , resourceOrTag , 5000)
}
const { BIOME } = $Registries;
/**
 * @Require MoreJS
 * @author M1hono
 * @description searches for a specified biome around the player 5000 chunks without async.
 * @param {$Player} player - The player object, used to determine the starting position for the search.
 * @param {string} biome - The identifier of the biome to search for (e.g., "minecraft:plains").
 * @returns {$BlockPos} - The position of the biome if found.
 */
export function biomeLocator(player, biome) {
    const { level } = player
    const biomeId = Utils.id(biome)
    const resourceOrTag = $ResourceOrTag.get(biomeId , BIOME)
    return $LevelUtils.findBiome(player.blockPosition() , level , resourceOrTag , 5000)
}
/**
 * @author M1hono
 * @description Extracts the final part of a Minecraft resource identifier.
 * @param {string} id - The full resource identifier (e.g., "minecraft:recipe/sth")
 * @returns {string} - The extracted name (e.g., "sth")
 */
export function extractName(id) {
    if (typeof id !== 'string' || id.trim() === '') {
        return ''
    }
    const withoutNamespace = id.includes(':') ? id.split(':').pop() : id
    const parts = withoutNamespace.split('/')
    return parts[parts.length - 1] || ''
}