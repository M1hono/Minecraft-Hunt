// priority: 0
const { $XpEvent } = require("packages/harmonised/pmmo/api/events/$XpEvent")
const { handlePmmoXp } = require("./GlobalImports/EventHandlerImports")
ForgeEvents.onEvent($XpEvent,
    /**@typeof $XpEvent */event => {
    handlePmmoXp(event)
})
const { $RitualCompleteEvent } = require("packages/com/mna/api/events/$RitualCompleteEvent")
const { handleRitualComplete } = require("./GlobalImports/EventHandlerImports")
ForgeEvents.onEvent( $RitualCompleteEvent,
    /**@typeof  $RitualCompleteEvent*/ event => {
    handleRitualComplete(event)
})
const { $LivingDamageEvent } = require("packages/net/minecraftforge/event/entity/living/$LivingDamageEvent")
const { handleLivingDamage } = require("./GlobalImports/EventHandlerImports")
ForgeEvents.onEvent($LivingDamageEvent,/**@typeof  $LivingDamageEvent*/event=>{
    handleLivingDamage(event)
})
const { $ItemFishedEvent } = require("packages/net/minecraftforge/event/entity/player/$ItemFishedEvent")
const { handleFishingLoot } = require("./GlobalImports/EventHandlerImports")
ForgeEvents.onEvent($ItemFishedEvent,/**@typeof $ItemFishedEvent*/event=>{
    handleFishingLoot(event)
})
const { $AdvancementEvent$AdvancementEarnEvent } = require("packages/net/minecraftforge/event/entity/player/$AdvancementEvent$AdvancementEarnEvent")
const { handleAdvancementTrigger } = require("./GlobalImports/EventHandlerImports")
ForgeEvents.onEvent($AdvancementEvent$AdvancementEarnEvent,/**@typeof $AdvancementEvent$AdvancementEarnEvent*/event=>{
    handleAdvancementTrigger(event)
})
const { handlePlayerClone } = require("./GlobalImports/EventHandlerImports")
const { $PlayerEvent$Clone } = require("packages/net/minecraftforge/event/entity/player/$PlayerEvent$Clone")
ForgeEvents.onEvent($PlayerEvent$Clone,/**@typeof $PlayerEvent$Clone*/event=>{
    handlePlayerClone(event)
})

const { $CurioChangeEvent } = require("packages/top/theillusivec4/curios/api/event/$CurioChangeEvent")
const { handleCurioChange } = require("./GlobalImports/EventHandlerImports")
ForgeEvents.onEvent($CurioChangeEvent,/**@typeof $CurioChangeEvent*/event=>{
    handleCurioChange(event)
})
const { $LivingEquipmentChangeEvent } = require("packages/net/minecraftforge/event/entity/living/$LivingEquipmentChangeEvent")
const { handleLivingEquipmentChange } = require("./GlobalImports/EventHandlerImports")
ForgeEvents.onEvent($LivingEquipmentChangeEvent,/**@typeof $LivingEquipmentChangeEvent*/event=>{
    handleLivingEquipmentChange(event)
})