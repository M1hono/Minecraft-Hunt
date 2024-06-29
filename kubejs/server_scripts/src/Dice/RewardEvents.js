// priority: 100
import { $Block } from "packages/net/minecraft/world/level/block/$Block";
import { setLevelWithoutReroll, setLevelWithReroll } from "../API/l2Hostility";
import { $Player } from "packages/net/minecraft/world/entity/player/$Player";
import { $ServerLevel } from "packages/net/minecraft/server/level/$ServerLevel";
import { getMaxMana, setMana } from "../API/MNAmana";

/**
 * @author M1hono
 * @description when the player roll a big failure in loot.
 * @param {$ServerLevel} level 
 * @param {$Player} player 
 * @param {$Block} block 
 */
export function lootbigFailure(level, player, block) {
    const { pos } = block
    const { potionEffects , server } = player
    const events = [
        // event 1 : spawn a zombie
        () => {
            let enemy = level.createEntity("minecraft:zombie")
            enemy.setPos(pos.x, pos.y, pos.z)
            potionEffects.add("minecraft:weakness", 100, 1)
            let uuid = enemy.getUuid()
            enemy.spawn();

            let strongEnemy = level.getEntity(uuid)
            setLevelWithReroll( strongEnemy , Math.floor(Math.random() * 100)+1)
        },
        // event 2 : give slowness and hunger
        () => {
            player.tell(Text.of("稍许的瘟疫逸散，你感到虚弱").darkGreen())
            potionEffects.add("minecraft:slowness", 200, 2);
            potionEffects.add("minecraft:hunger", 300, 1);
        },
        // event 3 : spawn a creeper
        () => {
            let creeper = level.createEntity("minecraft:creeper");
            creeper.setPos(pos.x, pos.y, pos.z);
            creeper.spawn();
        }
        
    ];
    const randomEvent = events[Math.floor(Math.random() * events.length)]
    // This is for testing
    // const randomEvent = events[1]
    randomEvent();
}

/**
 * @author M1hono
 * @description when the player roll a big success in loot.
 * @param {$ServerLevel} level 
 * @param {$Player} player 
 * @param {$Block} block 
 */
export function lootbigSuccess(level, player, block) {
    const events = [
        // event 1 : give strength and mana
        () => {
            player.potionEffects.add("minecraft:strength", 100, 1)
            setMana(player, getMaxMana(player))
        },
        // event 2 : give speed and jump boost
        () => {
            player.potionEffects.add("minecraft:speed", 300, 2)
            player.potionEffects.add("minecraft:jump_boost", 300, 1)
        },
        // event 3 : give diamonds and experience
        () => {
            player.give('minecraft:diamond', 3)
            player.addExperienceLevels(5)
        }
        // 
    ]
    const randomEvent = events[Math.floor(Math.random() * events.length)]
    // This is for testing
    // const randomEvent = events[1]
    randomEvent()
}
export function lootNormalEvents (level, player, block) {
    const events = [
        // event 1 : 
        () => {
            
        },
        // event 2 : 
        () => {
            
        },
        // event 3 : 
        () => {
            
        }
    ]
    const randomEvent = events[Math.floor(Math.random() * events.length)]
    // This is for testing
    // const randomEvent = events[1]
    randomEvent()
}