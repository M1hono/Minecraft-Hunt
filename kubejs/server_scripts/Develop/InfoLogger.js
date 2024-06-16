/**
 * @author M1hono
 * @description This script prints various information from your modpack to the console.
 * 
 * Available commands:
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

    // Get Registry Key of ResourceKey through Reflection.
    const $ResourceKey = Java.loadClass("net.minecraft.resources.ResourceKey");
    const $TierSortingRegistry = Java.loadClass("net.minecraftforge.common.TierSortingRegistry");

    // Utility function to create registry keys
    function createRegistryKey(name) {
        return $ResourceKey.createRegistryKey(name);
    }

    // Create registry keys for the resources we are interested in
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
    function printRegistryEntries(registryKey) {
        let registry = level.registryAccess().registryOrThrow(registryKey);
        let entries = registry.entrySet();
        let entrySet = new Set();

        // Get all entries and add them to the set.
        for (let entry of entries) {
            let resourceKey = entry.getKey();
            entrySet.add(resourceKey.location().toString());
        }

        // Print all entries to the console.
        let allEntries = '\n' + Array.from(entrySet).join('\n');
        console.info(allEntries);
    }

    /**
     * Prints all tier names to the console.
     */
    function printTiers() {
        let tiers = $TierSortingRegistry.getSortedTiers();
        let tierNames = tiers.map(tier => $TierSortingRegistry.getName(tier).toString());

        // Print all tier names to the console.
        let allTiers = '\n' + tierNames.join('\n');
        console.info(allTiers);
    }

    /** 
     * Handle different chat messages to trigger the corresponding actions.
     * @param {string} message - The chat message to trigger the event.
     */
    if (message === 'GetDamage') {
        printRegistryEntries(DAMAGE_TYPE);
    }

    if (message === 'GetAttribute') {
        printRegistryEntries(ATTRIBUTE);
    }

    if (message === 'GetEnchantment') {
        printRegistryEntries(ENCHANTMENT);
    }

    if (message === 'GetBiome') {
        printRegistryEntries(BIOME);
    }

    if (message === 'GetFluid') {
        printRegistryEntries(FLUID);
    }

    if (message === 'GetEffect') {
        printRegistryEntries(EFFECT);
    }

    if (message === 'GetTier') {
        printTiers();
    }
});
