/**
 * @author M1hono
 * @description Add recipes for All  mods.
 */
ServerEvents.recipes((event) => {
    const { farmersdelight , mna } = event.recipes;

    farmersdelight.cutting(Item.of("minecraft:apple"),"#minecraft:leaves",'#forge:tools/knives');
})