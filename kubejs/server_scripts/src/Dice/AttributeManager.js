// priority: 150
import { randomUUID } from "../API/Utils";
const { $Player } = require("packages/net/minecraft/world/entity/player/$Player");
const { $CompoundTag } = require("packages/net/minecraft/nbt/$CompoundTag");
/**
 * @public
 * @author M1hono
 * @description Player attribute manager.
 * @param {update|addAttribute|subtractAttribute|removeAttribute|_applyAttribute|getAttribute} PlayerAttributeManager
 * @example
 * PlayerAttributeManager.addAttribute(player, "minecraft:generic.max_health", 10) // Add 10 max health to the player.
 * PlayerAttributeManager.removeAttribute(player, "minecraft:generic.max_health") // Remove the max health attribute from the player.
 * PlayerAttributeManager.update(player) // Update the player attributes. (Need to be called when the player is cloned or persistentData changed without using this object.)
 * PlayerAttributeManager.getAttribute(player, "minecraft:generic.max_health") // Get the max health attribute value of the player added by this obejct.
 */
export const PlayerAttributeManager = {
  /**
   * @private This function should not be used out of this object.
   * @author M1hono
   * @description Initialize the player attributes.
   * @param {$Player} player
   */
  _initializeAttributes(player) {
    if (!player.persistentData.contains("attributes")) {
      player.persistentData.put("attributes", new $CompoundTag());
    }
  },
  /**
   * @public
   * @author M1hono
   * @description Update the player attributes effects.
   * @param {$Player} player
   */
  update(player) {
    this._initializeAttributes(player);
    const attributes = player.persistentData.getCompound("attributes");
    attributes.getAllKeys().forEach((attribute) => {
      const value = attributes.getDouble(attribute);
      this._applyAttribute(player, attribute, value);
    });
  },
  /**
   * @public
   * @author M1hono
   * @description Add the attribute to the player.
   * @param {$Player} player
   * @param {string} attribute
   * @param {number} value
   */
  addAttribute(player, attribute, value) {
    const attributes = player.persistentData.getCompound("attributes");
    let currentValue = attributes.getDouble(attribute);
    let newValue = currentValue + value;
    if (attribute === "minecraft:generic.max_health")
      newValue = Math.max(1, newValue);
    attributes.putDouble(attribute, newValue);
    this._applyAttribute(player, attribute, newValue);
  },
  /**
   * @public
   * @author M1hono
   * @description minus the attribute to the player.
   * @param {$Player} player
   * @param {string} attribute
   * @param {number} value
   */
  subtractAttribute(player, attribute, value) {
    this.addAttribute(player, attribute, -value);
  },
  /**
   * @param {$Player} player
   * @param {string} attribute
   */
  removeAttribute(player, attribute) {
    const attributes = player.persistentData.getCompound("attributes");
    attributes.remove(attribute);
    const attributeInstance = player.getAttribute(attribute);
    if (attributeInstance) {
      attributeInstance.getModifiers().forEach((modifier) => {
        attributeInstance.removeModifier(modifier.getId());
      });
    }
  },
  /**
   * @private This function should not be used out of this object.
   * @author M1hono
   * @description Apply the attribute to the player.
   * @param {$Player} player
   * @param {string} attribute
   * @param {number} value
   */
  _applyAttribute(player, attribute, value) {
    const attributeInstance = player.getAttribute(attribute);
    if (attributeInstance) {
      attributeInstance.getModifiers().forEach((modifier) => {
        attributeInstance.removeModifier(modifier.getId());
      });
      if (!player.persistentData.hasUUID(attribute)) {
        player.persistentData.putUUID(attribute, randomUUID());
      }
      let identifier = player.persistentData.getUUID(attribute);
      player.modifyAttribute(attribute, identifier, value, "addition");
      if (attribute == "minecraft:generic.max_health") player.health += value;
    }
  },
  /**
   * @public
   * @author M1hono
   * @description Get the attribute value of the player.
   * @param {$Player} player
   * @param {string} attribute
   * @returns {number}
   */
  getAttribute(player, attribute) {
    return player.persistentData.getCompound("attributes").getDouble(attribute);
  },
};
PlayerEvents.loggedIn((event) => {
  const { player } = event;
  PlayerAttributeManager.update(player);
});
