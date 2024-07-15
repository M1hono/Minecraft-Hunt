// priority: 145
import { $Player } from "packages/net/minecraft/world/entity/player/$Player";
import { getItemAttackDamageFromTooltip } from "./Battle"
import { $Level } from "packages/net/minecraft/world/level/$Level";
const { $ItemStack } = require("packages/net/minecraft/world/item/$ItemStack")
const { $ThrowingAxeEntity } = require("packages/dev/xkmc/l2weaponry/content/entity/$ThrowingAxeEntity");
const { $AbstractArrow } = require("packages/net/minecraft/world/entity/projectile/$AbstractArrow");
const { $SoundEvents } = require("packages/net/minecraft/sounds/$SoundEvents");
const { $SoundSource } = require("packages/net/minecraft/sounds/$SoundSource");

/**
 * @public
 * @author M1hono
 * @description A class that helps to throw weapons with high customization.
 * @param {$Player} player
 * @param {$Level} level
 * @param {$MinecraftServer_} server
 * @example
 * ItemEvents.rightClicked(event => {
    const { hand, player, level, server } = event;
    if (hand != "MAIN_HAND" || level.isClientSide()) return;
    
    const thrower = new WeaponThrower(player, level, server)
        .setMaxThrowCount(5)
        .setThrowSpeed(4.0)
        .setYawRandomness(10)
        .setPitchRandomness(2)
        .setGlowing(false)
        .setThrowableTags('minecraft:axes', 'forge:tools/axes')
        .setCustomThrowableCheck((itemStack) => {
            return !itemStack.empty && (itemStack.hasTag('minecraft:axes') || itemStack.getId().startsWith('minecraft:axe'));
        })
        .setCustomReturnCheck((itemStack) => {
            // 自定义返回逻辑，例如只有钻石和下界合金斧才返回
            return itemStack.getId() === 'minecraft:diamond_axe' || itemStack.getId() === 'minecraft:netherite_axe';
        })
        .setCustomDamageCalculation((player, itemStack) => {
            return getItemAttackDamageFromTooltip(player, itemStack) * 1.5;
        })
        .setCustomPositionOffset((player, lookAngle) => {
            return {
                x: lookAngle.x * 1.5,
                y: lookAngle.y * 1.5 + player.getEyeHeight(),
                z: lookAngle.z * 1.5
            };
        })
        .setCustomSoundEffect((level, entity) => {
            level.playSound(null, entity.getX(), entity.getY(), entity.getZ(), $SoundEvents.ARROW_SHOOT, $SoundSource.PLAYERS, 1.0, 0.5);
        });
    
    if (player.getCooldowns().isOnCooldown("axe_use")) return;
    player.getCooldowns().addCooldown("axe_use", thrower.cooldownTicks);
    
    thrower.throwWeapon(0);
});
 */
