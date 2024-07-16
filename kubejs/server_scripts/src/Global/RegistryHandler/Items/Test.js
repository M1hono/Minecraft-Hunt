const { $BiConsumer } = require("packages/java/util/function/$BiConsumer")
const { $Player } = require("packages/net/minecraft/world/entity/player/$Player")
const { $CuriosApi } = require("packages/top/theillusivec4/curios/api/$CuriosApi")
const { $SlotContext } = require("packages/top/theillusivec4/curios/api/$SlotContext")
const { $SlotType } = require("packages/top/theillusivec4/curios/common/slottype/$SlotType")
const { getCuriosItemList } = require("../../../API/Curios")

global.test = (itemstack, level, entity) => {
    if (level.isClientSide()) return itemstack
    /**@type {$Player} */
    let player = entity
    itemstack.damageValue++
    if (itemstack.damageValue >= itemstack.maxDamage) {
        itemstack.shrink(1)
    }
    if (player.player) {
        console.log(getCuriosItemList(player , "ring").length)
        // player.tell(player.level.getBiome(player.blockPosition()))
    }
    entity.addItemCooldown(itemstack , 20)
    return itemstack
}