// priority: 101
import { $Player } from "packages/net/minecraft/world/entity/player/$Player"
/**
 * @typedef {"attack" | "defense" | "ultil"} DiceType
 */
/**
 * 
 * @param {$Player} player 
 * @param {DiceType} type 
 * @param {number} sides
 */
global.dice = (player, type , sides) =>{
    global.initDice(player)
    const { data } = player
    const dice =  Math.floor(Math.random() * sides) + 1
    switch (type) {
        case 'attack':
            data.attackdice = dice
            break;
        case 'defense':
            data.defencedice = dice
            break;
        case 'ultil':
            data.ultildice = dice
            break;
        default:
            break;
    }
}/**
 * 
 * @param {$Player} player
 */
global.initDice = (player) =>{
    const { data } = player
    if (!data.attackdice) data.attackdice = 1
    if (!data.defencedice) data.defencedice = 1
    if (!data.ultildice) data.ultildice = 1
}
/**
 * 
 * @param {$Player} player 
 * @param {DiceType} type 
 * @returns {number}
 */
global.getDice = (player, type) =>{
    const { data } = player
    switch (type) {
        case 'attack':
            return data.attackdice
        case 'defense':
            return data.defencedice
        case 'ultil':
            return data.ultildice
    }
}