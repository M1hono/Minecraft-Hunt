const { $UUID } = require("packages/java/util/$UUID")
const { $Player } = require("packages/net/minecraft/world/entity/player/$Player")
const { $CompoundTag } = require("packages/net/minecraft/nbt/$CompoundTag")
PlayerEvents.loggedIn(event => {
    const { player } = event
    if (!player.persistentData.contains("attributes")) {
        player.persistentData.put("attributes", new $CompoundTag())
    }
    attributeupdater(player)
    player.health += getAttribute(player, "minecraft:generic.max_health")
})
/** 
 * @author M1hono
 * @description Update the attribute.
 * @param {$Player} player
 */
export function attributeupdater(player) {
    const attributes = player.persistentData.getCompound("attributes")
    attributes.getAllKeys().forEach(attribute => {
        const value = attributes.getDouble(attribute)
        applyAttribute(player, attribute, value)
    })
}
/**
 * @author M1hono
 * @description Add the attribute to the player's persistentData
 * @param {$Player} player
 * @param {string} attribute
 * @param {number} value
 */
export function addAttribute(player, attribute, value) {
    const attributes = player.persistentData.getCompound("attributes")
    const currentValue = attributes.getDouble(attribute)
    const newValue = currentValue + value
    attributes.putDouble(attribute, newValue)
    applyAttribute(player, attribute, newValue)
}
/**
 * @author M1hono
 * @description minus the attribute to the player's persistentData
 * @param {$Player} player
 * @param {string} attribute
 * @param {number} value
 */
export function subtractAttribute(player, attribute, value) {
    addAttribute(player, attribute, -value)
}
/**
 * @author M1hono
 * @description Remove the attribute from the player's persistentData
 * @param {$Player} player
 * @param {string} attribute
 */
export function removeAttribute(player, attribute) {
    const attributes = player.persistentData.getCompound("attributes")
    attributes.remove(attribute)
    const attributeInstance = player.getAttribute(attribute)
    if (attributeInstance) {
        attributeInstance.getModifiers().forEach(modifier => {
            attributeInstance.removeModifier(modifier.getId())
        })
    }
}
/**
 * @param {$Player} player
 * @param {string} attribute
 * @param {number} value
 */
function applyAttribute(player, attribute, value) {
    const attributeInstance = player.getAttribute(attribute)
    if (attributeInstance) {
        attributeInstance.getModifiers().forEach(modifier => {
            attributeInstance.removeModifier(modifier.getId())
        })
        if (!player.persistentData.hasUUID(attribute)) {
            player.persistentData.putUUID(attribute, $UUID.randomUUID())
        }
        let identifier = player.persistentData.getUUID(attribute)
        player.modifyAttribute(attribute, identifier, value, "addition")
    }
}
/**
 * @author M1hono
 * @description Get the attribute value from the player's persistentData
 * @param {$Player} player
 * @param {string} attribute
 * @returns {number}
 */
export function getAttribute(player, attribute) {
    const attributes = player.persistentData.getCompound("attributes")
    return attributes.getDouble(attribute)
}