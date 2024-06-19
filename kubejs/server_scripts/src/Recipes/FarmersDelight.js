/**
 * @author M1hono
 */
ServerEvents.recipes((event) => {
    const { farmersdelight } = event.recipes;

    farmersdelight.cutting(Item.of("minecraft:apple"), "#minecraft:leaves", '#forge:tools/knives');
});