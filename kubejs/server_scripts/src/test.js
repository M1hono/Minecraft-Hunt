// priority: 99
const { $ServerPlayer } = require("packages/net/minecraft/server/level/$ServerPlayer")
const { getUniqueCuriosItems, getCuriosItemList } = require("./API/Curios")
const { screenshake } = require("./API/Utils")
const { PlayerAttributeManager } = require("./Dice/AttributeManager")
const { $ServerLevel } = require("packages/net/minecraft/server/level/$ServerLevel")
const { $MinecraftServer } = require("packages/net/minecraft/server/$MinecraftServer")
LevelEvents.afterExplosion(event => {
    screenshake(event)
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
                player.teleportTo(spawnDimension,defaultSpawnX,defaultSpawnY,defaultSpawnZ,player.yaw,player.pitch)
                player.getCooldowns().addCooldown("respawn", spawnCooldown * 60 * 20)
                return 1
            }
            player.teleportTo(spawnDimension,spawn.x,spawn.y,spawn.z,player.yaw,player.pitch)
            player.getCooldowns().addCooldown("respawn", spawnCooldown * 60 * 20)
            player.tell("§crespawned")
            return 1
        })
    )
})