global.test = (itemstack, level, entity) => {
    if (level.isClientSide()) return itemstack
    let effects = entity.potionEffects
    effects.add('minecraft:haste', 120 * 20)
    console.log(itemstack.damageValue)
    itemstack.damageValue++
    console.log(itemstack.damageValue)
    console.log(itemstack.maxDamage)
    if (itemstack.damageValue >= itemstack.maxDamage) {
        itemstack.shrink(1)
    }
    if (entity.player) {
        entity.give(Item.of('minecraft:glass_bottle'))
    }
    entity.addItemCooldown(itemstack , 20)
    console.log(itemstack)
    return itemstack
}