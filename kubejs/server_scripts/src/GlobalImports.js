// priority: 125
/**
 * @typedef {"attack" | "defense" | "ulti"} DiceType
 */
/**
 * @author M1hono
 * @description Roll a dice for the player.
 * @param {$Player} player the player that roll the dice
 * @param {DiceType} type the type of the dice: attack, defense, ulti
 * @param {number} sides the sides of the dice
 */
export function handleDiceRoll(player, type , sides) {
    global.dice(player, type , sides)
}
/**
 * @author M1hono
 * @description Get player's persistentdata value of the dice.
 * @param {$Player} player the player
 * @param {DiceType} type the type of the dice: attack, defense, ulti
 * @returns {number} the value of persistentdata.
 */
export function handleGetDice(player, type) {
    return global.getDice(player, type)
}