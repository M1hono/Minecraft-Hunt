// const { $ScreenshakeHandler } = require("packages/team/lodestar/lodestone/handlers/$ScreenshakeHandler")
// const { $Easing} = require("packages/team/lodestar/lodestone/systems/easing/$Easing")
// const { $ScreenshakeInstance } = require("packages/team/lodestar/lodestone/systems/screenshake/$ScreenshakeInstance")

/**
 * @typedef {Internal.ScreenshakeHandler} $ScreenshakeHandler
 */
const { $ScreenshakeHandler } = Java.loadClass('team.lodestar.lodestone.handlers.ScreenshakeHandler');
/**
 * @typedef {Internal.Easing} $Easing
 */
const { $Easing } = Java.loadClass('team.lodestar.lodestone.systems.easing.Easing"');
/**
 * @typedef {Internal.ScreenshakeInstance} $ScreenshakeInstance
 */
const { $ScreenshakeInstance } = Java.loadClass('team.lodestar.lodestone.systems.screenshake.ScreenshakeInstance');

NetworkEvents.dataReceived('screenshake', event => {
    const { i1, i2, i3, duration } = event.data
    $ScreenshakeHandler.addScreenshake($ScreenshakeInstance(duration).setIntensity(i1, i2, i3).setEasing($Easing.SINE_IN, $Easing.QUAD_IN))
})