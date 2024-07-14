
// priority: 145
import { getItemAttackDamageFromTooltip } from "./Battle"
const { $MinecraftServer } = require("packages/net/minecraft/server/$MinecraftServer")
const { $ServerLevel } = require("packages/net/minecraft/server/level/$ServerLevel")
const { $Player } = require("packages/net/minecraft/world/entity/player/$Player")
const { $ItemStack } = require("packages/net/minecraft/world/item/$ItemStack")
const { $ThrowingAxeEntity } = require("packages/dev/xkmc/l2weaponry/content/entity/$ThrowingAxeEntity");
const { $AbstractArrow } = require("packages/net/minecraft/world/entity/projectile/$AbstractArrow");
const { $SoundEvents } = require("packages/net/minecraft/sounds/$SoundEvents");
const { $SoundSource } = require("packages/net/minecraft/sounds/$SoundSource");
/**
 * 
 * @param {integer} slot 
 * @param {$Player} player 
 * @param {$ServerLevel} level 
 * @param {$MinecraftServer} server
 * @example
 * ItemEvents.rightClicked(event => {
    const {
        hand,
        player,
        level,
        server
    } = event;
    if (hand != "MAIN_HAND") return
    if (level.isClientSide()) return
    // if (item.hasTag('minecraft:axes') === false) return
    let slot = 0
    const cooldownTicks = 80
    if (player.getCooldowns().isOnCooldown("axe_use")) return;
    player.getCooldowns().addCooldown("axe_use", cooldownTicks);
    throwWeapon(slot , player , level , server)
})
 */
export function throwWeapon(slot, player, level, server) {
    if (slot >= player.inventory.containerSize) return;

    /**@type {$ItemStack} */
    let itemStack = player.inventory.getItem(slot);
    if (!itemStack.empty) {
        if (player.isCrouching() || !player.isAlive()) {
            return;
        }
        player.potionEffects.add("minecraft:slowness", 5, 3)

        let damage = getItemAttackDamageFromTooltip(player, itemStack);
        let maxDamage = itemStack.getMaxDamage();
        let shouldDestroy = false;

        if (!player.getAbilities().instabuild && maxDamage > 1) {
            let currentDamage = itemStack.getDamageValue();
            let newDamageValue = currentDamage + damage;

            if (newDamageValue >= maxDamage) {
                shouldDestroy = true;
            } else {
                itemStack.setDamageValue(newDamageValue);
            }
        }

        let throwedWeapon = new $ThrowingAxeEntity(level, player, itemStack, slot);

        let x = player.getX();
        let y = player.getY();
        let z = player.getZ();
        let eyeHeight = player.getEyeHeight();
        let lookAngle = player.getLookAngle().toVector3f();

        let offsetX = lookAngle.x * 1.0;
        let offsetY = lookAngle.y * 1.0 + eyeHeight;
        let offsetZ = lookAngle.z * 1.0;

        throwedWeapon.setPos(x + offsetX, y + offsetY, z + offsetZ);
        throwedWeapon.setBaseDamage(damage);

        let yaw = player.yRotO + (Math.random() - 0.5) * 5;
        let pitch = player.xRotO + (Math.random() - 0.5) * 1;

        throwedWeapon.shootFromRotation(player, pitch, yaw, 0.0, 3.5, 1.0);
        throwedWeapon.glowing = true;
        level.playSound(null, throwedWeapon.getX(), throwedWeapon.getY(), throwedWeapon.getZ(), $SoundEvents.TRIDENT_THROW, $SoundSource.PLAYERS, 1.0, 1.0);
        level.addFreshEntity(throwedWeapon);

        if (!player.getAbilities().instabuild) {
            player.inventory.setStackInSlot(slot, $ItemStack.EMPTY);

            if (shouldDestroy) {
                throwedWeapon.kill();
            } else {
                if (maxDamage > 1) {
                    throwedWeapon.pickup = $AbstractArrow.Pickup.ALLOWED;
                    server.scheduleInTicks(70, () => {
                        if (throwedWeapon.isAlive()) {
                            throwedWeapon.kill();
                            player.give(itemStack);
                        }
                    });
                } else {
                    throwedWeapon.pickup = $AbstractArrow.Pickup.ALLOWED;
                }
            }
        } else {
            throwedWeapon.pickup = $AbstractArrow.Pickup.CREATIVE_ONLY;
        }

        if (slot < player.inventory.containerSize - 1) {
            slot++;
            server.scheduleInTicks(5, () => throwWeapon(slot, player, level, server));
        }
    } else {
        if (slot < player.inventory.containerSize - 1) {
            slot++;
            throwWeapon(slot, player, level, server);
        }
    }
}