// priority: 99
import { $Stages } from "packages/dev/latvian/mods/kubejs/stages/$Stages";
import { $MinecraftServer } from "packages/net/minecraft/server/$MinecraftServer";
import { $DamageSource } from "packages/net/minecraft/world/damagesource/$DamageSource";
import { $LivingEntity } from "packages/net/minecraft/world/entity/$LivingEntity";
import { $Player } from "packages/net/minecraft/world/entity/player/$Player";
const { handleDiceRoll } = require("../../../GlobalImports");
const { getSkillLevel } = require("../../../API/Pmmo");
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
        global.initDice(entity)
        // console.log(entity)
        // console.log(target)
        // console.log(amount)
        // console.log(source.immediate.nbt)
        if (!stages.has("attack")) {
            switch (source.getType()) {
                case "player":
                    stages.add("attack")
                    let str = getSkillLevel("strength" , entity)
                    handleDiceRoll(entity , "attack" , str )
                    removeStage( server , stages )
                    break;
                case "arrow":
                    stages.add("attack")
                    let dex = getSkillLevel("dexterity" , entity)
                    handleDiceRoll(entity , "attack" , dex )
                    removeStage( server , stages )
                    break;
            }
        }
        
    }
}
/**
 * @author M1hono
 * @description Using stages to control the frequency of diceRoll.
 * @param {$MinecraftServer} server
 * @param {$Stages} stages
 */
function removeStage(server , stages) {
    server.scheduleInTicks(1, () => {
        stages.remove("attack")
    })
}