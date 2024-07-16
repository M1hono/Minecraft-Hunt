// priority: 99
const { screenshake } = require("./API/Utils")
const { PlayerAttributeManager } = require("./Dice/AttributeManager")
LevelEvents.afterExplosion(event => {
    screenshake(event)
})