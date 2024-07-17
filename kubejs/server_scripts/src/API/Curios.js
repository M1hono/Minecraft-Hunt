// priority: 150
import { $CuriosApi } from "packages/top/theillusivec4/curios/api/$CuriosApi";
const { $Player } = require("packages/net/minecraft/world/entity/player/$Player");
const { $ItemStack } = require("packages/net/minecraft/world/item/$ItemStack");

/**
 * @author M1hono (optimized)
 * @description Get all curio items worn by the player.
 * @param {$Player} player 
 * @returns {$ItemStack[]}
 */
export function getCuriosItemList(player) {
    return $CuriosApi.getCuriosInventory(player).resolve().get().getEquippedCurios().getAllItems();
}

/**
 * @author M1hono (optimized)
 * @description Get information about a specific curio item worn by the player.
 * @param {$Player} player 
 * @param {string} id 
 * @returns {{hasItem: boolean, count: number, slots: number[]}}
 */
export function getCurioInfo(player, id) {
    const curiosItems = getCuriosItemList(player);
    
    let result = { 
        hasItem: false, 
        count: 0,
        slots: []
    };

    curiosItems.forEach((stack, index) => {
        if (!stack.isEmpty() && stack.getId() === id) {
            result.hasItem = true;
            result.count += stack.getCount();
            result.slots.push(index);
        }
    });

    return result;
}

/**
 * @author M1hono
 * @description Get all unique curios items worn by the player.
 * @param {$Player} player 
 * @returns {Array<{id: string, count: number, name: string}>}
 */
export function getUniqueCuriosItems(player) {
    const curiosItems = getCuriosItemList(player);
    const uniqueItems = {};
    
    curiosItems.forEach(stack => {
        if (!stack.isEmpty()) {
            const id = stack.getId();
            if (uniqueItems[id]) {
                uniqueItems[id].count += stack.getCount();
            } else {
                uniqueItems[id] = { 
                    id: id, 
                    count: stack.getCount(),
                    name: stack.getItem().toString()
                };
            }
        }
    });
    
    return Object.values(uniqueItems);
}

/**
 * @author M1hono
 * @description Check if the player is wearing a specific item.
 * @param {$Player} player 
 * @param {string} itemId 
 * @returns {boolean}
 */
export function isPlayerWearingItem(player, itemId) {
    return getCurioInfo(player, itemId).hasItem;
}

/**
 * @author M1hono
 * @description Get the total count of a specific curio item worn by the player.
 * @param {$Player} player 
 * @param {string} itemId 
 * @returns {number}
 */
export function getCurioItemCount(player, itemId) {
    return getCurioInfo(player, itemId).count;
}