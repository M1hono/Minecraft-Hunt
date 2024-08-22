// priority: 0
// const { $XpEvent } = require("packages/harmonised/pmmo/api/events/$XpEvent")
// const { handlePmmoXp: EventHandlerImports.handlePmmoXp } = require("./GlobalImports/EventHandlerImports")
ForgeEvents.onEvent('harmonised.pmmo.api.events.XpEvent',
    /**@typeof $XpEvent */event => {
    EventHandlerImports.handlePmmoXp(event)
})
// This part has been divided into another project.
// const { $RitualCompleteEvent } = require("packages/com/mna/api/events/$RitualCompleteEvent")
// const { handleRitualComplete } = require("./GlobalImports/EventHandlerImports")
// ForgeEvents.onEvent( $RitualCompleteEvent,
//     /**@typeof  $RitualCompleteEvent*/ event => {
//     handleRitualComplete(event)
// })
// const { $LivingDamageEvent } = require("packages/net/minecraftforge/event/entity/living/$LivingDamageEvent")
// const { handleLivingDamage: EventHandlerImports.handleLivingDamage } = require("./GlobalImports/EventHandlerImports")
ForgeEvents.onEvent('net.minecraftforge.event.entity.living.LivingDamageEvent',/**@typeof  $LivingDamageEvent*/event=>{
    EventHandlerImports.handleLivingDamage(event)
})
// const { $ItemFishedEvent } = require("packages/net/minecraftforge/event/entity/player/$ItemFishedEvent")
// const { handleFishingLoot: EventHandlerImports.handleFishingLoot } = require("./GlobalImports/EventHandlerImports")
ForgeEvents.onEvent('net.minecraftforge.event.entity.player.ItemFishedEvent',/**@typeof $ItemFishedEvent*/event=>{
    EventHandlerImports.handleFishingLoot(event)
})
// const { $AdvancementEvent$AdvancementEarnEvent } = require("packages/net/minecraftforge/event/entity/player/$AdvancementEvent$AdvancementEarnEvent")
// const { handleAdvancementTrigger: EventHandlerImports.handleAdvancementTrigger } = require("./GlobalImports/EventHandlerImports")
ForgeEvents.onEvent('net.minecraftforge.event.entity.player.AdvancementEvent$AdvancementEarnEvent',/**@param $AdvancementEvent$AdvancementEarnEvent*/event=>{
    EventHandlerImports.handleAdvancementTrigger(event)
})
// const { handlePlayerClone: EventHandlerImports.handlePlayerClone } = require("./GlobalImports/EventHandlerImports")
// const { $PlayerEvent$Clone } = require("packages/net/minecraftforge/event/entity/player/$PlayerEvent$Clone")
ForgeEvents.onEvent('net.minecraftforge.event.entity.player.PlayerEvent$Clone',/**@typeof $PlayerEvent$Clone*/event=>{
    EventHandlerImports.handlePlayerClone(event)
})

// const { $CurioChangeEvent } = require("packages/top/theillusivec4/curios/api/event/$CurioChangeEvent")
// const { handleCurioChange: EventHandlerImports.handleCurioChange } = require("./GlobalImports/EventHandlerImports")
ForgeEvents.onEvent('top.theillusivec4.curios.api.event.CurioChangeEvent',/**@typeof $CurioChangeEvent*/event=>{
    EventHandlerImports.handleCurioChange(event)
})
// const { $LivingEquipmentChangeEvent } = require("packages/net/minecraftforge/event/entity/living/$LivingEquipmentChangeEvent")
// const { handleLivingEquipmentChange: EventHandlerImports.handleLivingEquipmentChange } = require("./GlobalImports/EventHandlerImports")
ForgeEvents.onEvent('net.minecraftforge.event.entity.living.LivingEquipmentChangeEvent',/**@typeof $LivingEquipmentChangeEvent*/event=>{
    EventHandlerImports.handleLivingEquipmentChange(event)
})