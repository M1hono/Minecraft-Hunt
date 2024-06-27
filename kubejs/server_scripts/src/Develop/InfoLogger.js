// priority: 100
/**
 * @author M1hono
 * @description This script prints various information from your modpack to the console.
 */
ServerEvents.commandRegistry(event => {     
    
    const { commands: Commands, arguments: Arguments } = event
    const availableActions = [
        'getRecipe',
        'getDamage',
        'getAttribute',
        'getEnchantment',
        'getTier',
        'getStructure',
        'getBiome',
        'getFluid',
        'getEffect',
        'getAllRegistryTypes',
        'getBlock',
        'getItem',
        'getEntityType',
        'getPotion',
        'getCustomStat',
        'getBlockEntityType',
        'getBannerPattern',
        'getRecipeSerializer',
        'getPaintingVariant',
        'getWorldPreset',
        'getConfiguredFeature',
        'getSensorType',
        'getTrimMaterial',
        'getTrimPattern',
        'getWorldgenStructureType',
        'getSoundEvent',
        'getBiomeModifier',
        'getBlockStateProviderType',
        'getMaterialRule',
        'getCommandArgumentType',
        'getStructurePiece',
        'getLootScoreProviderType',
        'getPlacedFeature',
        'getStatType',
        'getPlacementModifierType',
        'getWorldgenFeature',
        'getGlobalLootModifierSerializers',
        'getTreeDecoratorType',
        'getIntProviderType',
        'getRuleTest',
        'getNoiseSettings',
        'getBiomeSource',
        'getDensityFunctionType',
        'getChatType',
        'getProcessorList',
        'getPosRuleTest',
        'getVillagerProfession',
        'getNoise',
        'getChunkStatus',
        'getStructureModifier',
        'getStructureProcessor',
        'getFrogVariant',
        'getPointOfInterestType',
        'getLootConditionType',
        'getLootFunctionType',
        'getRootPlacerType',
        'getSchedule',
        'getLootPoolEntryType',
        'getLootNumberProviderType',
        'getMultiNoiseBiomeSourceParameterList',
        'getTemplatePool',
        'getDimension',
        'getVillagerType',
        'getDecoratedPotPatterns',
        'getFoliagePlacerType',
        'getGameEvent',
        'getFeatureSizeType',
        'getCarver',
        'getHeightProviderType',
        'getDimensionType',
        'getPositionSourceType',
        'getStructurePlacement',
        'getMemoryModuleType',
        'getLootNbtProviderType',
        'getFlatLevelGeneratorPreset',
        'getTrunkPlacerType',
        'getMenu',
        'getCreativeModeTab',
        'getCatVariant',
        'getSoftFluids',
        'getStructureSet',
        'getFluidType',
        'getParticleType',
        'getInstrument',
        'getEntityDataSerializers',
        'getActivity',
        'getMapMarkers',
        'getChunkGenerator',
        'getStructurePoolElement',
        'getBlockPredicateType',
        'getRuleBlockEntityModifier',
        'getWorldgenStructureType',
        'getTrait'
    ]

    event.register(
        Commands.literal("info")
            .then(
                Commands.argument('action', Arguments.STRING.create(event))
                // Suggest actions based on user input
                    .suggests((context, builder) => {
                        const input = context.getInput().toLowerCase().replace("/info ", "")
                        if (!input) {
                            availableActions.forEach(action => builder.suggest(action))
                        } else {
                            availableActions.forEach(action => {
                                if (action.toLowerCase().includes(input)) {
                                    builder.suggest(action)
                                }
                            })
                        }
                        return builder.buildFuture()
                    })
                    .requires(src => src.hasPermission(4))
                    .executes(ctx => {
                        const action = Arguments.STRING.getResult(ctx, "action")
                        const source = ctx.source
                        const server = source.getServer()
                        const level = source.getLevel()
    
                        if (commandActions[action]) {
                            let result = commandActions[action](level)
                            if (typeof result === 'object' && result !== null) {
                                // Reload server scripts to Clear previous output.
                                server.runCommandSilent("kubejs reload server_scripts")
                                if (action === 'getTier') {
                                    console.info(action + ":\n" + result.join('\n'))
                                } else {
                                console.info(action + ":\n" + Array.from(result).join('\n'))
                                }
                            }
                            source.sendSuccess("Output printed to console for " + action, false)
                            return 1
                        } else {
                            source.sendSuccess("Invalid command action.", false)
                            return 0
                        }
                    })
            )
        )
    })

