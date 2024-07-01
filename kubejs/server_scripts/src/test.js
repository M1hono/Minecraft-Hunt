// priority: 99
const { screenshake } = require("./API/Utils")

LevelEvents.afterExplosion(event => {
    screenshake(event)
})