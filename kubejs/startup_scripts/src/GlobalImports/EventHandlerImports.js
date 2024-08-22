// priority: 125

const EventHandlerImports = {
    handleDiceRoll: function (player, type, sides) {
        global.dice(player, type, sides)
    },
    handleGetDice: function (player, type) {
        return global.getDice(player, type)
    },
    handlePmmoXp: (event) => {
        global.pmmoXp(event);
    },
    handleRitualComplete: (event) => {
        global.ritualComplete(event);
    },
    handleFishingLoot: (event) => {
        global.fishingLoot(event)
    },
    handleLivingDamage: function (event) {
        global.livingDamage(event)
    },
    handleAdvancementTrigger: function (event) {
        global.advancementEarn(event)
    },
    handlePlayerClone: function (event) {
        global.playerClone(event)
    },
    handleCurioChange: function (event) {
        global.curioChange(event)
    },
    handleLivingEquipmentChange: function (event) {
        global.livingEquipmentChange(event)
    }
}
