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
 * @param {entity} entity - the mob you want to check.
 * @param {Trait} trait - the trait you want to check.
 * @returns {boolean} - whether the mob has the trait.
 */
function hasTrait(entity, trait) {
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
 * @param {entity} entity - the mob you want to get the trait.
 * @param {Trait} trait - the trait you want to get.
 * @returns {number} - the level of the trait.
 */
function getTraitLevel(entity, trait) {
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
 * @param {entity} entity - the mob you want to set the trait.
 * @param {Trait} trait - the trait you want to set.
 * @param {number} lv - the level of the trait.
 */
function setTrait(entity, trait, lv) {
    entity.getCapability($HostileEntity.CAPABILITY).ifPresent(mobTraitCap => {
        mobTraitCap.setTrait(trait, lv);
        entity.server.scheduleInTicks(1, () => {
            mobTraitCap.syncToClient(entity);
            entity.health += entity.getAttributeValue("minecraft:generic.max_health");
        });
    });
}
/**
 * Get the level of the mob.
 * @param {entity} entity - the mob you want to get the level.
 * @returns {number} - the level of the mob.
 */
function getDifficultLevel(entity) {
    let lv = 0;
    entity.getCapability($HostileEntity.CAPABILITY).ifPresent(mobTraitCap => {
        lv = mobTraitCap.getLevel();
    });
    return lv;
}
/**
 * @description set the level of the mob without rerolling the traits.
 * @param {entity} entity - the mob you want to set the level.
 * @param {number} lv - the level you want to set.
 */
function setLevelWithoutReroll(entity, lv) {
    entity.getCapability($HostileEntity.CAPABILITY).ifPresent(mobTraitCap => {
        mobTraitCap.setLevel(entity, lv);
        entity.server.scheduleInTicks(1, () => {
            mobTraitCap.syncToClient(entity);
            entity.health += entity.getAttributeValue("minecraft:generic.max_health");
        });
    });
}
/**
 * set the level of the mob and reroll the traits.
 * @param {entity} entity - the mob you want to set the level.
 * @param {number} lv - the level you want to set.
 * @param {boolean} boolean - whether the mob will reroll the traits with max chance.
 */
function setLevelWithReroll(entity, lv, boolean) {
    entity.getCapability($HostileEntity.CAPABILITY).ifPresent(mobTraitCap => {
        mobTraitCap.reinit(entity, lv, boolean);
        entity.server.scheduleInTicks(1, () => {
            mobTraitCap.syncToClient(entity);
            entity.health += entity.getAttributeValue("minecraft:generic.max_health");
        });
    });
}
/**
 * @description get all the traits of the mob.
 * @param {entity} entity - the mob you want ot get the traits.
 * @returns {Array}
 */
function getAllTraits(entity) {
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