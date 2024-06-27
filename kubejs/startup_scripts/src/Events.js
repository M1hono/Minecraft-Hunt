// priority: 0
/**
 * @description Trigger when players earn pmmo xp.
 */
const { $XpEvent } = require("packages/harmonised/pmmo/api/events/$XpEvent")
const { handlePmmoXp } = require("./GlobalImports")
ForgeEvents.onEvent($XpEvent,
    /**@typeof $XpEvent */event => {
    handlePmmoXp(event)
})
/**
 * @description Trigger player complete the ritual.
 */
const { $RitualCompleteEvent } = require("packages/com/mna/api/events/$RitualCompleteEvent")
const { handleRitualComplete } = require("./GlobalImports")
ForgeEvents.onEvent( $RitualCompleteEvent,
    /**@typeof  $RitualCompleteEvent*/ event => {
    handleRitualComplete(event)
})
const { $LivingDamageEvent } = require("packages/net/minecraftforge/event/entity/living/$LivingDamageEvent")
const { handleLivingDamage } = require("./GlobalImports")
ForgeEvents.onEvent($LivingDamageEvent,/**@typeof  $LivingDamageEvent*/event=>{
    handleLivingDamage(event)
})
const { $ItemFishedEvent } = require("packages/net/minecraftforge/event/entity/player/$ItemFishedEvent")
const { handleFishingLoot } = require("./GlobalImports")
ForgeEvents.onEvent($ItemFishedEvent,/**@typeof $ItemFishedEvent*/event=>{
    handleFishingLoot(event)
})
