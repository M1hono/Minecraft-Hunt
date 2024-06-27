import { Components } from "packages/moe/wolfgirl/probejs/generated/registry/mna/Components"
import { $LivingDamageEvent } from "packages/net/minecraftforge/event/entity/living/$LivingDamageEvent"
const { $Player } = require("packages/net/minecraft/world/entity/player/$Player")

/**
 * handle living damage event
 * @param {$LivingDamageEvent} event 
 */
global.LivingDamage = (event) => {
    const entity = event.source.actual
    const target = event.entity
    const amount = event.amount
    // console.info(event.source.immediate)
    // console.info(event.source.actual)
    // console.info(event.source.getType())
    if (entity instanceof $Player) {
        global.initDice(entity)
        if (!entity.stages.has("attack")) {
            switch (event.source.getType()) {
                case "player":
                    entity.stages.add("attack")
                    global.dice(entity, 'attack', 20)
                    removeStage()
                    break;
                case "arrow":
                    entity.stages.add("attack")
                    global.dice(entity, 'defend', 20)
                    removeStage()
                    break;
                }
            function removeStage() {
            entity.getServer().scheduleInTicks(1, () => {
                entity.stages.remove("attack")
            })
        }
        }
        
    } else {
        target.invulnerableTime = 0
    }
}