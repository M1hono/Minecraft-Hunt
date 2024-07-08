import { $ThrowingAxeEntity } from "packages/dev/xkmc/l2weaponry/content/entity/$ThrowingAxeEntity";
/**
 * @author M1hono
 * @description get the enchantments from the throwed item.
 * @param {$ThrowingAxeEntity} immediate - the throwed item.
 * @returns {Array<{id: string, level: number}>} enchantments infomation list.
 * 
 * @example
 * const enchantments = getEnchantments(source.immediate);
 * console.log(enchantments); // [{id: "minecraft:sharpness", level: 5}, ...]
 */
export function getEnchantments(immediate) {
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
 * 
 * @example
 * const hasSharpness = hasEnchantment(source.immediate, "minecraft:sharpness")
 * console.log(hasSharpness) // true or false
 */
export function hasEnchantment(immediate, enchantmentId) {
    const enchantments = getEnchantments(immediate);
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
 * const sharpnessLevel = getEnchantmentLevel(source.immediate, "minecraft:sharpness")
 * console.log(sharpnessLevel) // 5 or null
 */
export function getEnchantmentLevel(immediate, enchantmentId) {
    const enchantments = getEnchantments(immediate)
    for (let i = 0; i < enchantments.length; i++) {
        if (enchantments[i].id === enchantmentId) {
            return enchantments[i].level
        }
    }
    return null
}