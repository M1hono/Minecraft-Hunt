// priority: 125
/**
 * @typedef {"attack" | "defense" | "ulti"} ActionType
 */
/**
 * 
 * @param {$Player} player 
 * @param {ActionType} type 
 * @param {number} sides
 */
export function handleDiceRoll(player, type , sides) {
    global.dice(player, type , sides)
}
/**
 * 
 * @param {$Player} player 
 * @param {DiceType} type 
 * @returns {number}
 */
export function handleGetDice(player, type) {
    return global.getDice(player, type)
}
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
    global.livingDamage(event)
}