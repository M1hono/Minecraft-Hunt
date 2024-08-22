// priority: 9999

/**
 * @typedef {Internal.Structure} $Structure
 */
const $Structure = Java.loadClass('net.minecraft.data.worldgen.Structures')
/**
 * @typedef {Internal.StructurePlaceSettings_} $StructurePlaceSettings
 */
const $StructurePlaceSettings = Java.loadClass('net.minecraft.world.level.levelgen.structure.templatesystem.StructurePlaceSettings');
/**
 * @typedef {Internal.LootDataType_} $LootDataType
 */
const $LootDataType = Java.loadClass('net.minecraft.world.level.storage.loot.LootDataType');
/**
 * @typedef {Internal.DamageSource_}  $DamageSource
 */
const $DamageSource = Java.loadClass('net.minecraft.world.damagesource.DamageSource');
/**
 * @typedef {Internal.ResourceKey_} $ResourceKey
 */
const $ResourceKey = Java.loadClass('net.minecraft.resources.ResourceKey');
/**
 * @typedef {BlockPos_} $BlockPos
 */
const $BlockPos = Java.loadClass('net.minecraft.core.BlockPos');
/**
 * @typedef {Internal.TagKey_} $TagKey
 */
const $TagKey = Java.loadClass('net.minecraft.tags.TagKey');
/**
 * @typedef {Internal.Entity} $Entity
 */
const $Entity = Java.loadClass('net.minecraft.world.entity.Entity');
/**
 * @typedef {Internal.ServerPlayer_} $ServerPlayer
 */
const $ServerPlayer = Java.loadClass('net.minecraft.server.level.ServerPlayer')
/**
 * @typedef {Player} $Player
 */
/**
 * @typedef {Player | $Player} $Player_
 */
const $Player = Java.loadClass('net.minecraft.world.entity.player.Player');
/**
 * @typedef {Internal.ThrowingAxeEntity_} $ThrowingAxeEntity
 */
const $ThrowingAxeEntity = Java.loadClass('dev.xkmc.l2weaponry.content.entity.ThrowingAxeEntity');
/**
 * @typedef {Internal.TooltipFlag} $TooltipFlag
 */
const $TooltipFlag = Java.loadClass('net.minecraft.world.item.TooltipFlag');
/**
 * @typedef {Internal.CuriosApi} $CuriosApi
 */
const $CuriosApi = Java.loadClass('top.theillusivec4.curios.api.CuriosApi');
/**
 * @typedef {Internal.PlayerMagicProvider} PlayerMagicProvider
 */
// const PlayerMagicProvider = Java.loadClass('com.mna.capabilities.playerdata.magic.PlayerMagicProvider');
/**
 * @typedef {Internal.ServerMessageDispatcher} ServerMessageDispatcher
 */
// const ServerMessageDispatcher = Java.loadClass('com.mna.network.ServerMessageDispatcher');
/**
 * @typedef {Internal.APIUtils} $APIUtils
 */
const $APIUtils = Java.loadClass('harmonised.pmmo.api.APIUtils');
/**
 * @typedef {Internal.Registries} $Registries
 */
const $Registries = Java.loadClass('net.minecraft.core.registries.Registries');
/**
 * @typedef {Internal.Server} $Server
 */
const $Server = Java.loadClass('info.journeymap.shaded.org.eclipse.jetty.server.Server');
/**
 * @typedef {Internal.Dimension} $Dimension
 */
const $Dimension = Java.loadClass('java.awt.Dimension');
/**
 * @typedef {Internal.LevelUtils} $LevelUtils
 */
const $LevelUtils = Java.loadClass('com.almostreliable.morejs.util.LevelUtils');
/**
 * @typedef {Internal.ResourceOrTag} $ResourceOrTag
 */
const $ResourceOrTag = Java.loadClass('com.almostreliable.morejs.util.ResourceOrTag');
/**
 * @typedef {Internal.Level} $Level
 */
const $Level = Java.loadClass('net.minecraft.world.level.Level');
/**
 * @typedef {Internal.ItemStack} $ItemStack
 */
const $ItemStack = Java.loadClass('net.minecraft.world.item.ItemStack');
/**
 * @typedef {Internal.AbstractArrow} $AbstractArrow
 */
