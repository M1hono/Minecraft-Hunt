// priority: 0

// WARN: You need to disable this script if you are not using it / finish using it.

/**
 * @description This script prints various information from your modpack to the console.
 * 
 * Available commands:
 * - 'GetRecipe': Prints all recipes.
 * - 'GetDamage': Prints all damage types.
 * - 'GetDamageTags': Prints all damage type tags.
 * - 'GetAttribute': Prints all attributes.
 * - 'GetEnchantment': Prints all enchantments.
 * - 'GetBiome': Prints all biomes.
 * - 'GetBiomeTags': Prints all biome tags.
 * - 'GetEffect': Prints all effects.
 * - 'GetFluid': Prints all fluids.
 * - 'GetFluidTags': Prints all fluid tags.
 * - 'GetTier': Prints all tiers.
 * - 'ListRegistries': Lists all available registries. @deprecated
 */
PlayerEvents.chat(event => {
    const { message, level } = event;

    // Load necessary classes
    const $ResourceKey = Java.loadClass("net.minecraft.resources.ResourceKey");
    const $TagKey = Java.loadClass("net.minecraft.tags.TagKey");
    const $TierSortingRegistry = Java.loadClass("net.minecraftforge.common.TierSortingRegistry");

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
        let registry = level.registryAccess().registryOrThrow(registryKey);
        let entries = registry.entrySet();
        let entrySet = new Set();

        // Get all entries and add them to the set
        let iterator = entries.iterator();
        while (iterator.hasNext()) {
            let entry = iterator.next();
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
        let registry = level.registryAccess().registryOrThrow(registryKey);
        let tags = registry.getTagNames();
        let tagSet = new Set();

        // Get all tags and add them to the set
        let iterator = tags.iterator();
        while (iterator.hasNext()) {
            let tag = iterator.next();
            let tagKey = $TagKey.create(registryKey, tag.location());
            tagSet.add(tagKey.location().toString());
        }

        // Print all tags to the console
        console.info('\n' + Array.from(tagSet).join('\n'));
    };

    /**
     * Prints all tier names to the console.
     */
    const printTiers = () => {
        const tiers = $TierSortingRegistry.getSortedTiers();
        const tierNames = tiers.map(tier => $TierSortingRegistry.getName(tier).toString());

        // Print all tier names to the console
        console.info('\n' + tierNames.join('\n'));
    };

    // Mapping of commands to their respective actions
    const commandActions = {
        'GetRecipe': () => printRegistryEntries(RECIPE),
        'GetDamage': () => printRegistryEntries(DAMAGE_TYPE),
        'GetDamageTags': () => printTags(DAMAGE_TYPE),
        'GetAttribute': () => printRegistryEntries(ATTRIBUTE),
        'GetEnchantment': () => printRegistryEntries(ENCHANTMENT),
        'GetEffect': () => printRegistryEntries(EFFECT),
        'GetBiome': () => printRegistryEntries(BIOME),
        'GetBiomeTags': () => printTags(BIOME),
        'GetFluid': () => printRegistryEntries(FLUID),
        'GetFluidTags': () => printTags(FLUID),
        'GetTier': () => printTiers()
    };

    // Execute the command.
    if (commandActions[message]) commandActions[message]();
});