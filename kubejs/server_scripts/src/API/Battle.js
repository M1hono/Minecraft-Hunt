// priority: 150
import { $ThrowingAxeEntity } from "packages/dev/xkmc/l2weaponry/content/entity/$ThrowingAxeEntity";
/**
 * @author M1hono
 * @description get the enchantments from the throwed item.
 * @param {$ThrowingAxeEntity} immediate - the throwed item.
 * @returns {Array<{id: string, level: number}>} enchantments infomation list.
 * @example
 * const enchantments = getThrowingEnchantments(source.immediate);
 * console.log(enchantments); // [{id: "minecraft:sharpness", level: 5}, ...]
 */
export function getThrowingEnchantments(immediate) {
    const enchantments = []
    if (immediate && immediate.nbt) {
        const item = immediate.nbt.get("Item")
        if (item) {
            const tag = item.getCompound("tag")
            if (tag.contains("Enchantments")) {
                const enchantList = tag.getList("Enchantments", 10)
                for (let i = 0; i < enchantList.size(); i++) {
                    const enchant = enchantList.getCompound(i)
                    enchantments.push({
                        id: enchant.getString("id"),
                        level: enchant.getShort("lvl")
                    });
                }
            }
        }
    }
    return enchantments
}
/**
 * check if the throwed item has the specified enchantment.
 * 
 * @param {$ThrowingAxeEntity} immediate - the throwed item.
 * @param {string} enchantmentId - the enchantment id.
 * @returns {boolean} if the throwed item has the specified enchantment.
 * @example
 * const hasSharpness = hasThrowingEnchantment(source.immediate, "minecraft:sharpness")
 * console.log(hasSharpness) // true or false
 */
export function hasThrowingEnchantment(immediate, enchantmentId) {
    const enchantments = getThrowingEnchantments(immediate);
    for (let i = 0; i < enchantments.length; i++) {
        if (enchantments[i].id === enchantmentId) {
            return true
        }
    }
    return false
}
/**
 * @description get the level of the specified enchantment from the throwed item.
 * @param {$ThrowingAxeEntity} immediate - the throwed item.
 * @param {string} enchantmentId  - enchantment id
 * @returns {number|null} enchantment level or null
 * @example
 * const sharpnessLevel = getThrowingEnchantmentLevel(source.immediate, "minecraft:sharpness")
 * console.log(sharpnessLevel) // 5 or null
 */
export function getThrowingEnchantmentLevel(immediate, enchantmentId) {
    const enchantments = getThrowingEnchantments(immediate)
    for (let i = 0; i < enchantments.length; i++) {
        if (enchantments[i].id === enchantmentId) {
            return enchantments[i].level
        }
    }
    return null
}
import { $TooltipFlag } from "packages/net/minecraft/world/item/$TooltipFlag";
/**
 * @author M1hono
 * @description get the attack damage from item's tooltip.
 * @param {$Player} player 
 * @param {$ItemStack} itemStack 
 * @returns {float} attack damage
 */
export function getItemAttackDamageFromTooltip(player, itemStack) {
    const tooltips = itemStack.getTooltipLines(player, $TooltipFlag.NORMAL)
    for (let i = 0; i < tooltips.size(); i++) {
        let component = tooltips.get(i)
        let siblings = component.getSiblings()
        for (let j = 0; j < siblings.size(); j++) {
            let sibling = siblings.get(j)
            if (sibling.toString().contains("attack_damage")) {
                let attackDamage = parseFloat(tooltips.get(i).toFlatList().get(1).getString())
                return attackDamage
            }
        }
    }
    return 1.0
}
import { $ServerPlayer } from "packages/net/minecraft/server/level/$ServerPlayer";
import { $EquipmentSlot } from "packages/net/minecraft/world/entity/$EquipmentSlot";
import { $MobType } from "packages/net/minecraft/world/entity/$MobType";
import { $Player } from "packages/net/minecraft/world/entity/player/$Player";
import { $Item } from "packages/net/minecraft/world/item/$Item";
import { $ItemStack } from "packages/net/minecraft/world/item/$ItemStack";
import { $EnchantmentHelper } from "packages/net/minecraft/world/item/enchantment/$EnchantmentHelper";
/**
 * @author M1hono
 * @description get the attack damage from the item.
 * @param {$Player} player 
 * @param {$ItemStack} itemStack 
 * @returns 
 */
export function getItemAttackDamage(player , itemStack){
    const {
        server,
        level,
    } = player
    const fakeplayer = new $ServerPlayer(server , level , player.getGameProfile())
    fakeplayer.mainHandItem = itemStack
    const fakeItem = fakeplayer.mainHandItem
    if (fakeItem.getAttributeModifiers($EquipmentSlot.MAINHAND).entries().isEmpty()) {
        return 1.0
    }
    const attibutes = fakeItem.getAttributeModifiers($EquipmentSlot.MAINHAND).entries().iterator().next().getValue()
    let attackDamage = attibutes.getAmount()
    if (attibutes.getId() == $Item.BASE_ATTACK_DAMAGE_UUID) {
        attackDamage += player.getAttributeBaseValue("generic.attack_damage")
        attackDamage += $EnchantmentHelper.getDamageBonus(itemStack, $MobType.UNDEFINED)
    }
    return attackDamage
}