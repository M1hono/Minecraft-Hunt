// priority: 99
const { screenshake } = require("./API/Ultil")

LevelEvents.afterExplosion(event => {
    screenshake(event)
})