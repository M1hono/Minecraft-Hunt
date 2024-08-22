// priority: 100
LootJS.modifiers(event=>{

    event.addLootTableModifier('minecraft:gameplay/fishing_chest/pool')
    .addLoot("minecraft:apple")
    .apply((context)=>{
        const {
            level
        } = context
        const enemy =  level.createEntity("minecraft:zombie")
        enemy.spawn()
    })

    event.addLootTableModifier('minecraft:gameplay/fishing_chest/common')
    .addLoot("minecraft:apple")

    event.addLootTableModifier('minecraft:gameplay/fishing_chest/uncommon')
    .addLoot("minecraft:apple")

    event.addLootTableModifier('minecraft:gameplay/fishing_chest/rare')
    .addLoot("minecraft:apple")

    event.addLootTableModifier('minecraft:gameplay/fishing_chest/epic')
    .addLoot("minecraft:apple")

})