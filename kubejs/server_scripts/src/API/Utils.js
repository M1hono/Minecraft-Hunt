// priority: 155
// import { $Server } from "packages/info/journeymap/shaded/org/eclipse/jetty/server/$Server";
// import { $Dimension } from "packages/java/awt/$Dimension";
// import { $Structure } from "packages/net/minecraft/world/level/levelgen/structure/$Structure";
// import { $StructurePlaceSettings } from "packages/net/minecraft/world/level/levelgen/structure/templatesystem/$StructurePlaceSettings";
// import { $LootDataType } from "packages/net/minecraft/world/level/storage/loot/$LootDataType";
// import { $DamageSource } from "packages/net/minecraft/world/damagesource/$DamageSource";
// import { $Registries } from "packages/net/minecraft/core/registries/$Registries";
// import { $ResourceKey } from "packages/net/minecraft/resources/$ResourceKey";
// import { $Entity } from "packages/net/minecraft/world/entity/$Entity";
// import { $LevelUtils } from "packages/com/almostreliable/morejs/util/$LevelUtils";
// import { $ResourceOrTag } from "packages/com/almostreliable/morejs/util/$ResourceOrTag";
// import { $BlockPos } from "packages/net/minecraft/core/$BlockPos";
// import { $Player } from "packages/net/minecraft/world/entity/player/$Player";
// import { $TagKey } from "packages/net/minecraft/tags/$TagKey";
const UUID = Java.loadClass("java.util.UUID");
const $UUIDUtil = Java.loadClass("net.minecraft.core.UUIDUtil");

