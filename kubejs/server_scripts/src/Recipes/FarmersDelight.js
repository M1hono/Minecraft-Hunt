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
    }
});