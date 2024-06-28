// priority: 100
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