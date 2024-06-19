/**
 * @author M1hono
 */
ServerEvents.recipes((event) => {
    const { farmersdelight } = event.recipes;

    farmersdelight.cutting(
        [Item.of('minecraft:apple', '{cooking: 1}').strongNBT()]
        , [Item.of('minecraft:apple', '{cooking: 1}').strongNBT()]
        , ('#forge:tools/knives'));
});

PlayerEvents.inventoryChanged(event => {
    let item = event.getItem();
    if (item.id === 'minecraft:apple') {
        let nbt = item.nbt || item.getOrCreateTag();
        nbt.putInt("cooking", 1);
        item.setNbt(nbt);
        event.server.scheduleInTicks(2, () => {
            event.player.sendInventoryUpdate();
        });
        event.player.tell(event.player.getFoodData())
        event.player.tell(event.getItem().getFoodProperties(event.player).nutrition)
        event.player.tell(event.getItem().getFoodProperties(event.player).effects)
        event.player.tell(event.getItem().getFoodProperties(event.player).isFastFood())
        event.player.tell(event.getItem().getFoodProperties(event.player).isMeat())
        event.player.tell(event.getItem().getFoodProperties(event.player).canAlwaysEat())
        event.player.tell(event.getItem().getFoodProperties(event.player).saturationModifier)
    }
});