export function WeaponThrower(player, level, server) {
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
    this.shouldGlow = true;
    this.customThrowableCheck = null;
    this.customReturnCheck = null;
    this.throwableTags = [];
}
WeaponThrower.prototype = {
    throwWeapon: function(startSlot) {
        this.throwCount = 0;
        this._throwFromSlot(startSlot);
    },

    _throwFromSlot: function(slot) {
        if (slot >= this.player.inventory.containerSize || this.throwCount >= this.maxThrowCount) return;

        let itemStack = this.player.inventory.getItem(slot);
        if (this._isThrowable(itemStack)) {
            this._handleWeaponThrow(itemStack, slot);
            this.throwCount++;
        }
        this._processNextSlot(slot);
    },

    _handleWeaponThrow: function(itemStack, slot) {
        if (this.player.isCrouching() || !this.player.isAlive()) return;

        this.player.potionEffects.add("minecraft:slowness", this.slownessDuration, this.slownessAmplifier);

        let damage = this._getItemDamage(itemStack);
        let shouldDestroy = this._applyDamageToItem(itemStack, damage);

        let throwedWeapon = this._createThrowingEntity(itemStack, slot, damage);
        this._setEntityPosition(throwedWeapon);
        this._shootEntity(throwedWeapon);

        this._playThrowSound(throwedWeapon);
        this.level.addFreshEntity(throwedWeapon);

        this._handleInventoryAndPickup(itemStack, slot, throwedWeapon, shouldDestroy);
    },

    _getItemDamage: function(itemStack) {
        if (this.customDamageCalculation) {
            return this.customDamageCalculation(this.player, itemStack);
        }
        return getItemAttackDamageFromTooltip(this.player, itemStack);
    },

    _applyDamageToItem: function(itemStack, damage) {
        if (this.player.getAbilities().instabuild || itemStack.getMaxDamage() <= 1) return false;

        let currentDamage = itemStack.getDamageValue();
        let newDamageValue = currentDamage + damage;

        if (newDamageValue >= itemStack.getMaxDamage()) {
            return true;
        } else {
            itemStack.setDamageValue(newDamageValue);
            return false;
        }
    },

    _createThrowingEntity: function(itemStack, slot, damage) {
        let entity = new $ThrowingAxeEntity(this.level, this.player, itemStack, slot);
        entity.setBaseDamage(damage);
        entity.glowing = this.shouldGlow;
        return entity;
    },

    _setEntityPosition: function(entity) {
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

    _shootEntity: function(entity) {
        let yaw = this.player.yRotO + (Math.random() - 0.5) * this.yawRandomness;
        let pitch = this.player.xRotO + (Math.random() - 0.5) * this.pitchRandomness;

        entity.shootFromRotation(this.player, pitch, yaw, 0.0, this.throwSpeed, this.throwInaccuracy);
    },

    _playThrowSound: function(entity) {
        if (this.customSoundEffect) {
            this.customSoundEffect(this.level, entity);
        } else {
            this.level.playSound(null, entity.getX(), entity.getY(), entity.getZ(), $SoundEvents.TRIDENT_THROW, $SoundSource.PLAYERS, 1.0, 1.0);
        }
    },

    _handleInventoryAndPickup: function(itemStack, slot, entity, shouldDestroy) {
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

    _scheduleItemReturn: function(entity, itemStack) {
        this.server.scheduleInTicks(this.returnDelay, () => {
            if (entity.isAlive()) {
                entity.kill();
                this.player.give(itemStack);
            }
        });
    },

    _processNextSlot: function(slot) {
        if (slot < this.player.inventory.containerSize - 1 && this.throwCount < this.maxThrowCount) {
            slot++;
            this.server.scheduleInTicks(this.throwDelay, () => this._throwFromSlot(slot));
        }
    },

    _isThrowable: function(itemStack) {
        if (this.customThrowableCheck) {
            return this.customThrowableCheck(itemStack);
        }
        if (itemStack.empty) return false;
        if (this.throwableTags.length === 0) return true;
        return this.throwableTags.some(tag => itemStack.hasTag(tag));
    },

    _shouldReturn: function(itemStack) {
        if (this.customReturnCheck) {
            return this.customReturnCheck(itemStack);
        }
        return itemStack.getMaxDamage() > 1;
    },

    setCooldown: function(ticks) { this.cooldownTicks = ticks; return this; },
    setThrowSpeed: function(speed) { this.throwSpeed = speed; return this; },
    setThrowInaccuracy: function(inaccuracy) { this.throwInaccuracy = inaccuracy; return this; },
    setSlownessEffect: function(duration, amplifier) { 
        this.slownessDuration = duration; 
        this.slownessAmplifier = amplifier; 
        return this; 
    },
    setMaxThrowCount: function(count) { this.maxThrowCount = count; return this; },
    setYawRandomness: function(randomness) { this.yawRandomness = randomness; return this; },
    setPitchRandomness: function(randomness) { this.pitchRandomness = randomness; return this; },
    setReturnDelay: function(ticks) { this.returnDelay = ticks; return this; },
    setThrowDelay: function(ticks) { this.throwDelay = ticks; return this; },
    setCustomDamageCalculation: function(func) { this.customDamageCalculation = func; return this; },
    setCustomPositionOffset: function(func) { this.customPositionOffset = func; return this; },
    setCustomSoundEffect: function(func) { this.customSoundEffect = func; return this; },
    setGlowing: function(shouldGlow) { this.shouldGlow = shouldGlow; return this; },
    setCustomThrowableCheck: function(func) { this.customThrowableCheck = func; return this; },
    setCustomReturnCheck: function(func) { this.customReturnCheck = func; return this; },
    setThrowableTags: function(...tags) { this.throwableTags = tags; return this; }
}