// priority: 0
/**
 * @description Trigger when players earn pmmo xp.
 */
const { $XpEvent } = require("packages/harmonised/pmmo/api/events/$XpEvent")
ForgeEvents.onEvent($XpEvent, event => {
    global.pmmoXp(event)
})
/**
 * @description Trigger player complete the ritual.
 */
ForgeEvents.onEvent( 'com.mna.api.events.RitualCompleteEvent', event => {
    global.ritualComplete(event)
})