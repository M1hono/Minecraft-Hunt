// priority: 145

// import { $Player } from "packages/net/minecraft/world/entity/player/$Player";
// import { getItemAttackDamageFromTooltip as Battle.getItemAttackDamageFromTooltip } from "./Battle";
// import { $Level } from "packages/net/minecraft/world/level/$Level";
// const { $ItemStack } = require("packages/net/minecraft/world/item/$ItemStack");
// const {
//   $ThrowingAxeEntity,
// } = require("packages/dev/xkmc/l2weaponry/content/entity/$ThrowingAxeEntity");
// const {
//   $AbstractArrow,
// } = require("packages/net/minecraft/world/entity/projectile/$AbstractArrow");
// const { $SoundEvents } = require("packages/net/minecraft/sounds/$SoundEvents");

/**
 * @public
 * @author M1hono
 * @description A class that helps to throw weapons with high customization.
 * @param {$Player} player - The player throwing the weapon
 * @param {$Level} level - The level in which the throwing occurs
 * @param {$MinecraftServer_} server - The Minecraft server instance
 */
function WeaponThrower(player, level, server) {
  this.player = player;
  this.level = level;
  this.server = server;
  this.cooldownTicks = 80;
  this.throwSpeed = 3.5;
  this.throwInaccuracy = 1.0;
  this.slownessDuration = 5;
  this.slownessAmplifier = 3;
  this.maxThrowCount = Infinity;
  this.yawRandomness = 5;
  this.pitchRandomness = 1;
  this.returnDelay = 70;
  this.throwDelay = 5;
  this.customDamageCalculation = null;
  this.customPositionOffset = null;
  this.customSoundEffect = null;
  this.shouldGlow = false;
  this.customThrowableCheck = null;
  this.customReturnCheck = null;
  this.throwableTags = [];
  this.throwReverse = false;
  this.startSlot = 0;
}