const $ResourceKey = Java.loadClass("net.minecraft.resources.ResourceKey")
const $TierSortingRegistry = Java.loadClass("net.minecraftforge.common.TierSortingRegistry")
const $ItemBuilder = Java.loadClass("dev.latvian.mods.kubejs.item.ItemBuilder")

// Utility function to create registry keys
const createRegistryKey = (name) => $ResourceKey.createRegistryKey(name)

// Create registry keys for the resources we are interested in
const RECIPE = createRegistryKey("recipe_type")
const DAMAGE_TYPE = createRegistryKey("damage_type")
const ATTRIBUTE = createRegistryKey("attribute")
const ENCHANTMENT = createRegistryKey("enchantment")
const BIOME = createRegistryKey("worldgen/biome")
const STRUCTURE = createRegistryKey("minecraft:worldgen/structure_type")
const FLUID = createRegistryKey("fluid")
const EFFECT = createRegistryKey("mob_effect")
const BLOCK = createRegistryKey("block")
const ITEM = createRegistryKey("item")
const ENTITY_TYPE = createRegistryKey("entity_type")
const POTION = createRegistryKey("potion")
const CUSTOM_STAT = createRegistryKey("custom_stat")
const BLOCK_ENTITY_TYPE = createRegistryKey("block_entity_type")
const BANNER_PATTERN = createRegistryKey("banner_pattern")
const RECIPE_SERIALIZER = createRegistryKey("recipe_serializer")
const PAINTING_VARIANT = createRegistryKey("painting_variant")
const WORLD_PRESET = createRegistryKey("worldgen/world_preset")
const CONFIGURED_FEATURE = createRegistryKey("worldgen/configured_feature")
const SENSOR_TYPE = createRegistryKey("sensor_type")
const TRIM_MATERIAL = createRegistryKey("trim_material")
const TRIM_PATTERN = createRegistryKey("trim_pattern")
const WORLDGEN_STRUCTURE_TYPE = createRegistryKey("worldgen/structure_type")
const SOUND_EVENT = createRegistryKey("sound_event")
const BIOME_MODIFIER = createRegistryKey("forge:biome_modifier")
const BLOCK_STATE_PROVIDER_TYPE = createRegistryKey("worldgen/block_state_provider_type")
const MATERIAL_RULE = createRegistryKey("worldgen/material_rule")
const COMMAND_ARGUMENT_TYPE = createRegistryKey("command_argument_type")
const STRUCTURE_PIECE = createRegistryKey("worldgen/structure_piece")
const LOOT_SCORE_PROVIDER_TYPE = createRegistryKey("loot_score_provider_type")
const PLACED_FEATURE = createRegistryKey("worldgen/placed_feature")
const STAT_TYPE = createRegistryKey("stat_type")
const PLACEMENT_MODIFIER_TYPE = createRegistryKey("worldgen/placement_modifier_type")
const WORLDGEN_FEATURE = createRegistryKey("worldgen/feature")
const TRAIT = createRegistryKey("l2hostility:trait")
const GLOBAL_LOOT_MODIFIER_SERIALIZERS = createRegistryKey("forge:global_loot_modifier_serializers")
const TREE_DECORATOR_TYPE = createRegistryKey("minecraft:worldgen/tree_decorator_type")
const INT_PROVIDER_TYPE = createRegistryKey("minecraft:int_provider_type")
const RULE_TEST = createRegistryKey("minecraft:rule_test")
const NOISE_SETTINGS = createRegistryKey("minecraft:worldgen/noise_settings")
const BIOME_SOURCE = createRegistryKey("minecraft:worldgen/biome_source")
const DENSITY_FUNCTION_TYPE = createRegistryKey("minecraft:worldgen/density_function_type")
const CHAT_TYPE = createRegistryKey("minecraft:chat_type")
const PROCESSOR_LIST = createRegistryKey("minecraft:worldgen/processor_list")
const POS_RULE_TEST = createRegistryKey("minecraft:pos_rule_test")
const VILLAGER_PROFESSION = createRegistryKey("minecraft:villager_profession")
const NOISE = createRegistryKey("minecraft:worldgen/noise")
const CHUNK_STATUS = createRegistryKey("minecraft:chunk_status")
const STRUCTURE_MODIFIER = createRegistryKey("forge:structure_modifier")
const STRUCTURE_PROCESSOR = createRegistryKey("minecraft:worldgen/structure_processor")
const FROG_VARIANT = createRegistryKey("minecraft:frog_variant")
const POINT_OF_INTEREST_TYPE = createRegistryKey("minecraft:point_of_interest_type")
const LOOT_CONDITION_TYPE = createRegistryKey("minecraft:loot_condition_type")
const LOOT_FUNCTION_TYPE = createRegistryKey("minecraft:loot_function_type")
const ROOT_PLACER_TYPE = createRegistryKey("minecraft:worldgen/root_placer_type")
const SCHEDULE = createRegistryKey("minecraft:schedule")
const LOOT_POOL_ENTRY_TYPE = createRegistryKey("minecraft:loot_pool_entry_type")
const LOOT_NUMBER_PROVIDER_TYPE = createRegistryKey("minecraft:loot_number_provider_type")
const MULTI_NOISE_BIOME_SOURCE_PARAMETER_LIST = createRegistryKey("minecraft:worldgen/multi_noise_biome_source_parameter_list")
const TEMPLATE_POOL = createRegistryKey("minecraft:worldgen/template_pool")
const DIMENSION = createRegistryKey("minecraft:dimension")
const VILLAGER_TYPE = createRegistryKey("minecraft:villager_type")
const DECORATED_POT_PATTERNS = createRegistryKey("minecraft:decorated_pot_patterns")
const FOLIAGE_PLACER_TYPE = createRegistryKey("minecraft:worldgen/foliage_placer_type")
const GAME_EVENT = createRegistryKey("minecraft:game_event")
const FEATURE_SIZE_TYPE = createRegistryKey("minecraft:worldgen/feature_size_type")
const CARVER = createRegistryKey("minecraft:worldgen/carver")
const HEIGHT_PROVIDER_TYPE = createRegistryKey("minecraft:height_provider_type")
const DIMENSION_TYPE = createRegistryKey("minecraft:dimension_type")
const POSITION_SOURCE_TYPE = createRegistryKey("minecraft:position_source_type")
const STRUCTURE_PLACEMENT = createRegistryKey("minecraft:worldgen/structure_placement")
const MEMORY_MODULE_TYPE = createRegistryKey("minecraft:memory_module_type")
const LOOT_NBT_PROVIDER_TYPE = createRegistryKey("minecraft:loot_nbt_provider_type")
const FLAT_LEVEL_GENERATOR_PRESET = createRegistryKey("minecraft:worldgen/flat_level_generator_preset")
const TRUNK_PLACER_TYPE = createRegistryKey("minecraft:worldgen/trunk_placer_type")
const MENU = createRegistryKey("minecraft:menu")
const CREATIVE_MODE_TAB = createRegistryKey("minecraft:creative_mode_tab")
const CAT_VARIANT = createRegistryKey("minecraft:cat_variant")
const SOFT_FLUIDS = createRegistryKey("moonlight:soft_fluids")
const STRUCTURE_SET = createRegistryKey("minecraft:worldgen/structure_set")
const FLUID_TYPE = createRegistryKey("forge:fluid_type")
const PARTICLE_TYPE = createRegistryKey("minecraft:particle_type")
const INSTRUMENT = createRegistryKey("minecraft:instrument")
const ENTITY_DATA_SERIALIZERS = createRegistryKey("forge:entity_data_serializers")
const ACTIVITY = createRegistryKey("minecraft:activity")
const MAP_MARKERS = createRegistryKey("moonlight:map_markers")
const CHUNK_GENERATOR = createRegistryKey("minecraft:worldgen/chunk_generator")
const STRUCTURE_POOL_ELEMENT = createRegistryKey("minecraft:worldgen/structure_pool_element")
const BLOCK_PREDICATE_TYPE = createRegistryKey("minecraft:block_predicate_type")
const RULE_BLOCK_ENTITY_MODIFIER = createRegistryKey("minecraft:rule_block_entity_modifier")

