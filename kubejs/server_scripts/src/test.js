// priority: 99
const { screenshake, structureLocator,  biomeLocator, randomUUID } = require("./API/Utils")

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
        item.spawn()
    }
})
// const { $Player } = require("packages/net/minecraft/world/entity/player/$Player")
// const { $Animal } = require("packages/net/minecraft/world/entity/animal/$Animal")
// const { $MeleeAttackGoal } = require("packages/net/minecraft/world/entity/ai/goal/$MeleeAttackGoal")
// const { $PanicGoal } = require("packages/net/minecraft/world/entity/ai/goal/$PanicGoal")
// EntityEvents.hurt(event => {
//     const {
//         entity: target,
//         source: { actual: attacker }
//     } = event
//     if (!(attacker instanceof $Player)) return
//     if (target instanceof $Animal) {
//         let originalGoals = []
//         target.goalSelector.getAvailableGoals().forEach(goal => {
//             if (!(goal instanceof $PanicGoal)) {
//                 originalGoals.push([goal.getPriority(), goal.getGoal()])
//             }
//         })
//         target.goalSelector.removeAllGoals(goal => 
//             goal instanceof $PanicGoal
//         )
//         target.setTarget(attacker)
//         target.goalSelector.addGoal(1, new $MeleeAttackGoal(target, 1.0, true))
//         target.server.scheduleInTicks(200, () => {
//             target.setTarget(null)
//             originalGoals.forEach(([priority, goal]) => {
//                 target.goalSelector.addGoal(priority, goal)
//             })
//         })
//     }
// })
// ItemEvents.rightClicked(event => {
//     const {
//         server,
//         player : { name }
//     } = event
//     $Locate
// })
const { $Pickarang } = require("packages/org/violetmoon/quark/content/tools/entity/rang/$Pickarang")
const { $ServerPlayer } = require("packages/net/minecraft/server/level/$ServerPlayer")
const { $PickarangModule } = require("packages/org/violetmoon/quark/content/tools/module/$PickarangModule")
const { $Enchantment } = require("packages/net/minecraft/world/item/enchantment/$Enchantment")
const { $AttributeModifier } = require("packages/net/minecraft/world/entity/ai/attributes/$AttributeModifier")
const { $Item } = require("packages/net/minecraft/world/item/$Item")
const { $EquipmentSlot } = require("packages/net/minecraft/world/entity/$EquipmentSlot")
const { $EnchantmentHelper } = require("packages/net/minecraft/world/item/enchantment/$EnchantmentHelper")
const { $MobType } = require("packages/net/minecraft/world/entity/$MobType")
const { $Player } = require("packages/net/minecraft/world/entity/player/$Player")
const { getItemAttackDamage } = require("./API/Battle")
// ItemEvents.rightClicked(event => {
//     const {
//         hand,
//         player,
//         player: { inventory , x , y , z , eyeHeight},
//         player: { inventory : { containerSize } },
//         level,
//         server
//     } = event
//     if (hand != "MAIN_HAND") return
//     if (level.isClientSide()) return
//     let slot = 0
//     function throwPickarang() {
//         if (slot >= containerSize) return
//         /**@type {$ItemStack} */
//         let itemStack = inventory.getItem(slot)
//         if (itemStack.hasTag('minecraft:axes')) {
//             let pickarang = new $Pickarang("quark:pickarang", level, player)
//             let offsetX = (Math.random() - 0.5) * 5
//             let offsetY = Math.random() * 0.5
//             let offsetZ = (Math.random() - 0.5) * 5
//             pickarang.setPos(x + offsetX, y + eyeHeight + offsetY, z + offsetZ)
//             pickarang.setThrowData(slot, itemStack)
//             pickarang.setOwner(player)
//             let yaw = player.yRotO + (Math.random() - 0.5) * 20
//             let pitch = player.xRotO + (Math.random() - 0.5) * 10
//             pickarang.shoot(player, pitch, yaw, 0.0, 2.5, 0.0)
//             level.addFreshEntity(pickarang)
//             inventory.setStackInSlot(slot, $ItemStack.EMPTY)
//             if (player instanceof $ServerPlayer) {
//                 $PickarangModule.throwPickarangTrigger.trigger(player)
//             }
//         }
//         slot++
//         server.scheduleInTicks(6, throwPickarang)
//     }
//     throwPickarang()
// })

ItemEvents.rightClicked(event => {
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
// ItemEvents.rightClicked(event => {
//     const {
//         hand,
//         player,
//         item
//     } = event
//     if (hand != "MAIN_HAND") return
//     console.log(getItemAttackDamage(player, item))
// })