WeaponThrower.prototype = {
  /**
   * @public
   * @author M1hono
   * @description Initiates the weapon throwing process
   */
  throwWeapon: function () {
    this.throwCount = 0;
    if (this.throwReverse) {
      this._throwFromSlot(this.startSlot, -1);
    } else {
      this._throwFromSlot(this.startSlot, 1);
    }
  },

  /**
   * @private Used by throwWeapon only.
   * @author M1hono
   * @description Throws a weapon from a specific slot
   * @param {number} slot - The inventory slot to throw from
   * @param {number} direction - The direction to move in the inventory (1 or -1)
   * @private
   */
  _throwFromSlot: function (slot, direction) {
    if (this.throwCount >= this.maxThrowCount) return;
    if (
      this.throwReverse ? slot < 0 : slot >= this.player.inventory.containerSize
    )
      return;

    let itemStack = this.player.inventory.getItem(slot);
    if (this._isThrowable(itemStack)) {
      this._handleWeaponThrow(itemStack, slot);
      this.throwCount++;
    }
    this._processNextSlot(slot, direction);
  },

  /**
   * @private Used by throwWeapon only.
   * @author M1hono
   * @description Handles the actual throwing of the weapon
   * @param {$ItemStack} itemStack - The item being thrown
   * @param {number} slot - The slot the item is being thrown from
   * @private
   */
  _handleWeaponThrow: function (itemStack, slot) {
    if (this.player.isCrouching() || !this.player.isAlive()) return;
    this.player.potionEffects.add(
      "minecraft:slowness",
      this.slownessDuration,
      this.slownessAmplifier
    );

    let damage = this._getItemDamage(itemStack);
    let shouldDestroy = this._applyDamageToItem(itemStack, damage);

    let throwedWeapon = this._createThrowingEntity(itemStack, slot, damage);
    this._setEntityPosition(throwedWeapon);
    this._shootEntity(throwedWeapon);

    this._playThrowSound(throwedWeapon);
    this.level.addFreshEntity(throwedWeapon);

    this._handleInventoryAndPickup(
      itemStack,
      slot,
      throwedWeapon,
      shouldDestroy
    );
  },

  /**
   * @private Used by throwWeapon only.
   * @author M1hono
   * @description Calculates the damage for the thrown item
   * @param {$ItemStack} itemStack - The item being thrown
   * @returns {number} The calculated damage
   * @private
   */
  _getItemDamage: function (itemStack) {
    if (this.customDamageCalculation) {
      return this.customDamageCalculation(this.player, itemStack);
    }
    return Battle.getItemAttackDamageFromTooltip(this.player, itemStack);
  },

  /**
   * @private Used by throwWeapon only.
   * @author M1hono
   * @description Applies damage to the thrown item
   * @param {$ItemStack} itemStack - The item being thrown
   * @param {number} damage - The amount of damage to apply
   * @returns {boolean} Whether the item should be destroyed
   * @private
   */
  _applyDamageToItem: function (itemStack, damage) {
    if (this.player.getAbilities().instabuild || itemStack.getMaxDamage() <= 1)
      return false;

    let currentDamage = itemStack.getDamageValue();
    let newDamageValue = currentDamage + damage;

    if (newDamageValue >= itemStack.getMaxDamage()) {
      return true;
    } else {
      itemStack.setDamageValue(newDamageValue);
      return false;
    }
  },

  /**
   * @private Used by throwWeapon only.
   * @author M1hono
   * @description Creates the throwing entity
   * @param {$ItemStack} itemStack - The item being thrown
   * @param {number} slot - The slot the item is being thrown from
   * @param {number} damage - The damage of the thrown entity
   * @returns {$ThrowingAxeEntity} The created throwing entity
   * @private
   */
  _createThrowingEntity: function (itemStack, slot, damage) {
    let entity = new $ThrowingAxeEntity(
      this.level,
      this.player,
      itemStack,
      slot
    );
    entity.setBaseDamage(damage);
    entity.glowing = this.shouldGlow;
    return entity;
  },

  /**
   * @private Used by throwWeapon only.
   * @author M1hono
   * @description Sets the position of the thrown entity
   * @param {$ThrowingAxeEntity} entity - The entity to position
   * @private
   */
  _setEntityPosition: function (entity) {
    let x = this.player.getX();
    let y = this.player.getY();
    let z = this.player.getZ();
    let eyeHeight = this.player.getEyeHeight();
    let lookAngle = this.player.getLookAngle().toVector3f();

    let offsetX = lookAngle.x * 1.0;
    let offsetY = lookAngle.y * 1.0 + eyeHeight;
    let offsetZ = lookAngle.z * 1.0;

    if (this.customPositionOffset) {
      let customOffset = this.customPositionOffset(this.player, lookAngle);
      offsetX = customOffset.x;
      offsetY = customOffset.y;
      offsetZ = customOffset.z;
    }

    entity.setPos(x + offsetX, y + offsetY, z + offsetZ);
  },

  /**
   * @private Used by throwWeapon only.
   * @author M1hono
   * @description Shoots the thrown entity
   * @param {$ThrowingAxeEntity} entity - The entity to shoot
   * @private
   */
  _shootEntity: function (entity) {
    let yaw = this.player.yRotO + (Math.random() - 0.5) * this.yawRandomness;
    let pitch =
      this.player.xRotO + (Math.random() - 0.5) * this.pitchRandomness;

    entity.shootFromRotation(
      this.player,
      pitch,
      yaw,
      0.0,
      this.throwSpeed,
      this.throwInaccuracy
    );
  },

  /**
   * @private Used by throwWeapon only.
   * @author M1hono
   * @description Plays the throw sound
   * @param {$ThrowingAxeEntity} entity - The thrown entity
   * @private
   */
  _playThrowSound: function (entity) {
    if (this.customSoundEffect) {
      this.customSoundEffect(this.level, entity);
    } else {
      this.level.playSound(
        null,
        entity.getX(),
        entity.getY(),
        entity.getZ(),
        $SoundEvents.TRIDENT_THROW,
        $SoundSource.PLAYERS,
        1.0,
        1.0
      );
    }
  },

  /**
   * @private Used by throwWeapon only.
   * @author M1hono
   * @description Handles inventory changes and entity pickup settings after throwing
   * @param {$ItemStack} itemStack - The thrown item
   * @param {number} slot - The slot the item was thrown from
   * @param {$ThrowingAxeEntity} entity - The thrown entity
   * @param {boolean} shouldDestroy - Whether the item should be destroyed
   * @private
   */
  _handleInventoryAndPickup: function (itemStack, slot, entity, shouldDestroy) {
    if (!this.player.getAbilities().instabuild) {
      this.player.inventory.setStackInSlot(slot, $ItemStack.EMPTY);

      if (shouldDestroy) {
        entity.kill();
      } else if (this._shouldReturn(itemStack)) {
        entity.pickup = $AbstractArrow.Pickup.ALLOWED;
        this._scheduleItemReturn(entity, itemStack);
      } else {
        entity.pickup = $AbstractArrow.Pickup.ALLOWED;
      }
    } else {
      entity.pickup = $AbstractArrow.Pickup.CREATIVE_ONLY;
    }
  },

  /**
   * @private Used by throwWeapon only.
   * @author M1hono
   * @description Schedules the return of a thrown item
   * @param {$ThrowingAxeEntity} entity - The thrown entity
   * @param {$ItemStack} itemStack - The thrown item
   * @private
   */
  _scheduleItemReturn: function (entity, itemStack) {
    this.server.scheduleInTicks(this.returnDelay, () => {
      if (entity.isAlive()) {
        entity.kill();
        this.player.give(itemStack);
      }
    });
  },

  /**
   * @private Used by throwWeapon only.
   * @author M1hono
   * @description Processes the next slot for throwing
   * @param {number} slot - The current slot
   * @param {number} direction - The direction to move in the inventory
   * @private
   */
  _processNextSlot: function (slot, direction) {
    if (this.throwCount < this.maxThrowCount) {
      let nextSlot = slot + direction;
      this.server.scheduleInTicks(this.throwDelay, () =>
        this._throwFromSlot(nextSlot, direction)
      );
    }
  },

  /**
   * @private Used by throwWeapon only.
   * @author M1hono
   * @description Checks if an item is throwable
   * @param {$ItemStack} itemStack - The item to check
   * @returns {boolean} Whether the item is throwable
   * @private
   */
  _isThrowable: function (itemStack) {
    if (this.customThrowableCheck) {
      return this.customThrowableCheck(itemStack);
    }
    if (itemStack.empty) return false;
    if (this.throwableTags.length === 0) return true;
    return this.throwableTags.some((tag) => itemStack.hasTag(tag));
  },

  /**
   * @private Used by throwWeapon only.
   * @author M1hono
   * @description Checks if an item should return after being thrown
   * @param {$ItemStack} itemStack - The thrown item
   * @returns {boolean} Whether the item should return
   * @private
   */
  _shouldReturn: function (itemStack) {
    if (this.customReturnCheck) {
      return this.customReturnCheck(itemStack);
    }
    return itemStack.getMaxDamage() > 1;
  },

  // Customization methods

  /**
   * @public
   * @author M1hono
   * @description Sets the cooldown between throws
   * @default 80
   * @param {number} ticks - Cooldown duration in ticks
   * @returns {WeaponThrower} this instance for chaining
   */
  setCooldown: function (ticks) {
    this.cooldownTicks = ticks;
    return this;
  },

  /**
   * @public
   * @author M1hono
   * @description Sets the speed of the thrown weapon
   * @default 3.5
   * @param {number} speed - Throw speed
   * @returns {WeaponThrower} this instance for chaining
   */
  setThrowSpeed: function (speed) {
    this.throwSpeed = speed;
    return this;
  },

  /**
   * @public
   * @author M1hono
   * @description Sets the inaccuracy of the throw
   * @default 1.0
   * @param {number} inaccuracy - Throw inaccuracy
   * @returns {WeaponThrower} this instance for chaining
   */
  setThrowInaccuracy: function (inaccuracy) {
    this.throwInaccuracy = inaccuracy;
    return this;
  },

  /**
   * @public
   * @author M1hono
   * @description Sets the slowness effect applied to the player after throwing
   * @default 5
   * @param {number} duration - Effect duration in ticks
   * @param {number} amplifier - Effect amplifier
   * @returns {WeaponThrower} this instance for chaining
   */
  setSlownessEffect: function (duration, amplifier) {
    this.slownessDuration = duration;
    this.slownessAmplifier = amplifier;
    return this;
  },

  /**
   * @public
   * @author M1hono
   * @description Sets the maximum number of items that can be thrown in one use
   * @default Infinity
   * @param {number} count - Maximum throw count
   * @returns {WeaponThrower} this instance for chaining
   */
  setMaxThrowCount: function (count) {
    this.maxThrowCount = count;
    return this;
  },

  /**
   * @public
   * @author M1hono
   * @description Sets the randomness in the yaw angle of the throw
   * @default 5
   * @param {number} randomness - Yaw randomness
   * @returns {WeaponThrower} this instance for chaining
   */
  setYawRandomness: function (randomness) {
    this.yawRandomness = randomness;
    return this;
  },

  /**
   * @public
   * @author M1hono
   * @description Sets the randomness in the pitch angle of the throw
   * @default 1
   * @param {number} randomness - Pitch randomness
   * @returns {WeaponThrower} this instance for chaining
   */
  setPitchRandomness: function (randomness) {
    this.pitchRandomness = randomness;
    return this;
  },

  /**
   * @public
   * @author M1hono
   * @description Sets the delay before a thrown item returns to the player
   * @default 70
   * @param {number} ticks - Return delay in ticks
   * @returns {WeaponThrower} this instance for chaining
   */
  setReturnDelay: function (ticks) {
    this.returnDelay = ticks;
    return this;
  },

  /**
   * @public
   * @author M1hono
   * @description Sets the delay between throwing each item
   * @default 5
   * @param {number} ticks - Throw delay in ticks
   * @returns {WeaponThrower} this instance for chaining
   */
  setThrowDelay: function (ticks) {
    this.throwDelay = ticks;
    return this;
  },

  /**
   * @public
   * @author M1hono
   * @description Sets a custom function for calculating throw damage
   * @default null
   * @param {Function} func - Custom damage calculation function
   * @returns {WeaponThrower} this instance for chaining
   * @example
   * // Example custom damage calculation function
   * .setCustomDamageCalculation((player, itemStack) => {
   *   return getItemAttackDamageFromTooltip(player, itemStack) * 1.5;
   * })
   */
  setCustomDamageCalculation: function (func) {
    this.customDamageCalculation = func;
    return this;
  },

  /**
   * @public
   * @author M1hono
   * @description Sets a custom function for calculating the throw position offset
   * @default null
   * @param {Function} func - Custom position offset function
   * @returns {WeaponThrower} this instance for chaining
   * @example
   * // Example custom position offset function
   * .setCustomPositionOffset((player, lookAngle) => {
   *    return {
   *       x: lookAngle.x * 1.5,
   *       y: lookAngle.y * 1.5 + player.getEyeHeight(),
   *       z: lookAngle.z * 1.5
   *   };
   */
  setCustomPositionOffset: function (func) {
    this.customPositionOffset = func;
    return this;
  },

  /**
   * @public
   * @author M1hono
   * @description Sets a custom function for playing the throw sound
   * @default null
   * @param {Function} func - Custom sound effect function
   * @returns {WeaponThrower} this instance for chaining
   * @example
   * // Example custom sound effect function
   * .setCustomSoundEffect((level, entity) => {
   *    level.playSound(null, entity.getX(), entity.getY(), entity.getZ(), $SoundEvents.ARROW_SHOOT, $SoundSource.PLAYERS, 1.0, 0.5);
   * })
   */
  setCustomSoundEffect: function (func) {
    this.customSoundEffect = func;
    return this;
  },

  /**
   * @public
   * @author M1hono
   * @description Sets whether thrown items should glow
   * @default false
   * @param {boolean} shouldGlow - Whether items should glow
   * @returns {WeaponThrower} this instance for chaining
   * @example
   */
  setGlowing: function (shouldGlow) {
    this.shouldGlow = shouldGlow;
    return this;
  },

  /**
   * @public
   * @author M1hono
   * @description Sets a custom function for checking if an item is throwable
   * @default null
   * @param {Function} func - Custom throwable check function
   * @returns {WeaponThrower} this instance for chaining
   * @example
   * // Example custom throwable check function
   * .setCustomThrowableCheck((itemStack) => {
   *  return !itemStack.empty && (itemStack.hasTag('minecraft:axes') || itemStack.getId().startsWith('minecraft:axe'));
   * })
   */
  setCustomThrowableCheck: function (func) {
    this.customThrowableCheck = func;
    return this;
  },

  /**
   * @public
   * @author M1hono
   * @description Sets a custom function for checking if an item should return after being thrown
   * @default null
   * @param {Function} func - Custom return check function
   * @returns {WeaponThrower} this instance for chaining
   * @example
   * // Example custom return check function
   * .setCustomReturnCheck((itemStack) => {
   *   return itemStack.getId() === 'minecraft:diamond_axe' || itemStack.getId() === 'minecraft:netherite_axe';
   * })
   */
  setCustomReturnCheck: function (func) {
    this.customReturnCheck = func;
    return this;
  },

  /**
   * @public
   * @author M1hono
   * @description Sets the tags that determine which items are throwable
   * @default [] // empty array means all items are throwable
   * @param {string|string[]} tags - Tag or array of tags
   * @returns {WeaponThrower} this instance for chaining
   */
  setThrowableTags: function (tags) {
    if (Array.isArray(tags)) {
      this.throwableTags = tags;
    } else {
      this.throwableTags = [tags];
    }
    return this;
  },

  /**
   * @public
   * @author M1hono
   * @description Sets whether to throw items in reverse order (from end to start of inventory)
   * @default false
   * @param {boolean} reverse - Whether to throw in reverse
   * @returns {WeaponThrower} this instance for chaining
   */
  setThrowReverse: function (reverse) {
    this.throwReverse = reverse;
    return this;
  },

  /**
   * @public
   * @author M1hono
   * @description Sets the starting slot for throwing items
   * @default 0
   * @param {number} slot - Starting slot index
   * @returns {WeaponThrower} this instance for chaining
   */
  setStartSlot: function (slot) {
    if (slot < 0) {
      this.startSlot = 0;
    } else if (slot >= this.player.inventory.containerSize) {
      this.startSlot = this.player.inventory.containerSize - 1;
    } else {
      this.startSlot = slot;
    }
    return this;
  },
};