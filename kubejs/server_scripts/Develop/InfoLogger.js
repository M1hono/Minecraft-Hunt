// priority: 0
/**
 * @author M1hono
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
 * - 'ListRegistries': Lists all available registries.
 */
PlayerEvents.chat(event => {
    const { message, level } = event;

    // Load necessary classes
    const $ResourceKey = Java.loadClass("net.minecraft.resources.ResourceKey");
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
        const registry = level.registryAccess().registryOrThrow(registryKey);
        const entries = registry.entrySet();
        const entrySet = new Set();

        // Get all entries and add them to the set
        entries.forEach(entry => entrySet.add(entry.getKey().location().toString()));

        // Print all entries to the console
        console.info('\n' + Array.from(entrySet).join('\n'));
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
        'GetAttribute': () => printRegistryEntries(ATTRIBUTE),
        'GetEnchantment': () => printRegistryEntries(ENCHANTMENT),
        'GetBiome': () => printRegistryEntries(BIOME),
        'GetFluid': () => printRegistryEntries(FLUID),
        'GetEffect': () => printRegistryEntries(EFFECT),
        'GetTier': () => printTiers()
    };

    // Execute the appropriate action based on the chat message
    if (commandActions[message]) {
        commandActions[message]();
    }
});
