// priority: 150
// requires: l2hostility
// import { $Entity } from "packages/net/minecraft/world/entity/$Entity";
const $HostileEntity = Java.loadClass(
  "dev.xkmc.l2hostility.content.capability.mob.MobTraitCap"
);
const l2Hostility = {
  /**
 * @description check if the mob has the specified trait.
 * @param {$Entity} entity - the mob you want to check.
 * @param {Trait} trait - the trait you want to check. 
 * @returns {boolean} - whether the mob has the trait.
 */
  hasTrait: function (entity, trait) {
    let hasTrait = false;
    entity.getCapability($HostileEntity.CAPABILITY).ifPresent((mobTraitCap) => {
      let traits = mobTraitCap.traits;
      for (let entry of traits.entrySet()) {
        let key = entry.getKey().getID();
        if (key.equals(trait)) {
          hasTrait = true;
          break;
        }
      }
    });
    return hasTrait;
  },
  /**
   * @description get the level of the specified trait of the mob.
   * @param {$Entity} entity - the mob you want to get the trait.
   * @param {Trait} trait - the trait you want to get. 
   * @returns {number} - the level of the trait.
   */
  getTraitLevel: function (entity, trait) {
    let traitLevel = -1;
    entity.getCapability($HostileEntity.CAPABILITY).ifPresent((mobTraitCap) => {
      let traits = mobTraitCap.traits;
      for (let entry of traits.entrySet()) {
        let key = entry.getKey().getID();
        if (key.equals(trait)) {
          traitLevel = entry.getValue();
          break;
        }
      }
    });
    return traitLevel;
  },
  /**
   * @description set the trait of the mob.
   * @param {$Entity} entity - the mob you want to set the trait.
   * @param {Trait} trait - the trait you want to set. 
   * @param {number} lv - the level of the trait.
   */
  setTrait: function (entity, trait, lv) {
    entity.getCapability($HostileEntity.CAPABILITY).ifPresent((mobTraitCap) => {
      const healthPercentage = entity.health / entity.maxHealth;
      mobTraitCap.setTrait(trait, lv);
      entity.server.scheduleInTicks(1, () => {
        mobTraitCap.syncToClient(entity);
        entity.health = entity.maxHealth * healthPercentage;
      });
    });
  },
  /**
   * Get the level of the mob.
   * @param {$Entity} entity - the mob you want to get the level.
   * @returns {number} - the level of the mob.
   */
  getmobLevel: function (entity) {
    let lv = 0;
    entity.getCapability($HostileEntity.CAPABILITY).ifPresent((mobTraitCap) => {
      lv = mobTraitCap.getLevel();
    });
    return lv;
  },
  /**
   * @description set the level of the mob without rerolling the traits.
   * @param {$Entity} entity - the mob you want to set the level.
   * @param {number} lv - the level you want to set.
   */
  setLevelWithoutReroll: function (entity, lv) {
    entity.getCapability($HostileEntity.CAPABILITY).ifPresent((mobTraitCap) => {
      const healthPercentage = entity.health / entity.maxHealth;
      mobTraitCap.setLevel(entity, lv);
      entity.server.scheduleInTicks(1, () => {
        mobTraitCap.syncToClient(entity);
        entity.health = entity.maxHealth * healthPercentage;
      });
    });
  },
  /**
   * Set the level of the mob and reroll the traits.
   * @param {$Entity} entity - The mob you want to set the level.
   * @param {number} lv - The level you want to set.
   * @param {boolean} [reroll=false] - Whether the mob will reroll the traits with max chance.
   */
  setLevelWithReroll: function (entity, lv, reroll) {
    entity.getCapability($HostileEntity.CAPABILITY).ifPresent((mobTraitCap) => {
      if (reroll === undefined) reroll = false;
      const currentHealth = entity.getHealth();
      const maxHealth = entity.getAttributeValue("minecraft:generic.max_health");
      const healthPercentage = currentHealth / maxHealth;
      mobTraitCap.reinit(entity, lv, reroll);
      const newMaxHealth = entity.getAttributeValue(
        "minecraft:generic.max_health"
      );
      const newHealth = newMaxHealth * healthPercentage;
      entity.setHealth(newHealth);
      entity.server.scheduleInTicks(1, () => {
        mobTraitCap.syncToClient(entity);
      });
    });
  },
  /**
   * @description get all the traits of the mob.
   * @param {$Entity} entity - the mob you want ot get the traits.
   * @returns {Array}
   */
  getAllTraits: function (entity) {
    let traitsList = [];
    entity.getCapability($HostileEntity.CAPABILITY).ifPresent((mobTraitCap) => {
      let traits = mobTraitCap.traits;
      let entries = traits.entrySet();
      for (let entry of entries) {
        traitsList.push({
          trait: entry.getKey().getID(),
          level: entry.getValue(),
        });
      }
    });
    return traitsList;
  }
}