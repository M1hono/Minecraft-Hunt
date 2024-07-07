// priority: 99
const { screenshake } = require("./API/Utils")
const { $ItemStack } = require("packages/net/minecraft/world/item/$ItemStack")
const { $Animal } = require("packages/net/minecraft/world/entity/animal/$Animal")
const { $MeleeAttackGoal } = require("packages/net/minecraft/world/entity/ai/goal/$MeleeAttackGoal")
const { $PanicGoal } = require("packages/net/minecraft/world/entity/ai/goal/$PanicGoal")
const { $FloatGoal } = require("packages/net/minecraft/world/entity/ai/goal/$FloatGoal")
const { $WaterAvoidingRandomStrollGoal } = require("packages/net/minecraft/world/entity/ai/goal/$WaterAvoidingRandomStrollGoal")

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
// ItemEvents.rightClicked(event => {
//     const {
//         player,
//         hand,
//         item,
//         level
//     } = event

//     if (item.id === "quark:pickarang") return
//     if (isAxe(item)) {
//         let pickarang = Item.of("quark:pickarang").withNBT({ 
//             "item": item.getHoverName().toString(),
//             "player": player.name.toString()
//         })
//         pickarang.use(level, player, hand)
//     }
// })
// /**
//  * 
//  * @param {$ItemStack} item 
//  * @returns 
//  */
// function isAxe(item) {

//     if (item.hasTag('minecraft:axes')) return true
//     return false
// }
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
const { $Pickarang } = require("packages/org/violetmoon/quark/content/tools/entity/rang/$Pickarang")
const { $ServerPlayer } = require("packages/net/minecraft/server/level/$ServerPlayer")
const { $PickarangModule } = require("packages/org/violetmoon/quark/content/tools/module/$PickarangModule")
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
const { $ThrowingAxeEntity } = require("packages/dev/xkmc/l2weaponry/content/entity/$ThrowingAxeEntity");
const { $AbstractArrow } = require("packages/net/minecraft/world/entity/projectile/$AbstractArrow");
const { $SoundEvents } = require("packages/net/minecraft/sounds/$SoundEvents");
const { $SoundSource } = require("packages/net/minecraft/sounds/$SoundSource");
const { isPlayerWearingItem } = require("./API/Curios")

ItemEvents.rightClicked(event => {
    const {
        hand,
        player,
        level,
        server,
        item
    } = event;
    if (hand != "MAIN_HAND") return
    if (level.isClientSide()) return
    if (item.hasTag('minecraft:axes') === false) return
    let slot = 0
    const cooldownTicks = 80
    if (player.getCooldowns().isOnCooldown($ThrowingAxeEntity)) return

    function throwWeapon() {
        if (slot >= player.inventory.containerSize) return
        /**@type {$ItemStack} */
        let itemStack = player.inventory.getItem(slot)
        if (itemStack.hasTag('minecraft:axes')) {
            player.potionEffects.add("minecraft:slowness", 3, 3)
            let throwedWeapon = new $ThrowingAxeEntity(level, player, itemStack, slot)
            
            let x = player.getX()
            let y = player.getY()
            let z = player.getZ()
            let eyeHeight = player.getEyeHeight()
            let lookAngle = player.getLookAngle().toVector3f()
            
            let offsetX = lookAngle.x * 1.0
            let offsetY = lookAngle.y * 1.0 + eyeHeight
            let offsetZ = lookAngle.z * 1.0
            
            throwedWeapon.setPos(x + offsetX, y + offsetY, z + offsetZ)
            throwedWeapon.setBaseDamage(itemStack.item?.attackDamage)
            let yaw = player.yRotO + (Math.random() - 0.5) * 5
            let pitch = player.xRotO + (Math.random() - 0.5) * 1

            throwedWeapon.shootFromRotation(player, pitch, yaw, 0.0, 2.5, 1.0)
            if (player.getAbilities().instabuild) {
                throwedWeapon.pickup = $AbstractArrow.Pickup.CREATIVE_ONLY
            }
            level.playSound(null, throwedWeapon.getX(), throwedWeapon.getY(), throwedWeapon.getZ(), $SoundEvents.TRIDENT_THROW, $SoundSource.PLAYERS, 1.0, 1.0)
            level.addFreshEntity(throwedWeapon)
            if (!player.getAbilities().instabuild) {
                throwedWeapon.pickup = $AbstractArrow.Pickup.CREATIVE_ONLY
                player.inventory.setStackInSlot(slot, $ItemStack.EMPTY)
                
                server.scheduleInTicks(70, () => {
                    throwedWeapon.kill();
                    let currentDamage = itemStack.getDamageValue();
                    let additionalDamage = itemStack.item?.attackDamage ?? 0
                    let maxDamage = itemStack.getMaxDamage();
                    let newDamageValue = currentDamage + additionalDamage;
                    if (newDamageValue < maxDamage) {
                        itemStack.setDamageValue(newDamageValue);
                        player.give(itemStack);
                    }
                });
                
            }
            player.swing(hand , true)
            slot++
            server.scheduleInTicks(3, throwWeapon)
        } else {
            slot++
            throwWeapon()
        }
    }
    player.getCooldowns().addCooldown($ThrowingAxeEntity, cooldownTicks)
    throwWeapon()
})
PlayerEvents.loggedIn(event => {
    const {
        player
    } = event
    if (isPlayerWearingItem(player, "")) {
        player.modifyAttribute("forge:block_reach", "7f3ee28e-0e5e-4061-b88f-4d4732b24cc6" , - 3.0 , "addition")
    }
})

PlayerEvents.respawned(event => {
    const {
        player
    } = event
    if (isPlayerWearingItem(player, "")) {
        player.modifyAttribute("forge:block_reach", "a78be90c-8ec0-4553-bbd5-8b82bde8df7f" , - 3.0 , "addition")
    }
})