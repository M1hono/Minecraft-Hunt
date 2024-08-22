// priority: 99
// const { $ServerPlayer } = require("packages/net/minecraft/server/level/$ServerPlayer")
// const { screenshake: Utils.screenshake } = require("./API/Utils")
// const { PlayerAttributeManager: AttributeManager.PlayerAttributeManager } = require("./Dice/AttributeManager")
// const { $CustomGoal } = require("packages/net/liopyu/entityjs/util/ai/$CustomGoal")
// const { $Goal } = require("packages/net/minecraft/world/entity/ai/goal/$Goal")
// const { $EnumSet } = require("packages/java/util/$EnumSet")
// const { $Goal$Flag } = require("packages/net/minecraft/world/entity/ai/goal/$Goal$Flag")
// const { $LivingEntity } = require("packages/net/minecraft/world/entity/$LivingEntity")
// const { $Mob } = require("packages/net/minecraft/world/entity/$Mob")
LevelEvents.afterExplosion(event => {
    Utils.screenshake(event)
})
/**
 * @description Register the command /respawn. Is not used currently.
 */
ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments } = event
    event.register(
        Commands.literal('respawn')
            .executes(ctx => {
                const { source } = ctx
                /**@type {$ServerPlayer} */
                const player = source.getPlayer()
                player.level.getSunAngle()
                const level = player.level
                const defaultSpawnX = level.levelData.getXSpawn()
                const defaultSpawnY = level.levelData.getYSpawn()
                const defaultSpawnZ = level.levelData.getZSpawn()
                const spawnDimension = player.getRespawnDimension().location()
                const spawn = player.getRespawnPosition()
                const spawnCooldown = 5
                if (player.getCooldowns().isOnCooldown("respawn")) {
                    player.tell(`§cYou can only respawn every ${spawnCooldown} minutes.`)
                    return 0
                }
                if (!spawn) {
                    player.teleportTo(spawnDimension, defaultSpawnX, defaultSpawnY, defaultSpawnZ, player.yaw, player.pitch)
                    player.getCooldowns().addCooldown("respawn", spawnCooldown * 60 * 20)
                    return 1
                }
                player.teleportTo(spawnDimension, spawn.x, spawn.y, spawn.z, player.yaw, player.pitch)
                player.getCooldowns().addCooldown("respawn", spawnCooldown * 60 * 20)
                player.tell("§crespawned")
                return 1
            })
    )
})
EntityEvents.spawned(event => {
    /**@type {$LivingEntityKJS_}*/
    const entity = event.getEntity();

    if (!(entity instanceof $LivingEntity)) return; // 新加的一行

    entity.getAttributeTotalValue("minecraft:generic.movement_speed")
})

// new $CustomGoal().setFlags($EnumSet.of($Goal$Flag.MOVE)); <错误标记>: 没有无参数的构造方法

EntityEvents.spawned(event => {
    if (!(event.entity.type == "villager")) return
    /**@type {$Mob} */
    const entity = event.entity
})