const Utils = {
  /**
   * @author https://github.com/squoshi
   * @description Return a random UUID.
   * @returns {UUID}
   */
  randomUUID: () => UUID.randomUUID(),
  /**
   * @description Convert a UUID to the IntegerArray that nbt can use.
   * @param {UUID} uuid
   * @returns {Array.<integer>}
   */
  toNBTUUID: (uuid) => $UUIDUtil.uuidToIntArray(uuid),
  /**
   * @author https://github.com/squoshi
   * @description Check the entity by UUID.
   * @param {UUID}
   * @returns {$Entity_}
   */
  entityByUUID: (uuid) => {
    Utils.server.getEntities().forEach((entity) => {
      if (entity.uuid.equals(uuid)) return entity;
      return null;
    });
  },
  /**
   * @author M1hono
   * @description Return a random chest loot table.
   * @param {$Entity} entity
   * @param {string} filter
   * @returns {$LootTable}
   */
  chestloot: function (entity, filter) {
    const {
      server: { lootData },
    } = entity;
    let filteredList = lootData
      .getKeys($LootDataType.TABLE)
      .stream()
      .filter((id) => id.path.contains(filter))
      .map((id) => id.toString())
      .toList();
    return filteredList[Math.floor(Math.random() * filteredList.length)];
  },
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
  spawnStructure: function (server, dimension, structure, x, y, z) {
    let level = server.getLevel(dimension);
    let pos = BlockPos(x, y, z);
    server.structureManager
      .get(structure)
      .ifPresent((e) =>
        e.placeInWorld(
          level,
          pos,
          pos,
          new $StructurePlaceSettings(),
          level.random,
          3
        )
      );
  },
  /**
   * @notification Require Lodestone
   * @author https://discord.com/channels/303440391124942858/1140369302571200562
   * @description Shake the screen.
   */
  screenshake: function (event) {
    const { x, y, z, level } = event;
    level
      .getEntitiesWithin(AABB.of(x - 20, y - 20, z - 20, x + 20, y + 20, z + 20))
      .forEach((entity) => {
        if (entity.isPlayer()) {
          let distance = entity.getDistance(x, y, z);
          distance = 20 - distance;
          distance = (distance / 20) * 2;
          entity.sendData("screenshake", {
            i1: distance * 0.6,
            i2: distance,
            i3: distance * 0.2,
            duration: 15,
          });
        }
      });
  },
  // const { DAMAGE_TYPE } = $Registries,
  DAMAGE_TYPE: $Registries.DAMAGE_TYPE,

  /**
   * @author M1hono
   * @description Get the damage source with the entity as the source.
   * @param {import("./TypeValues").DamageType} damageType
   * @param {$Entity_} entity
   * @returns {$DamageSource}
   * @example
   * you must use target's attack method to deal damage to the target and use attacker as the argument.
   * player.attack(getOrSource("minecraft:fire", entity),10) // let the entity deal 10 fire damage to the player.
   */
  getOrSource: function (damageType, entity) {
    const { level } = entity;
    const type = Utils.id(damageType);
    const damageTypeKey = $ResourceKey.create(DAMAGE_TYPE, type);
    const damageTypeHolder = level
      .registryAccess()
      .registryOrThrow(DAMAGE_TYPE)
      .getHolderOrThrow(damageTypeKey);
    return new $DamageSource(damageTypeHolder, entity, entity);
  },
  // const { STRUCTURE } = $Registries,
  STRUCTURE: $Registries.STRUCTURE,
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
  //  function asyncStructureLocator(player, structure, callback) {
  //     const { level } = player
  //     const structureId = Utils.id(structure)
  //     const structureTagKey = $TagKey.create(STRUCTURE, structureId)
  //     $AsyncLocator.locate(level, structureTagKey, player.blockPosition(), 10000, false)
  //         .thenOnServerThread(pos => {
  //             if (pos != null) {
  //                 callback(pos)
  //             } else {
  //                 callback(null)
  //             }
  //         })
  // }
  /**
   * @Require MoreJS
   * @author M1hono
   * @description searches for a specified structure around the player within 5000 chunks without async.
   * @param {$Player} player - The player object, used to determine the starting position for the search.
   * @param {string} structure - The identifier of the structure to search for (e.g., "minecraft:ancient_city").
   * @returns {$BlockPos} - The position of the structure if found.
   */
  structureLocator: function (player, structure) {
    const { level } = player;
    const structureId = Utils.id(structure);
    const resourceOrTag = $ResourceOrTag.get(structureId, STRUCTURE);
    return $LevelUtils.findStructure(
      player.blockPosition(),
      level,
      resourceOrTag,
      5000
    );
  },
  // const { BIOME } = $Registries;
  /**
   * @Require MoreJS
   * @author M1hono
   * @description searches for a specified biome around the player 5000 chunks without async.
   * @param {$Player} player - The player object, used to determine the starting position for the search.
   * @param {string} biome - The identifier of the biome to search for (e.g., "minecraft:plains").
   * @returns {$BlockPos} - The position of the biome if found.
   */
  biomeLocator: function (player, biome) {
    const { level } = player;
    const biomeId = Utils.id(biome);
    const resourceOrTag = $ResourceOrTag.get(biomeId, BIOME);
    return $LevelUtils.findBiome(
      player.blockPosition(),
      level,
      resourceOrTag,
      5000
    );
  },
  /**
   * @author M1hono
   * @description Extracts the final part of a Minecraft resource identifier.
   * @param {string} id - The full resource identifier (e.g., "minecraft:recipe/sth")
   * @returns {string} - The extracted name (e.g., "sth")
   */
  extractName: function (id) {
    if (typeof id !== "string" || id.trim() === "") {
      return "";
    }
    const withoutNamespace = id.includes(":") ? id.split(":").pop() : id;
    const parts = withoutNamespace.split("/");
    return parts[parts.length - 1] || "";
  },
  /**
   * @author M1hono
   * @description Return a boolean value based on the given probability.
   * @param {number} probability - A number between 0.0 and 100.0
   * @returns {boolean} The result of the random chance.
   */
  randomChance: function (probability) {
    if (typeof probability !== 'number') return false;
    return Math.random() < Math.min(Math.max(probability, 0), 100) / 100;
  },
  /**
   * @author M1hono
   * @description Return a random integer between the specified minimum and maximum values (inclusive).
   * @param {number} min - The minimum value (integer, can be negative)
   * @param {number} max - The maximum value (integer, can be negative)
   * @returns {number} A random integer between min and max (inclusive)
   */
  randomInt: function (min, max) {
    if (typeof min !== 'number' || typeof max !== 'number') return NaN;
    return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min);
  }
}