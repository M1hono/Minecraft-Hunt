// PlayerEvents.tick(event=>{
//     const player = event.player
//     global.initDice(player)
//     const attackdice = player.data.attackdice
//     const defenddice = player.data.defencedice
//     const ultildice = player.data.ultildice
//     player.paint({
//         battleDiceDisplay: {
//           type: 'text',
//           x: -20,
//           y: -45,
//           scale: 2.0,
//           text: `${attackdice}`,
//           color: '#cf0f0f',
//           alignX: 'right',
//           alignY: 'bottom'
//         }
//     });
//     player.paint({
//       equipmentdiceDisplay: {
//         type: 'text',
//         x: -58,
//         y: -37,
//         scale: 1.5,
//         text: `${defenddice}`,
//         color: '#d0923f',
//         alignX: 'right',
//         alignY: 'bottom'
//       }
//     });
//     player.paint({
//       cultildiceDisplay: {
//         type: 'text',
//         x: -90,
//         y: -39,
//         scale: 1.0,
//         text: `${ultildice}`,
//         color: '#a8c6ee',
//         alignX: 'right',
//         alignY: 'bottom'
//       }
//     });
// })

(() => {
    let timerMap = {}

    EntityEvents.hurt(event => {

        if (event.source.actual && event.source.actual.isPlayer()) {

            let { entity, source } = event
            let { player } = source

            let playerUuid = player.getStringUuid()

            let fnRemove = () => {
                player.paint({
                    text_global_hitHealthShow_0: {
                        remove: true
                    }, rect_global_hitHealthShow_1: {
                        remove: true
                    }, rect_global_hitHealthShow_2: {
                        remove: true
                    }
                })
            }

            if (entity.health - event.damage > 0) {

                if (timerMap[playerUuid]) {
                    event.server.getScheduledEvents().clear(timerMap[playerUuid])
                    timerMap[playerUuid] = undefined
                }

                let { maxHealth, health } = entity
                health = health - event.getDamage()

                let healthPercent = health / maxHealth

                let colorSection__red = parseInt(255 * (1 - healthPercent)).toString(16).padStart(2, 0)
                let colorSection__green = parseInt(255 * healthPercent).toString(16).padStart(2, 0)

                player.paint({
                    text_global_hitHealthShow_0: {
                        type: 'text',
                        text: [`${parseInt(health)}/${maxHealth}`],
                        x: 10, y: 10,
                    },
                    rect_global_hitHealthShow_1: {
                        type: 'rectangle',
                        x: 10, y: 20, w: 100, h: 10,
                        color: '#ffffff'
                    },
                    rect_global_hitHealthShow_2: {
                        type: 'rectangle',
                        x: 10, y: 20, w: parseInt(100 * (health / maxHealth)), h: 10,
                        color: `#${colorSection__red}${colorSection__green}00`
                    }
                })

                timerMap[playerUuid] = event.server.scheduleInTicks(100, () => {
                    fnRemove()
                }).id
            } else {
                fnRemove()
            }
        }
    })
})()