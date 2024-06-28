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
        case 'defend':
            data.defencedice = dice
            break;
        case 'ultil':
            data.ultildice = dice
            break;
        default:
            break;
    }
}
global.initDice = (player) =>{
    const { data } = player
    if (data.attackdice === undefined) data.attackdice = 1
    if (data.defencedice === undefined) data.defencedice = 1
    if (data.ultildice === undefined) data.ultildice = 1
}