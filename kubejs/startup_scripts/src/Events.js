const { $XpEvent } = require("packages/harmonised/pmmo/api/events/$XpEvent")
ForgeEvents.onEvent($XpEvent, event => {
    global.test(event)
})

global.test = (event) => {
    console.info(event.getEntity().getName())
    console.info(event.skill)
    console.info(event.getContext())
    event.setCanceled(true)
}

ForgeEvents.onEvent('com.mna.api.events.RitualCompleteEvent',event=>{
    global.test2(event)
})

const $RitualRecipe = Java.loadClass('com.mna.recipes.rituals.RitualRecipe');

global.test2 = (event) => {
    // 直接获取并打印 RitualRecipe 对象的 ID
    console.info("Ritual ID: " + event.getRitual().getRegistryId());
    // 打印施法者的名称
    console.info("Caster Name: " + event.getCaster().getName());
}