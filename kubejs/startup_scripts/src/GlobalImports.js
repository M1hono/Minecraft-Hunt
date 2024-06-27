// priority: 99
/**
 * @description A set of actions when players earn pmmo xp.
 */
export const handlePmmoXp = (event) => {
    global.pmmoXp(event);
  }
/**
 * @description A set of actions when players complete the ritual.
 */
export const handleRitualComplete = (event) => {
    global.ritualComplete(event);
}
/**
 * 
 * @param {$ItemFishedEvent} event 
 */
export const handleFishingLoot = (event) => {
    global.fishingLoot(event)
}
/**
 * handle living damage event.
 * @param {$LivingDamageEvent} event 
 */
export function handleLivingDamage(event) {
    global.LivingDamage(event)
}