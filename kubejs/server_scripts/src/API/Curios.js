// priority: 150
const { $Player } = require("packages/net/minecraft/world/entity/player/$Player");
const { $Slot } = require("packages/net/minecraft/world/inventory/$Slot");
const { $Item } = require("packages/net/minecraft/world/item/$Item");
/**
 * @author https://kjscndev.flarum.cloud/d/21-guan-yu-curiosde-yi-xie-mo-gai-xiang-fa
 * @description return the item list of the corresponding slot.
 * @param {$Player_} player 
 * @param {$Slot_} slot
 * @returns {$Item: [{}]}
 */
export function getCuriosItemList(player,slot){
    let curio = player.nbt.ForgeCaps['curios:inventory']["Curios"].find(function(curio) {
		return curio["Identifier"] === slot
	})
    return curio ? curio.StacksHandler.Stacks.Items : []
}
/**
 * @author https://kjscndev.flarum.cloud/d/21-guan-yu-curiosde-yi-xie-mo-gai-xiang-fa
 * @description Return whether the item is in the player's slot, the number of items
 * the corresponding slot number (the first one in the corresponding slot), and the number of corresponding slots
 * @param {$Player_} player 
 * @param {$Slot_} slot
 * @param {string} id 
 * @returns {{hasItem: boolean, count: number, SlotNum: number, SlotSize: number}}
 */
export function CuriosPlayer(player,slot,id){
	let result = { 
        hasItem: false, 
        count: 0, 
        SlotNum: 0, 
        SlotSize: 0
    };
	
    let ItemList = getCuriosItemList(player,slot)
	result.SlotSize = player.nbt.ForgeCaps['curios:inventory']["Curios"].find(function(curio) {
		return curio["Identifier"] === slot
	}).StacksHandler.Cosmetics.Size
	ItemList.forEach(item => {if (item.id === id) { 
		result.hasItem = true
        result.count += item.Count
        result.SlotNum = item.Slot
	}})
    return result;
}
let $CuriosApi = Java.loadClass("top.theillusivec4.curios.api.CuriosApi")
/**
 * @author https://kjscndev.flarum.cloud/d/21-guan-yu-curiosde-yi-xie-mo-gai-xiang-fa
 * @description Control Curios slots directly.
 * @param {"shrink"|"grow"|"getfor"|"setfor"|"unlock"|"lock"} method 
 * @param {string} slot 
 * @param {Internal.Player} player 
 * @param {Number} amount 
 * @returns 
 */
export function CuriosSlotMethod(method,slot,player,amount){
    switch(method)
    {
        case "shrink":  //Subtract the corresponding numbers of slots for the player
            $CuriosApi.getSlotHelper().shrinkSlotType(slot, amount, player)
            break
        case "grow":  //Add the corresponding numbers of slots for the player
            $CuriosApi.getSlotHelper().growSlotType(slot, amount, player)
            break
        case "getfor":  //Get the amount of slots for the corresponding player
            console.log($CuriosApi.getSlotHelper().getSlotsForType(player, slot))
            return $CuriosApi.getSlotHelper().getSlotsForType(player, slot)
        case "setfor":  //Set the corresponding numbers of slots for the player
            $CuriosApi.getSlotHelper().setSlotsForType(slot, player, amount)
            break
        case "unlock":  //Unlock the corresponding numbers of slots for the player
            $CuriosApi.getSlotHelper().unlockSlotType(slot, player)
            break
        case "lock":   //Lock the corresponding numbers of slots for the player
            $CuriosApi.getSlotHelper().lockSlotType(slot, player)
            break
    }
}
/**
 * @author M1hono
 * @description Check if the player is wearing a specific item.
 * @param {$Player} player 
 * @param {string} itemId 
 * @returns {boolean}
 */
export function isPlayerWearingItem(player, itemId) {
    const curiosInventory = player.nbt.ForgeCaps['curios:inventory']["Curios"]
    return curiosInventory.toString().contains(itemId)
}