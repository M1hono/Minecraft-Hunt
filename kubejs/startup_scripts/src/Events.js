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
/**
 * @description Trigger when LivingDamage is dealt.
 * Used to handle damage dealt by players and other damage related functions.
 */
ForgeEvents.onEvent($LivingDamageEvent,/**@typeof  $LivingDamageEvent*/event=>{
    handleLivingDamage(event)
})
const { $ItemFishedEvent } = require("packages/net/minecraftforge/event/entity/player/$ItemFishedEvent")
const { handleFishingLoot } = require("./GlobalImports")
/**
 * @description Trigger player fish an item.
 * Used to handle fishing event and fishing chest functions.
 */
ForgeEvents.onEvent($ItemFishedEvent,/**@typeof $ItemFishedEvent*/event=>{
    handleFishingLoot(event)
})