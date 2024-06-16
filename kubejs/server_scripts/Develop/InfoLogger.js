// priority: 0

// WARN: You need to disable this script if you are not using it / finish using it.

/**
 * @description This script prints various information from your modpack to the console.
 * 
 * Available commands:
 * - 'GetRecipe': Prints all recipes.
 * - 'GetDamage': Prints all damage types.
 * - 'GetAttribute': Prints all attributes.
 * - 'GetEnchantment': Prints all enchantments.
 * - 'GetTier': Prints all tiers.
 * - 'GetBiome': Prints all biomes.
 * - 'GetFluid': Prints all fluids.
 * - 'GetFluidTags': Prints all fluid tags.
 * - 'GetDamageTypeTags': Prints all damage type tags.
 * - 'ListRegistries': Lists all available registries. @deprecated
 */
PlayerEvents.chat(event => {
    const { message, level } = event;

    // Load necessary classes
    const $ResourceKey = Java.loadClass("net.minecraft.resources.ResourceKey");
    const $TagKey = Java.loadClass("net.minecraft.tags.TagKey");
    const $TierSortingRegistry = Java.loadClass("net.minecraftforge.common.TierSortingRegistry");
    const $ItemBuilder = Java.loadClass("dev.latvian.mods.kubejs.item.ItemBuilder");

    // Utility function to create registry keys
    const createRegistryKey = (name) => $ResourceKey.createRegistryKey(name);

    // Create registry keys for the resources we are interested in
    const RECIPE = createRegistryKey("recipe_type");
    const DAMAGE_TYPE = createRegistryKey("damage_type");
    const ATTRIBUTE = createRegistryKey("attribute");
    const ENCHANTMENT = createRegistryKey("enchantment");
    const BIOME = createRegistryKey("worldgen/biome");
    const FLUID = createRegistryKey("fluid");
    const EFFECT = createRegistryKey("mob_effect");

    /**
     * Prints all entries from a given registry key to the console.
     * @param {ResourceKey} registryKey - The registry key to get entries from.
     */
    const printRegistryEntries = (registryKey) => {
        const registry = level.registryAccess().registryOrThrow(registryKey);
        const entries = registry.entrySet();
        const entrySet = new Set();

        // Get all entries and add them to the set
        const iterator = entries.iterator();
        while (iterator.hasNext()) {
            const entry = iterator.next();
            entrySet.add(entry.getKey().location().toString());
        }

        // Print all entries to the console
        console.info('\n' + Array.from(entrySet).join('\n'));
    };

    /**
     * Prints all tags from a given registry to the console.
     * @param {ResourceKey} registryKey - The registry key to get tags from.
     */
    const printTags = (registryKey) => {
        const registry = level.registryAccess().registryOrThrow(registryKey);
        const tags = registry.getTagNames();
        const tagSet = new Set();

        // Get all tags and add them to the set
        const iterator = tags.iterator();
        while (iterator.hasNext()) {
            const tag = iterator.next();
            const tagKey = $TagKey.create(registryKey, tag.location());
            tagSet.add(tagKey.location().toString());
        }

        // Print all tags to the console
        console.info('\n' + Array.from(tagSet).join('\n'));
    };

    /**
     * Prints all tier names to the console, including custom KubeJS tiers.
     */
    const printTiers = () => {
        const tiers = $TierSortingRegistry.getSortedTiers();
        const tierNames = tiers.map(tier => $TierSortingRegistry.getName(tier).toString());

        // Add custom KubeJS tiers
        const customToolTiers = $ItemBuilder.TOOL_TIERS.keySet().toArray();
        const customArmorTiers = $ItemBuilder.ARMOR_TIERS.keySet().toArray();

        customToolTiers.forEach(tier => tierNames.push(tier.toString()));
        customArmorTiers.forEach(tier => tierNames.push(tier.toString()));

        // Print all tier names to the console
        console.info('\n' + tierNames.join('\n'));
    };

    // Mapping of commands to their respective actions
    const commandActions = {
        'GetRecipe': () => printRegistryEntries(RECIPE),
        'GetDamage': () => printRegistryEntries(DAMAGE_TYPE),
        'GetAttribute': () => printRegistryEntries(ATTRIBUTE),
        'GetEnchantment': () => printRegistryEntries(ENCHANTMENT),
        'GetBiome': () => printRegistryEntries(BIOME),
        'GetFluid': () => printRegistryEntries(FLUID),
        'GetEffect': () => printRegistryEntries(EFFECT),
        'GetTier': () => printTiers(),
        'GetFluidTags': () => printTags(FLUID),
        'GetDamageTypeTags': () => printTags(DAMAGE_TYPE)
    };

    // Execute the command.
    if (commandActions[message]) commandActions[message]();
});
