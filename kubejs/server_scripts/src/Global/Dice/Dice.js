// priority: 101
const { $Player } = require("packages/net/minecraft/world/entity/player/$Player")
/**
 * 
 * @param {$Player} player 
 */
global.dice = (player, type , sides) =>{
    global.initDice()
    const dice =  Math.floor(Math.random() * sides) + 1
    switch (type) {
        case 'attack':
            player.data.attackdice = dice
            break;
        case 'defend':
            player.data.defencedice = dice
            break;
        case 'util':
            player.data.ultildice = dice
            break;
        default:
            break;
    }
}
global.initDice = (player) =>{
    if (player.data.attackdice === undefined) player.data.attackdice = 1
    if (player.data.defencedice === undefined) player.data.defencedice = 1
    if (player.data.ultildice === undefined) player.data.ultildice = 1
}