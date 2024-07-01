// priority: 150
import { $Server } from "packages/info/journeymap/shaded/org/eclipse/jetty/server/$Server";
import { $Dimension } from "packages/java/awt/$Dimension";
import { $Structure } from "packages/net/minecraft/world/level/levelgen/structure/$Structure";
import { $StructurePlaceSettings } from "packages/net/minecraft/world/level/levelgen/structure/templatesystem/$StructurePlaceSettings";
import { $LootDataType } from "packages/net/minecraft/world/level/storage/loot/$LootDataType";
import { $DamageSource } from "packages/net/minecraft/world/damagesource/$DamageSource";
import { $Registries } from "packages/net/minecraft/core/registries/$Registries";
import { $ResourceKey } from "packages/net/minecraft/resources/$ResourceKey";
import { $Entity } from "packages/net/minecraft/world/entity/$Entity";
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
 * @author M1hono
 * @description Get the damage source with the entity as the source.
 * @param {$ResourceLocation_} damageType
 * @param {$Entity_} entity
 * @returns {$DamageSource}
 */
export function getOrSource(damageType, entity) {
    const { level } = entity
    const type = Utils.id(damageType)
    const damageTypeKey = $ResourceKey.create(DAMAGE_TYPE, type)
    const damageTypeHolder = 
    level
    .registryAccess()
    .registryOrThrow(DAMAGE_TYPE)
    .getHolderOrThrow(damageTypeKey)
    return new $DamageSource(damageTypeHolder, entity, entity)
}