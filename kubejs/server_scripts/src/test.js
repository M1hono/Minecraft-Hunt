// priority: 99
const { screenshake } = require("./API/Utils.js")

LevelEvents.afterExplosion(event => {
    screenshake(event)
})