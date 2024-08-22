// const { SetBonusManager: Dice.ArmorSetHandler.SetBonusManager } = require("../../../Dice/ArmorSetHandler");

global.curioChange = event => {
    if (!event.entity.isPlayer()) return;
    if (!event.entity) return;
    Dice.ArmorSetHandler.SetBonusManager.updatePlayerSetBonus(event.entity);
}
global.livingEquipmentChange = event => {
    if (!event.entity.isPlayer()) return;
    if (!event.entity) return;
    Dice.ArmorSetHandler.SetBonusManager.updatePlayerSetBonus(event.entity);
}