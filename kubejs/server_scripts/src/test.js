// priority: 99
const { $CuriosContainer } = require("packages/top/theillusivec4/curios/common/inventory/container/$CuriosContainer")
const { getCuriosItemList } = require("./API/Curios")
const { screenshake , randomUUID, getOrSource } = require("./API/Utils")
const { $CuriosContainerV2 } = require("packages/top/theillusivec4/curios/common/inventory/container/$CuriosContainerV2")
const { $ListTag } = require("packages/net/minecraft/nbt/$ListTag")
const { $CompoundTag } = require("packages/net/minecraft/nbt/$CompoundTag")
const { $Player } = require("packages/net/minecraft/world/entity/player/$Player")
const { getItemAttackDamage } = require("./API/Battle")
const { $InteractionHand } = require("packages/net/minecraft/world/$InteractionHand")
const { $CommandSource } = require("packages/net/minecraft/commands/$CommandSource")
const { $CommandSourceStack } = require("packages/net/minecraft/commands/$CommandSourceStack")
const { $CommandContext } = require("packages/com/mojang/brigadier/context/$CommandContext")
LevelEvents.afterExplosion(event => {
    screenshake(event)
})
PlayerEvents.loggedIn(event => {
    const {
        player
    } = event
    if (isPlayerWearingItem(player, 'l2hostility:ring_of_corrosion')) {
        let blockReachIdentifier = randomUUID()
        player.modifyAttribute("forge:block_reach", blockReachIdentifier , - 3.0 , "addition")
        player.removeAttribute("forge:block_reach", blockReachIdentifier)
        player.tell("You are wearing a ring")
    }
})
PlayerEvents.respawned(event => {
    const {
        player
    } = event
    if (isPlayerWearingItem(player, 'l2hostility:ring_of_corrosion')) {
        let blockReachIdentifier = randomUUID()
        player.modifyAttribute("forge:block_reach", blockReachIdentifier , - 3.0 , "addition")
        player.removeAttribute("forge:block_reach", blockReachIdentifier)
        player.tell("You are wearing a ring")
    }
})
ItemEvents.rightClicked(event => {
    const {
        player,
        level,
        item,
        hand
    } = event
    // if (item.isEmpty() || !item.onEntitySwing(player)) return
    // const target = player.rayTrace(player.getAttributeValue("forge:block_reach")).entity
    // console.log(player.persistentData.getAllKeys())
    // player.getAttribute("generic.max_health")
    // // player.startSleeping(player.blockPosition())
    // /**@type {$ListTag}*/
    // const curiosInventory = player.nbt.ForgeCaps['curios:inventory']["Curios"]
    // const apoliPowers = player.nbt.ForgeCaps['apoli:powers']["Powers"]
    // curiosInventory.forEach(/**@param {$CompoundTag} curio*/curio => {
    //     if (!curio["StacksHandler"]["Stacks"]["Items"].isEmpty()) {
    //         console.log(curio["StacksHandler"]["Stacks"]["Items"][0]["id"])
    //     }
    // })

})
ItemEvents.rightClicked(event => {
    const {
        player,
        hand,
        level
    } = event
    if (hand.toString() == "MAIN_HAND") return
    player.swing(hand , true)
    ++player.attackStrengthTicker
    event.entity.health -= 1
})
ItemEvents.entityInteracted(event => {
    const {
        hand,
        player,
        item,
        target,
        level
    } = event
    if (hand.toString() == "MAIN_HAND") return
    player.swing(hand , true)
    function updateCooldown() {
        player.getCooldowns().removeCooldown(item)
        player.getCooldowns().addCooldown(item, 20)
        item.damageValue++
    }
    if (player.getCooldowns().isOnCooldown(item)) {
        target.attack(getOrSource("minecraft:generic" , player) , getItemAttackDamage(player,item) * 0.5)
        updateCooldown()
        return
    }
    if (player.fallDistance > 0 && !player.onGround()) {
        player.getCooldowns().addCooldown(item , 20)
        level.playSound(null , target.x , target.y , target.z , "entity.player.attack.crit" , "players" , 1.0 , 1.0)
        player.crit(target)
        target.attack(getOrSource("minecraft:generic" , player) , getItemAttackDamage(player,item) * 1.5)
        updateCooldown()
        return
    }
    level.playSound(null , target.x , target.y , target.z , "entity.player.attack.sweep" , "players" , 1.0 , 1.0)
    player.sweepAttack()
    target.attack(getOrSource("minecraft:generic" , player) , getItemAttackDamage(player,item))
    updateCooldown()
})
// MoreJSEvents.villagerTrades(event => {
//     event.removeTrades(/**@param {$TradeFilter} trade*/trade => {
//         trade.match(Item.of("endrem:evil_eye") , Item.of("endrem:evil_eye") , Item.of("endrem:evil_eye") , "itemsandemeraldstoitems")
//     })
// })
PlayerEvents.respawned(event=> {
    const {
        player,
        oldPlayer,
        level
    } = event
    if (level.difficulty == "PEACEFUL") return
    if (oldPlayer.getAttributeBaseValue("generic.max_health") === 1) player.setAttributeBaseValue("generic.max_health" , oldPlayer.getAttributeBaseValue("generic.max_health"))
    player.setAttributeBaseValue("generic.max_health" , oldPlayer.getAttributeBaseValue("generic.max_health") - 1.0)
})
FTBQuestsEvents.completed(event => {
    const {
        object,
        player
    } = event
    if (player === null) return
    if (player.level.isClientSide()) return
    console.log(object.objectType.toString())
    if (ftbHasTag(player , object , "QUEST" , "test")) player.tell("You have completed the test quest")
    if (ftbHasTag(player , object , "TASK" , "test2")) player.tell("You have completed the test task")
})
function ftbHasTag(player , object , type , tag) {
    if (object.objectType.toString() == type) {
        if (!player.stages.has(type+ object.title.getString())) {
            if (object.tags.contains(tag)) {
                player.stages.add(type+ object.title.getString())
                return true
            }
        }
    }
    if (player.stages.has(type + object.title.getString())) {player.stages.remove(type + object.title.getString())}
    return false
}
// FTBQuestsEvents.completed("40E2B9555FC467BA" , event => {
//     const {
//         player
//     } =event
//     player.tell("You have completed the test quest")
// })
ServerEvents.commandRegistry(event => {
    const { commands: Commands } = event;
    event.register(
        Commands.literal("test")
            .executes(/** @param {$CommandContext} ctx */ ctx => {
                /**@type {ServerPLayer_}*/
                const source = ctx.source
                const entity = source.entity
                if (entity) {
                    entity.tell("sth");
                    return 1
                } else {
                    source.sendFailure("No entity found to execute sweepAttack.");
                    return 0
                }
            })
    );
});