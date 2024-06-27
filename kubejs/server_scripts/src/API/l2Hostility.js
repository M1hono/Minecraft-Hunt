const { $Entity } = require("packages/net/minecraft/world/entity/$Entity");

// requires: l2hostility
const { $Entity } = require("packages/net/minecraft/world/entity/$Entity");
const $HostileEntity = Java.loadClass("dev.xkmc.l2hostility.content.capability.mob.MobTraitCap");
/**
 * @typedef {"l2hostility:adaptive"
 * |"l2hostility:arena"
 * |"l2hostility:blindness"
 * |"l2hostility:corrosion"
 * |"l2hostility:counter_strike"
 * |"l2hostility:cursed"
 * |"l2hostility:dementor"
 * |"l2hostility:dispell"
 * |"l2hostility:drain"
 * |"l2hostility:erosion"
 * |"l2hostility:fiery"
 * |"l2hostility:freezing"
 * |"l2hostility:gravity"
 * |"l2hostility:grenade"
 * |"l2hostility:growth"
 * |"l2hostility:invisible"
 * |"l2hostility:killer_aura"
 * |"l2hostility:levitation"
 * |"l2hostility:master"
 * |"l2hostility:moonwalk"
 * |"l2hostility:nausea"
 * |"l2hostility:poison"
 * |"l2hostility:protection"
 * |"l2hostility:pulling"
 * |"l2hostility:ragnarok"
 * |"l2hostility:reflect"
 * |"l2hostility:regenerate"
 * |"l2hostility:repelling"
 * |"l2hostility:reprint"
 * |"l2hostility:shulker"
 * |"l2hostility:slowness"
 * |"l2hostility:soul_burner"
 * |"l2hostility:speedy"
 * |"l2hostility:split"
 * |"l2hostility:tank"
 * |"l2hostility:teleport"
 * |"l2hostility:undying"
 * |"l2hostility:weakness"
 * |"l2hostility:wither"} Trait
 */
/**
 * @description check if the mob has the specified trait.
 * @param {$Entity} entity - the mob you want to check.
 * @param {Trait} trait - the trait you want to check.
 * @returns {boolean} - whether the mob has the trait.
 */
export function hasTrait(entity, trait) {
    let hasTrait = false;
    entity.getCapability($HostileEntity.CAPABILITY).ifPresent(mobTraitCap => {
        console.log("Capability present");
        let traits = mobTraitCap.traits;
        console.log("Traits: ", traits);
        for (let entry of traits.entrySet()) {
            let key = entry.getKey().getID();
            if (key.equals(trait)) {
                hasTrait = true;
                break;
            }
        }
    });
    return hasTrait;
}
/**
 * @description get the level of the specified trait of the mob.
 * @param {$Entity} entity - the mob you want to get the trait.
 * @param {Trait} trait - the trait you want to get.
 * @returns {number} - the level of the trait.
 */
export function getTraitLevel(entity, trait) {
    let traitLevel = -1;
    entity.getCapability($HostileEntity.CAPABILITY).ifPresent(mobTraitCap => {
        console.log("Capability present");
        let traits = mobTraitCap.traits;
        console.log("Traits: ", traits);
        for (let entry of traits.entrySet()) {
            let key = entry.getKey().getID();
            if (key.equals(trait)) {
                traitLevel = entry.getValue();
                break;
            }
        }
    });
    return traitLevel;
}
/**
 * @description set the trait of the mob.
 * @param {$Entity} entity - the mob you want to set the trait.
 * @param {Trait} trait - the trait you want to set.
 * @param {number} lv - the level of the trait.
 */
export function setTrait(entity, trait, lv) {
    entity.getCapability($HostileEntity.CAPABILITY).ifPresent(mobTraitCap => {
        const currentHealth = entity.health;
        const maxHealth = entity.getAttributeValue("minecraft:generic.max_health");
        const healthPercentage = currentHealth / maxHealth;
        mobTraitCap.setTrait(trait, lv);
        entity.server.scheduleInTicks(1, () => {
            mobTraitCap.syncToClient(entity);
            const newMaxHealth = entity.getAttributeValue("minecraft:generic.max_health");
            entity.health = newMaxHealth * healthPercentage;
        });
    });
}

/**
 * Get the level of the mob.
 * @param {$Entity} entity - the mob you want to get the level.
 * @returns {number} - the level of the mob.
 */
export function getDifficultLevel(entity) {
    let lv = 0;
    entity.getCapability($HostileEntity.CAPABILITY).ifPresent(mobTraitCap => {
        lv = mobTraitCap.getLevel();
    });
    return lv;
}
/**
 * @description set the level of the mob without rerolling the traits.
 * @param {$Entity} entity - the mob you want to set the level.
 * @param {number} lv - the level you want to set.
 */
export function setLevelWithoutReroll(entity, lv) {
    entity.getCapability($HostileEntity.CAPABILITY).ifPresent(mobTraitCap => {
        const currentHealth = entity.health;
        const maxHealth = entity.getAttributeValue("minecraft:generic.max_health");
        const healthPercentage = currentHealth / maxHealth;
        mobTraitCap.setLevel(entity, lv);
        entity.server.scheduleInTicks(1, () => {
            mobTraitCap.syncToClient(entity);
            const newMaxHealth = entity.getAttributeValue("minecraft:generic.max_health");
            entity.health = newMaxHealth * healthPercentage;
        });
    });
}
/**
 * Set the level of the mob and reroll the traits.
 * @param {$Entity} entity - The mob you want to set the level.
 * @param {number} lv - The level you want to set.
 * @param {boolean} [reroll=false] - Whether the mob will reroll the traits with max chance.
 */
export function setLevelWithReroll(entity, lv, reroll) {
    entity.getCapability($HostileEntity.CAPABILITY).ifPresent(mobTraitCap => {
        if (reroll === undefined) reroll = false;
        const currentHealth = entity.getHealth();
        const maxHealth = entity.getAttributeValue("minecraft:generic.max_health");
        const healthPercentage = currentHealth / maxHealth;
        mobTraitCap.reinit(entity, lv, reroll);
        const newMaxHealth = entity.getAttributeValue("minecraft:generic.max_health");
        const newHealth = newMaxHealth * healthPercentage;
        entity.setHealth(newHealth);
        entity.server.scheduleInTicks(1, () => {
            mobTraitCap.syncToClient(entity);
        });
    });
}
/**
 * @description get all the traits of the mob.
 * @param {$Entity} entity - the mob you want ot get the traits.
 * @returns {Array}
 */
export function getAllTraits(entity) {
    let traitsList = [];
    entity.getCapability($HostileEntity.CAPABILITY).ifPresent(mobTraitCap => {
        let traits = mobTraitCap.traits;
        let entries = traits.entrySet();
        for (let entry of entries) {
            traitsList.push({
                trait: entry.getKey().getID(),
                level: entry.getValue()
            });
        }
    });
    return traitsList;
}