// priority: 99
import { randomUUID } from "../API/Utils"
const { $Player } = require("packages/net/minecraft/world/entity/player/$Player")
const { $CompoundTag } = require("packages/net/minecraft/nbt/$CompoundTag")

export const PlayerAttributeManager = {
    /**
     * @public
     * @author M1hono
     * @description Update the player attributes effects.
     * @param {$Player} player
     */
    update(player) {
        const attributes = player.persistentData.getCompound("attributes")
        attributes.getAllKeys().forEach(attribute => {
            const value = attributes.getDouble(attribute)
            this._applyAttribute(player, attribute, value)
        })
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
        const attributes = player.persistentData.getCompound("attributes")
        const currentValue = attributes.getDouble(attribute)
        const newValue = currentValue + value
        attributes.putDouble(attribute, newValue)
        this._applyAttribute(player, attribute, newValue)
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
        this.addAttribute(player, attribute, -value)
    },
    /**
     * @param {$Player} player
     * @param {string} attribute
     */
    removeAttribute(player, attribute) {
        const attributes = player.persistentData.getCompound("attributes")
        attributes.remove(attribute)
        const attributeInstance = player.getAttribute(attribute)
        if (attributeInstance) {
            attributeInstance.getModifiers().forEach(modifier => {
                attributeInstance.removeModifier(modifier.getId())
            })
        }
    },
    /**
     * @private This function should not be used out of this this object.
     * @author M1hono
     * @description Apply the attribute to the player.
     * @param {$Player} player
     * @param {string} attribute
     * @param {number} value
     */
    _applyAttribute(player, attribute, value) {
        const attributeInstance = player.getAttribute(attribute)
        if (attributeInstance) {
            attributeInstance.getModifiers().forEach(modifier => {
                attributeInstance.removeModifier(modifier.getId())
            })
            if (!player.persistentData.hasUUID(attribute)) {
                player.persistentData.putUUID(attribute, randomUUID())
            }
            let identifier = player.persistentData.getUUID(attribute)
            player.modifyAttribute(attribute, identifier, value, "addition")
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
        return player.persistentData.getCompound("attributes").getDouble(attribute)
    }
}
// handle the player login and logout events for attribute init.
PlayerEvents.loggedIn(event => {
    const { player } = event
    if (!player.persistentData.contains("attributes")) {
        player.persistentData.put("attributes", new $CompoundTag())
    }
    PlayerAttributeManager.update(player)

    if (player.tags.contains("hurt")) {
        player.tags.remove("hurt")
        return
    }
    if (player.persistentData.contains("health")) {
        player.health = player.persistentData.getDouble("health")
        player.persistentData.remove("health")
        return
    }
    player.health += PlayerAttributeManager.getAttribute(player, "minecraft:generic.max_health")
})
PlayerEvents.loggedOut(event => {
    const { player } = event
    if (player.health == player.maxHealth) return
    if (player.health > player.getAttributeBaseValue("generic.max_health")) {
        player.persistentData.putDouble("health", player.health)
        return
    }
    player.addTag("hurt")
})