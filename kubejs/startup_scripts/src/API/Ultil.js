// priority: 150
import { $Server } from "packages/info/journeymap/shaded/org/eclipse/jetty/server/$Server";
import { $Dimension } from "packages/java/awt/$Dimension";
import { $Structure } from "packages/net/minecraft/world/level/levelgen/structure/$Structure";
import { $StructurePlaceSettings } from "packages/net/minecraft/world/level/levelgen/structure/templatesystem/$StructurePlaceSettings";
import { $LootDataType } from "packages/net/minecraft/world/level/storage/loot/$LootDataType";
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
 * @param {$Player} player
 * @param {string} filter
 * @returns {$LootTable}
 */
export function chestloot(event,filter) {
    const {
        server: { lootData }
    } = event
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