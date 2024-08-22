// priority: 50
// import { $LivingDamageEvent } from "packages/net/minecraftforge/event/entity/living/$LivingDamageEvent"
// import { playerDamage as PlayerDamage.playerDamage } from "../../../../Dice/Battle/PlayerDamage/PlayerDamage"

/**
 * handle living damage event
 * @param {$LivingDamageEvent} event 
 */
global.livingDamage = (event) => {
    const {
        entity : target, // entity that take damage
        amount, // damage amount
        source, // damage source
        source : { actual : entity } // enitty that deal damage
    } = event
    PlayerDamage.playerDamage(entity, target, amount , source)
}