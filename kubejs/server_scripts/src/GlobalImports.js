// priority: 125
/**
 * @typedef {"attack" | "defense" | "ulti"} DiceType
 */
/**
 * 
 * @param {$Player} player 
 * @param {DiceType} type 
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