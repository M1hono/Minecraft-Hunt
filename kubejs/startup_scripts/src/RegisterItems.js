const { $Factions } = require("packages/com/mna/factions/$Factions")

StartupEvents.registry("item",e=>{
       
})
StartupEvents.registry('item', event => {
    event.create('magic_steak').food(food => {
      food
        .hunger(6)
        .saturation(6) // This value does not directly translate to saturation points gained
        // The real value can be assumed to be:
        // min(hunger * saturation * 2 + saturation, foodAmountAfterEating)
        .effect('minecraft:speed', 600, 0, 1)
        .removeEffect('minecraft:poison')
        .alwaysEdible() // Like golden apples
        .fastToEat() // Like dried kelp
        .meat() // Dogs are willing to eat it
        .eaten(/**@param {$FoodEatenEventJS_}ctx*/ctx => {
          // runs code upon consumption
          ctx.player.tell(Text.gold('Yummy Yummy!'))
          // If you want to modify this code then you need to restart the game.
          // However, if you make this code call a global startup function
          // and place the function *outside* of an event handler
          // then you may use the command:
          // /kubejs reload startup_scripts
          // to reload the function instantly.
          // See example below
        })
    })
  
    event.create('magicer_steak')
      .unstackable()
      .food(food =>
        food
          .hunger(7)
          .saturation(7)
          // This references the function below instead of having code directly, so it is reloadable!
          .eaten(ctx => global.myAwesomeReloadableFunction(ctx))
      )
  })
  /**
   * 
   * @param {$FoodEatenEventJS_} ctx 
   */
  global.myAwesomeReloadableFunction = ctx => {
    ctx.player.tell('Hello there!')
    ctx.player.tell(Text.of('Change me then reload with ').append(Text.red('/kubejs reload startup_scripts')).append(' to see your changes!'))
  }
  StartupEvents.registry('item', event => {
    event.create('nuke_soda', 'basic')
      .tooltip('§5Taste of Explosion!')
      .tooltip('§c...Inappropriate intake may cause disastrous result.')
      /**
       * The use animation of the item, can be  "spear" (trident),
       * "crossbow", "eat" (food), "spyglass", "block", "none", "bow", "drink"
       * When using certain animations, corresponding sound will be played.
       */
      .useAnimation('drink')
      /**
       * The duration before the item finishs its using,
       * if you need something like hold-and-charge time (like bow),
       * consider set this to 72000 (1h) or more.
       * A returned value of 0 or lower will render the item not usable.
       */
      .useDuration(itemstack => 64)
      /**
       * When item is about to be used.
       * If true, item will starts it use animation if duration > 0.
       */
      .use((level, player, hand) => true)
      // When the item use duration expires.
      .finishUsing((itemstack, level, entity) => {
        let effects = entity.potionEffects
        effects.add('minecraft:haste', 120 * 20)
        itemstack.shrink(1)
        if (entity.player) {
          entity.minecraftPlayer.addItem(Item.of('minecraft:glass_bottle').itemStack)
        }
        return itemstack
      })
      /**
       * When the duration is not expired yet, but
       * players release their right button.
       * Tick is how many ticks remained for player to finish using the item.
       */
      .releaseUsing((itemstack, level, entity, tick) => {
        itemstack.shrink(1)
        level.createExplosion(entity.x, entity.y, entity.z).explode()
      })
  })
