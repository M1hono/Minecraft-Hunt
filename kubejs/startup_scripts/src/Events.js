// priority: 0
/**
 * @description Trigger when players earn pmmo xp.
 */
const { $XpEvent } = require("packages/harmonised/pmmo/api/events/$XpEvent")
const { handlePmmoXp } = require("./PMMO/pmmoXp")
ForgeEvents.onEvent($XpEvent, event => {
    handlePmmoXp(event)
})
/**
 * @description Trigger player complete the ritual.
 */
const { handleRitualComplete } = require("./MNA/RitualComplete")
ForgeEvents.onEvent( 'com.mna.api.events.RitualCompleteEvent', event => {
    handleRitualComplete(event)
})