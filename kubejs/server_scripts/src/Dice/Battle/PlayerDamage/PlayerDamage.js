// priority: 99
import { $MinecraftServer } from "packages/net/minecraft/server/$MinecraftServer";
import { $DamageSource } from "packages/net/minecraft/world/damagesource/$DamageSource";
import { $LivingEntity } from "packages/net/minecraft/world/entity/$LivingEntity";
import { $Player } from "packages/net/minecraft/world/entity/player/$Player";
import { getSkillLevel } from "../../../API/Pmmo";
import { handleDiceRoll } from "../../../GlobalImports";
import { getOrSource } from "../../../API/Utils";
/**
 * @author M1hono
 * @description Deal with events when player deal damage to other entities.
 * @param {$Player} entity entity that deal damage
 * @param {$LivingEntity} target entity that take damage
 * @param {float} amount damage amount
 * @param {$DamageSource} source damage source
 */
export function playerDamage(entity , target , amount , source) {
    if (entity instanceof $Player) {
        const {
            stages,
            block,
            server
        } = entity
        const {
            immediate: { type }
        } = source
        global.initDice(entity)
        let str = getSkillLevel("strength" , entity)
        let dex = getSkillLevel("dexterity" , entity)
        let originalInvulnerableTime = target.invulnerableTime
        target.invulnerableTime = originalInvulnerableTime
        if (!stages.has("attack")) {
            switch (source.getType()) {
                case "player":
                    stages.add("attack")
                    handleDiceRoll(entity , "attack" , str )
                    target.invulnerableTime = 0
                    target.attack( getOrSource("alexscaves:acid" , entity), amount)
                    removeStage( server , stages)
                    break;
                case "arrow":
                    stages.add("attack")
                    handleDiceRoll(entity , "attack" , dex )
                    removeStage( server , stages)
                    break;
                case "trident":
                    stages.add("attack")
                    if (type == "l2weaponry:throwing_axe") {
                        target.invulnerableTime = 0
                    }
                    handleDiceRoll(entity , "attack" , dex )
                    removeStage( server , stages)
                    break;
            }
        }
        
    }
}
/**
 * @author M1hono
 * @description Using stages to control the frequency of diceRoll.
 * @param {$MinecraftServer} server
 * @param {$Stages_} stages
 */
function removeStage(server , stages , originalInvulnerableTime , target) {
    server.scheduleInTicks(1, () => {
        stages.remove("attack")
    })
}