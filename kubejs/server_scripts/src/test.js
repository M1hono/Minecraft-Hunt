// priority: 99
const { getUniqueCuriosItems, getCuriosItemList } = require("./API/Curios")
const { screenshake } = require("./API/Utils")
const { PlayerAttributeManager } = require("./Dice/AttributeManager")
LevelEvents.afterExplosion(event => {
    screenshake(event)
})