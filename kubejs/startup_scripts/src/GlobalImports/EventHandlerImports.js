// priority: 125
export function handleDiceRoll(player, type , sides) {
    global.dice(player, type , sides)
}
export function handleGetDice(player, type) {
    return global.getDice(player, type)
}
export const handlePmmoXp = (event) => {
    global.pmmoXp(event);
  }
export const handleRitualComplete = (event) => {
    global.ritualComplete(event);
}
export const handleFishingLoot = (event) => {
    global.fishingLoot(event)
}
export function handleLivingDamage(event) {
    global.livingDamage(event)
}
export function handleAdvancementTrigger(event) {
    global.advancementEarn(event)
}
export function handlePlayerClone(event) {
    global.playerClone(event)
}
export function handleCurioChange(event) {
    global.curioChange(event)
}
export function handleLivingEquipmentChange(event) {
    global.livingEquipmentChange(event)
}