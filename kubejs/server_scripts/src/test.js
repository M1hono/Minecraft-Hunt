// priority: 99
const { $UUID } = require("packages/java/util/$UUID")
const { screenshake } = require("./API/Utils")
const { $Level } = require("packages/net/minecraft/world/level/$Level")
const { $ItemEntity } = require("packages/net/minecraft/world/entity/item/$ItemEntity")
const { $ItemStack } = require("packages/net/minecraft/world/item/$ItemStack")
const { $Animal } = require("packages/net/minecraft/world/entity/animal/$Animal")
const { $MeleeAttackGoal } = require("packages/net/minecraft/world/entity/ai/goal/$MeleeAttackGoal")
const { $Goal } = require("packages/net/minecraft/world/entity/ai/goal/$Goal")
const { $PanicGoal } = require("packages/net/minecraft/world/entity/ai/goal/$PanicGoal")
const { $FloatGoal } = require("packages/net/minecraft/world/entity/ai/goal/$FloatGoal")
const { $WaterAvoidingRandomStrollGoal } = require("packages/net/minecraft/world/entity/ai/goal/$WaterAvoidingRandomStrollGoal")
const { $Quark } = require("packages/org/violetmoon/quark/base/$Quark")
const { $AbstractPickarang } = require("packages/org/violetmoon/quark/content/tools/entity/rang/$AbstractPickarang")
const { $Pickarang } = require("packages/org/violetmoon/quark/content/tools/entity/rang/$Pickarang")
const { $EntityType } = require("packages/net/minecraft/world/entity/$EntityType")
const { $Inventory } = require("packages/net/minecraft/world/entity/player/$Inventory")
const { $ServerPlayer } = require("packages/net/minecraft/server/level/$ServerPlayer")
const { $PickarangModule } = require("packages/org/violetmoon/quark/content/tools/module/$PickarangModule")

LevelEvents.afterExplosion(event => {
    screenshake(event)
})
EntityEvents.death(event => {
    const {
        entity,
        entity : { x, y, z , block },
        level
    } = event
    if (entity.type === "minecraft:zombie") {
        console.log("Zombie")
        let item = block.createEntity("item")
        item.item = Item.of("minecraft:diamond",1)
        item.setPos(x, y+1, z)
        item.setNoGravity(true)
        item.addMotion(0,0.1,0)
        entity.entityType.is("pmmo:tamable")
        item.spawn()
    }
})
ItemEvents.rightClicked(event => {
    const {
        player,
        hand,
        item,
        level
    } = event

    if (item.id === "quark:pickarang") return
    if (isAxe(item)) {
        let pickarang = Item.of("quark:pickarang").withNBT({ 
            "item": item.getHoverName().toString(),
            "player": player.name.toString()
        })
        pickarang.use(level, player, hand)
    }
})
/**
 * 
 * @param {$ItemStack} item 
 * @returns 
 */
function isAxe(item) {

    if (item.hasTag('minecraft:axes')) return true
    return false
}
EntityEvents.hurt(event => {
    const {
        entity: target,
        source: { actual: attacker }
    } = event
    if (!(attacker instanceof $Player)) return
    if (target instanceof $Animal) {
        let originalPanicGoal
        target.goalSelector.getAvailableGoals()
            .forEach(goal => {
               if (goal instanceof $PanicGoal) {
                    originalPanicGoal = goal
               }
            })
        let originalGoals = []
        target.goalSelector.getAvailableGoals().forEach(goal => {
            if (!(goal instanceof $PanicGoal)) {
                originalGoals.push([goal.getPriority(), goal.getGoal()])
            }
        })
        target.goalSelector.removeAllGoals(goal => 
            goal instanceof $PanicGoal || 
            goal instanceof $FloatGoal || 
            goal instanceof $WaterAvoidingRandomStrollGoal
        )
        target.setTarget(attacker)
        target.goalSelector.addGoal(1, new $MeleeAttackGoal(target, 1.0, true))
        target.server.scheduleInTicks(200, () => {
            target.setTarget(null)
            originalGoals.forEach(([priority, goal]) => {
                target.goalSelector.addGoal(priority, goal)
            })
        })
    }
})
// ItemEvents.rightClicked(event => {
//     const {
//         server,
//         player : { name }
//     } = event
//     $Locate
// })
// let $AsyncLocator = Java.loadClass('brightspark.asynclocator.AsyncLocator')
let $StructureTags = Java.loadClass('net.minecraft.tags.BiomeTags')
// ItemEvents.rightClicked(event => {
//     if (event.item.id.toString().includes('endrem:')) {
//         if (!event.player.data.ftbquests.isCompleted("6A72CB008C10DA05")) {
//             event.cancel()
//             event.player.tell("You haven't got access to the end! Collect all 12 eyes by yourself before locating stronghold!")
//         } else {
//             $AsyncLocator.locate(event.level, $StructureTags.EYE_OF_ENDER_LOCATED, event.player.blockPosition(), 100, false)
//                 .thenOnServerThread(pos => {
//                     if (pos != null) {
//                         let dist = Math.sqrt(pos.distSqr(event.player.blockPosition()))
//                         let msg = `Distance to stonghold is `
//                         if (dist < 1000) {
//                             msg += `< 1000 blocks.`
//                         } else {
//                             msg += `> ${Math.floor(dist / 1000) * 1000} blocks.`
//                         }
//                         event.server.runCommandSilent(`title ${event.player.username} actionbar "${msg}"`)
//                     }
//                 })
//         }
//     }
// })
ItemEvents.rightClicked(event => {
    const { hand, player, level} = event
    if (hand !== "MAIN_HAND") return
    if (level.isClientSide()) return

    const inventory = new $Inventory(player)
    const containerSize = inventory.containerSize
    const entityType = $EntityType.byString("quark:pickarang")

    for (let slot = 0; slot < containerSize; slot++) {
        const itemStack = inventory.getItem(slot)
        if (!itemStack.isEmpty() && itemStack.hasTag('minecraft:axes')) {
            const pickarang = new $Pickarang(entityType, level, player)
            pickarang.setOwner(player)
            const offsetX = (Math.random() - 0.5) * 0.5
            const offsetY = Math.random() * 0.5
            const offsetZ = (Math.random() - 0.5) * 0.5
            pickarang.setPos(player.x + offsetX, player.y + player.getEyeHeight() + offsetY, player.z + offsetZ)
            const yaw = player.yRot + (Math.random() - 0.5) * 60
            const pitch = player.xRot + (Math.random() - 0.5) * 60
            pickarang.shoot(player, pitch, yaw, 0.0, 1.5 + Math.random(), 0.0)
            pickarang.setThrowData(slot, itemStack)
            level.addFreshEntity(pickarang)
            inventory.setItem(slot, $ItemStack.EMPTY)
            player.block.blockState.isSolidRender
        }
    }
    if (player instanceof $ServerPlayer) {
        $PickarangModule.throwPickarangTrigger.trigger(player)
    }
    level.playSound(null, player.x, player.y, player.z, $SoundEvents.ITEM_PICKUP, $SoundSource.PLAYERS, 0.5, 0.4 / (Math.random() * 0.4 + 0.8))
})