const { $XpEvent } = require("packages/harmonised/pmmo/api/events/$XpEvent")
const { extractRitualName } = require("../../start_scripts/src/API/ExtractRitualName")
ForgeEvents.onEvent($XpEvent, event => {
    global.test(event)
})

global.test = (event) => {
    // console.info(event.getEntity().getName())
    // console.info(event.skill)
    // console.info(event.getContext())
    event.setCanceled(true)
}

ForgeEvents.onEvent( 'com.mna.api.events.RitualCompleteEvent', event => {
    global.test2(event)
})

global.test2 = (event) => {
    console.info(extractRitualName(event.getRitual().getRegistryId().toString()));
    console.info(event.getCaster().getName().getString());
}