/**
 * Gets all entries from a given registry key.
 * @param {$ResourceKey_} registryKey - The registry key to get entries from.
 * @param {$Level_} level - The level object.
 * @returns {Set} - A set of entries.
 */
const getRegistryEntries = (registryKey, level) => {
    const registry = level.registryAccess().registryOrThrow(registryKey)
    const entries = registry.entrySet()
    let entrySet = new Set()
    entries.forEach(entry => {
        entrySet.add(entry.getKey().location().toString())
    })

    return entrySet
}

/**
 * Gets all tiers, including custom KubeJS tiers.
 * @returns {Set} - A set of tier names.
 */
const getTiers = () => {
    const tiers = $TierSortingRegistry.getSortedTiers()
    let tierNames = tiers.map(tier => $TierSortingRegistry.getName(tier).toString())
    const customToolTiers = $ItemBuilder.TOOL_TIERS.keySet().toArray()
    const customArmorTiers = $ItemBuilder.ARMOR_TIERS.keySet().toArray()
    customToolTiers.forEach(tier => tierNames.push(tier.toString()))
    customArmorTiers.forEach(tier => tierNames.push(tier.toString()))
    return tierNames
}

const $LHTraits = Java.loadClass("dev.xkmc.l2hostility.init.registrate.LHTraits")
const $Component = Java.loadClass("net.minecraft.network.chat.Component")

