// priority: 99
import { $Stages } from "packages/dev/latvian/mods/kubejs/stages/$Stages";
import { $MinecraftServer } from "packages/net/minecraft/server/$MinecraftServer";
import { $DamageSource } from "packages/net/minecraft/world/damagesource/$DamageSource";
import { $LivingEntity } from "packages/net/minecraft/world/entity/$LivingEntity";
const { $Player } = require("packages/net/minecraft/world/entity/player/$Player");
const { handleDiceRoll } = require("../../../GlobalImports");
const { getSkillLevel } = require("../../../API/Pmmo");
/**
 * @author M1hono
 * @description Deal with events when player deal damage to other entities.
 * @param {$Player} entity 
 * @param {$LivingEntity} target 
 * @param {float} amount 
 * @param {$DamageSource} source 
 */
export function playerDamage(entity , target , amount , source) {
    if (entity instanceof $Player) {
        const {
            stages,
            block,
            server
        } = entity
        initDice(entity)
        if (!stages.has("attack")) {
            switch (source.getType()) {
                case "player":
                    stages.add("attack")
                    handleDiceRoll(entity, 'attack', 20)
                    removeStage( server , stages )
                    break;
                case "arrow":
                    stages.add("attack")
                    dex = getSkillLevel("dexterity" , entity)
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