const $AbstractArrow = Java.loadClass("net.minecraft.world.entity.projectile.AbstractArrow");
/**
 * @typedef {Internal.SoundEvent} $SoundEvents
 */
const $SoundEvents = Java.loadClass('net.minecraft.sounds.SoundEvents');
/**
 * @typedef {Internal.CompoundTag} $CompoundTag
 */
const $CompoundTag = Java.loadClass('net.minecraft.nbt.CompoundTag');
/**
 * @typedef {Internal.PlayerEvent$Clone} $PlayerEvent$Clone
 */
const $PlayerEvent$Clone = Java.loadClass('net.minecraftforge.event.entity.player.PlayerEvent$Clone');
/**
 * @typedef {Internal.LivingDamageEvent} $LivingDamageEvent
 */
const $LivingDamageEvent = Java.loadClass('net.minecraftforge.event.entity.living.LivingDamageEvent');
/**
 * @typedef {Internal.FishingHook} $FishingHook
 */
const $FishingHook = Java.loadClass('net.minecraft.world.entity.projectile.FishingHook');
/**
 * @typedef {Internal.FallingBlockEntity} $FallingBlockEntity
 */
const $FallingBlockEntity = Java.loadClass('net.minecraft.world.entity.item.FallingBlockEntity');
/**
 * @typedef {Internal.LootParams$Builder} $LootParams$Builder
 */
const $LootParams$Builder = Java.loadClass('net.minecraft.world.level.storage.loot.LootParams$Builder');
/**
 * @typedef {Internal.LootContextParamSets} $LootContextParamSets
 */
const $LootContextParamSets = Java.loadClass('net.minecraft.world.level.storage.loot.parameters.LootContextParamSets');
/**
 * @typedef {Internal.Block} $Block
 */
const $Block = Java.loadClass('net.minecraft.world.level.block.Block');
/**
 * @typedef {Internal.ItemFishedEvent} $ItemFishedEvent
 */
const $ItemFishedEvent = Java.loadClass('net.minecraftforge.event.entity.player.ItemFishedEvent');
/**
 * @typedef {Internal.AdvancementEvent$AdvancementEarnEvent} $AdvancementEvent$AdvancementEarnEvent
 */
const $AdvancementEvent$AdvancementEarnEvent = Java.loadClass('net.minecraftforge.event.entity.player.AdvancementEvent$AdvancementEarnEvent');
/**
 * @typedef {Internal.CustomGoal} $CustomGoal
 */
const $CustomGoal = Java.loadClass('net.liopyu.entityjs.util.ai.CustomGoal');
/**
 * @typedef {Internal.Goal} $Goal
 */
const $Goal = Java.loadClass('net.minecraft.world.entity.ai.goal.Goal');
/**
 * @typedef {Internal.EnumSet} $EnumSet
 */
const $EnumSet = Java.loadClass("java.util.EnumSet");
/**
 * @typedef {Internal.Goal$Flag} $Goal$Flag
 */
const $Goal$Flag = Java.loadClass('net.minecraft.world.entity.ai.goal.Goal$Flag');
/**
 * @typedef {Internal.LivingEntity} $LivingEntity
 */
const $LivingEntity = Java.loadClass('net.minecraft.world.entity.LivingEntity');
/**
 * @typedef {Internal.Mob} $Mob
 */
const $Mob = Java.loadClass('net.minecraft.world.entity.Mob');
/**
 * @typedef {mezz.jei.api.recipe.RecipeType} $RecipeType
 */
const $RecipeType = Java.loadClass('mezz.jei.api.recipe.RecipeType');
/**
 * @typedef {Internal.BiConsumer} $BiConsumer
 */
const $BiConsumer = Java.loadClass('java.util.function.BiConsumer');

/**
 * @typedef {Internal.SlotContext} $SlotContext
 */
const $SlotContext = Java.loadClass('top.theillusivec4.curios.api.SlotContext'); 
/**
 * @typedef {Internal.SlotType} $SlotType
 */
const $SlotType = Java.loadClass('top.theillusivec4.curios.common.slottype.SlotType');
