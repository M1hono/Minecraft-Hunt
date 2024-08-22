// ignore: true
// priority: 150
// requires: mna

// This part has been divided into another project.

// const {
// PlayerMagicProvider,
// } = require("packages/com/mna/capabilities/playerdata/magic/PlayerMagicProvider");
// const {
//   ServerMessageDispatcher,
// } = require("packages/com/mna/network/ServerMessageDispatcher");
// const {
//   $Player,
// } = require("packages/net/minecraft/world/entity/player/$Player");

const MNAmana = {
  /**
   * @author M1hono
   * @description Check if the player has enough mana.
   * @param {$Player} player
   * @param {number} amount - The amount of mana to check.
   * @returns {boolean} - Whether the player has enough mana.
   */
  hasEnoughMana: function (player, amount) {
    let hasEnough = false;
    player.getCapability(PlayerMagicProvider.MAGIC).ifPresent((magic) => {
      const castingResource = magic.getCastingResource();
      hasEnough = castingResource.hasEnough(player, amount);
    });
    return hasEnough;
  },
  /**
   * @author M1hono
   * @description Get the player's mana.
   * @param {$Player} player
   * @returns {number} - Player's amount of mana.
   */
  getMana: function (player) {
    let amount = 0;
    player.getCapability(PlayerMagicProvider.MAGIC).ifPresent((magic) => {
      const castingResource = magic.getCastingResource();
      amount = castingResource.getAmount();
    });
    return amount;
  },
  /**
   * @author M1hono
   * @description Set the player's mana.
   * @param {$Player} player
   * @param {number} amount - The amount of mana you want to set.
   */
  setMana: function (player, amount) {
    player.getCapability(PlayerMagicProvider.MAGIC).ifPresent((magic) => {
      const castingResource = magic.getCastingResource();
      castingResource.setAmount(amount);
      castingResource.setNeedsSync();
      ServerMessageDispatcher.sendMagicSyncMessage(player);
      castingResource.clearSyncStatus();
    });
  },
  /**
   * @author M1honos
   * @description Consume the player's mana.
   * @param {$Player} player
   * @param {number} amount - The amount of mana you want to consume.
   */
  consumeMana: function (player, amount) {
    player.getCapability(PlayerMagicProvider.MAGIC).ifPresent((magic) => {
      const castingResource = magic.getCastingResource();
      castingResource.consume(player, amount);
      castingResource.setNeedsSync();
      ServerMessageDispatcher.sendMagicSyncMessage(player);
      castingResource.clearSyncStatus();
    });
  },
  /**
   * @author M1hono
   * @description Refill the player's mana.
   * @param {$Player} player
   * @param {number} amount - The amount of mana you want to refill.
   */
  restoreMana: function (player, amount) {
    player.getCapability(PlayerMagicProvider.MAGIC).ifPresent((magic) => {
      const castingResource = magic.getCastingResource();
      castingResource.restore(amount);
      castingResource.setNeedsSync();
      ServerMessageDispatcher.sendMagicSyncMessage(player);
      castingResource.clearSyncStatus();
    });
  },
  /**
   * @author M1hono
   * @description Get the player's max mana.
   * @param {$Player} player
   * @returns {number} - Player's max amount of mana.
   */
  getMaxMana: function (player) {
    let maxAmount = 0;
    player.getCapability(PlayerMagicProvider.MAGIC).ifPresent((magic) => {
      const castingResource = magic.getCastingResource();
      maxAmount = castingResource.getMaxAmount();
    });
    return maxAmount;
  },
  /**
   * @author M1hono
   * @description Set the player's max mana.
   * @param {$Player} player
   * @param {number} amount - The max amount of mana you want to set.
   */
  setMaxMana: function (player, amount) {
    player.getCapability(PlayerMagicProvider.MAGIC).ifPresent((magic) => {
      const castingResource = magic.getCastingResource();
      castingResource.setMaxAmount(amount);
      castingResource.setNeedsSync();
      ServerMessageDispatcher.sendMagicSyncMessage(player);
      castingResource.clearSyncStatus();
    });
  },
  /**
   * @author M1hono
   * @description Get the player's mana regen.
   * @param {$Player} player
   * @returns {number} - Player's mana regen.
   */
  getManaRegen: function (player) {
    let regenRate = 0;
    player.getCapability(PlayerMagicProvider.MAGIC).ifPresent((magic) => {
      const castingResource = magic.getCastingResource();
      regenRate = castingResource.getRegenerationRate();
    });
    return regenRate;
  },
  /**
   * @author M1hono
   * @description Set the player's mana regen.
   * @param {$Player} player
   * @param {number} amount - The mana regen you want to set.
   */
  setManaRegen: function (player, amount) {
    player.getCapability(PlayerMagicProvider.MAGIC).ifPresent((magic) => {
      const castingResource = magic.getCastingResource();
      castingResource.setRegenerationRate(amount);
      castingResource.setNeedsSync();
      ServerMessageDispatcher.sendMagicSyncMessage(player);
      castingResource.clearSyncStatus();
    });
  }
}