/**
 * Get all traits and their descriptions
 * @param {$Level_} level - The level object.
 * @returns {$Trait_} - A set of traits and their descriptions.
 */
const getTraits = (level) => {
    let traits = new Set()
    let traitRegistry = $LHTraits.TRAITS.get()
    let values = traitRegistry.getValues()
    values.forEach(traitInstance => {
        let trait = traitInstance.getRegistryName().toString()
        let traitNameKey = `trait.${traitInstance.getRegistryName().getNamespace()}.${traitInstance.getRegistryName().getPath()}`
        let traitDescKey = `${traitNameKey}.desc`
        let traitName = $Component.translatable(traitNameKey).getString()
        let traitDesc = $Component.translatable(traitDescKey).getString()
        traits.add(`Trait:${trait}， ${traitName}, Description: ${traitDesc}`)
    })
    return traits
}


/**
 * Additional function to fetch all registry types
 * @param {Object} level - The level object.
 * @returns {Set} - A set of registry types.
 */
const getAllRegistryTypes = (level) => {
    const registries = level.registryAccess().registries()
    let types = new Set()

    registries.forEach(entry => {
        types.add(entry.key().location().toString())
    })

    return types
}

const commandActions = {
    'getRecipe': (level) => getRegistryEntries(RECIPE, level),
    'getDamage': (level) => getRegistryEntries(DAMAGE_TYPE, level),
    'getAttribute': (level) => getRegistryEntries(ATTRIBUTE, level),
    'getEnchantment': (level) => getRegistryEntries(ENCHANTMENT, level),
    'getBiome': (level) => getRegistryEntries(BIOME, level),
    'getStructure': (level) => getRegistryEntries(STRUCTURE, level),
    'getFluid': (level) => getRegistryEntries(FLUID, level),
    'getEffect': (level) => getRegistryEntries(EFFECT, level),
    'getTier': getTiers,
    'getAllRegistryTypes': getAllRegistryTypes,
    'getBlock': (level) => getRegistryEntries(BLOCK, level),
    'getItem': (level) => getRegistryEntries(ITEM, level),
    'getEntityType': (level) => getRegistryEntries(ENTITY_TYPE, level),
    'getPotion': (level) => getRegistryEntries(POTION, level),
    'getCustomStat': (level) => getRegistryEntries(CUSTOM_STAT, level),
    'getBlockEntityType': (level) => getRegistryEntries(BLOCK_ENTITY_TYPE, level),
    'getBannerPattern': (level) => getRegistryEntries(BANNER_PATTERN, level),
    'getRecipeSerializer': (level) => getRegistryEntries(RECIPE_SERIALIZER, level),
    'getPaintingVariant': (level) => getRegistryEntries(PAINTING_VARIANT, level),
    'getWorldPreset': (level) => getRegistryEntries(WORLD_PRESET, level),
    'getConfiguredFeature': (level) => getRegistryEntries(CONFIGURED_FEATURE, level),
    'getSensorType': (level) => getRegistryEntries(SENSOR_TYPE, level),
    'getTrimMaterial': (level) => getRegistryEntries(TRIM_MATERIAL, level),
    'getTrimPattern': (level) => getRegistryEntries(TRIM_PATTERN, level),
    'getWorldgenStructureType': (level) => getRegistryEntries(WORLDGEN_STRUCTURE_TYPE, level),
    'getSoundEvent': (level) => getRegistryEntries(SOUND_EVENT, level),
    'getBiomeModifier': (level) => getRegistryEntries(BIOME_MODIFIER, level),
    'getBlockStateProviderType': (level) => getRegistryEntries(BLOCK_STATE_PROVIDER_TYPE, level),
    'getMaterialRule': (level) => getRegistryEntries(MATERIAL_RULE, level),
    'getCommandArgumentType': (level) => getRegistryEntries(COMMAND_ARGUMENT_TYPE, level),
    'getStructurePiece': (level) => getRegistryEntries(STRUCTURE_PIECE, level),
    'getLootScoreProviderType': (level) => getRegistryEntries(LOOT_SCORE_PROVIDER_TYPE, level),
    'getPlacedFeature': (level) => getRegistryEntries(PLACED_FEATURE, level),
    'getStatType': (level) => getRegistryEntries(STAT_TYPE, level),
    'getPlacementModifierType': (level) => getRegistryEntries(PLACEMENT_MODIFIER_TYPE, level),
    'getWorldgenFeature': (level) => getRegistryEntries(WORLDGEN_FEATURE, level),
    'getGlobalLootModifierSerializers': (level) => getRegistryEntries(GLOBAL_LOOT_MODIFIER_SERIALIZERS, level),
    'getTreeDecoratorType': (level) => getRegistryEntries(TREE_DECORATOR_TYPE, level),
    'getIntProviderType': (level) => getRegistryEntries(INT_PROVIDER_TYPE, level),
    'getRuleTest': (level) => getRegistryEntries(RULE_TEST, level),
    'getNoiseSettings': (level) => getRegistryEntries(NOISE_SETTINGS, level),
    'getBiomeSource': (level) => getRegistryEntries(BIOME_SOURCE, level),
    'getDensityFunctionType': (level) => getRegistryEntries(DENSITY_FUNCTION_TYPE, level),
    'getChatType': (level) => getRegistryEntries(CHAT_TYPE, level),
    'getProcessorList': (level) => getRegistryEntries(PROCESSOR_LIST, level),
    'getPosRuleTest': (level) => getRegistryEntries(POS_RULE_TEST, level),
    'getVillagerProfession': (level) => getRegistryEntries(VILLAGER_PROFESSION, level),
    'getNoise': (level) => getRegistryEntries(NOISE, level),
    'getChunkStatus': (level) => getRegistryEntries(CHUNK_STATUS, level),
    'getStructureModifier': (level) => getRegistryEntries(STRUCTURE_MODIFIER, level),
    'getStructureProcessor': (level) => getRegistryEntries(STRUCTURE_PROCESSOR, level),
    'getFrogVariant': (level) => getRegistryEntries(FROG_VARIANT, level),
    'getPointOfInterestType': (level) => getRegistryEntries(POINT_OF_INTEREST_TYPE, level),
    'getLootConditionType': (level) => getRegistryEntries(LOOT_CONDITION_TYPE, level),
    'getLootFunctionType': (level) => getRegistryEntries(LOOT_FUNCTION_TYPE, level),
    'getRootPlacerType': (level) => getRegistryEntries(ROOT_PLACER_TYPE, level),
    'getSchedule': (level) => getRegistryEntries(SCHEDULE, level),
    'getLootPoolEntryType': (level) => getRegistryEntries(LOOT_POOL_ENTRY_TYPE, level),
    'getLootNumberProviderType': (level) => getRegistryEntries(LOOT_NUMBER_PROVIDER_TYPE, level),
    'getMultiNoiseBiomeSourceParameterList': (level) => getRegistryEntries(MULTI_NOISE_BIOME_SOURCE_PARAMETER_LIST, level),
    'getTemplatePool': (level) => getRegistryEntries(TEMPLATE_POOL, level),
    'getDimension': (level) => getRegistryEntries(DIMENSION, level),
    'getVillagerType': (level) => getRegistryEntries(VILLAGER_TYPE, level),
    'getDecoratedPotPatterns': (level) => getRegistryEntries(DECORATED_POT_PATTERNS, level),
    'getFoliagePlacerType': (level) => getRegistryEntries(FOLIAGE_PLACER_TYPE, level),
    'getGameEvent': (level) => getRegistryEntries(GAME_EVENT, level),
    'getFeatureSizeType': (level) => getRegistryEntries(FEATURE_SIZE_TYPE, level),
    'getCarver': (level) => getRegistryEntries(CARVER, level),
    'getHeightProviderType': (level) => getRegistryEntries(HEIGHT_PROVIDER_TYPE, level),
    'getDimensionType': (level) => getRegistryEntries(DIMENSION_TYPE, level),
    'getPositionSourceType': (level) => getRegistryEntries(POSITION_SOURCE_TYPE, level),
    'getStructurePlacement': (level) => getRegistryEntries(STRUCTURE_PLACEMENT, level),
    'getMemoryModuleType': (level) => getRegistryEntries(MEMORY_MODULE_TYPE, level),
    'getLootNbtProviderType': (level) => getRegistryEntries(LOOT_NBT_PROVIDER_TYPE, level),
    'getFlatLevelGeneratorPreset': (level) => getRegistryEntries(FLAT_LEVEL_GENERATOR_PRESET, level),
    'getTrunkPlacerType': (level) => getRegistryEntries(TRUNK_PLACER_TYPE, level),
    'getMenu': (level) => getRegistryEntries(MENU, level),
    'getCreativeModeTab': (level) => getRegistryEntries(CREATIVE_MODE_TAB, level),
    'getCatVariant': (level) => getRegistryEntries(CAT_VARIANT, level),
    'getSoftFluids': (level) => getRegistryEntries(SOFT_FLUIDS, level),
    'getStructureSet': (level) => getRegistryEntries(STRUCTURE_SET, level),
    'getFluidType': (level) => getRegistryEntries(FLUID_TYPE, level),
    'getParticleType': (level) => getRegistryEntries(PARTICLE_TYPE, level),
    'getInstrument': (level) => getRegistryEntries(INSTRUMENT, level),
    'getEntityDataSerializers': (level) => getRegistryEntries(ENTITY_DATA_SERIALIZERS, level),
    'getActivity': (level) => getRegistryEntries(ACTIVITY, level),
    'getMapMarkers': (level) => getRegistryEntries(MAP_MARKERS, level),
    'getChunkGenerator': (level) => getRegistryEntries(CHUNK_GENERATOR, level),
    'getStructurePoolElement': (level) => getRegistryEntries(STRUCTURE_POOL_ELEMENT, level),
    'getBlockPredicateType': (level) => getRegistryEntries(BLOCK_PREDICATE_TYPE, level),
    'getRuleBlockEntityModifier': (level) => getRegistryEntries(RULE_BLOCK_ENTITY_MODIFIER, level),
    'getTrait': (level) => getTraits(level)
}