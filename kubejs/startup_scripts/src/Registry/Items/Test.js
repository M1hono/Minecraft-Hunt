StartupEvents.registry("item",event=>{
    event.create('test', 'basic')
    .useAnimation("bow")
    .maxStackSize(1)
    .maxDamage(100)
    .useDuration(itemstack => 20)
    .use((level, player, hand) => {
        if (!hand == "MAIN_HAND") return false
        return true
    })
    .finishUsing((itemstack, level, entity) => {
       return global.test(itemstack, level, entity)
    })
    .releaseUsing((itemstack, level, entity, tick) => {
      itemstack.shrink(1)
      level.createExplosion(entity.x, entity.y, entity.z).explode()
    })
})