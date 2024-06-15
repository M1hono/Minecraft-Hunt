/**
 * @author M1hono
 * @description This script prints all the information needed of your modpack to the console.
 */
PlayerEvents.chat(event => {

    const { message , level } = event;

    // Get Registry Key of Resourcekey through Reflection.
    // Should be able to be replaced to any resource key that you want to get.
    let $ResourceKey = Java.loadClass("net.minecraft.resources.ResourceKey");
    let DAMAGE_TYPE = $ResourceKey.createRegistryKey("damage_type");
    let ATTRIBUTE = $ResourceKey.createRegistryKey("attribute");
    let ENCHANTMENT = $ResourceKey.createRegistryKey("enchantment");
    // Load necessary classes for Tier handling
    let $TierSortingRegistry = Java.loadClass("net.minecraftforge.common.TierSortingRegistry");

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

    /** @param {string} message - 'GetDamage' - You can change it into any message you want to trigger the event. */ 
    if (message === 'GetDamage') {
        printRegistryEntries(DAMAGE_TYPE);
    }

    /** @param {string} message - 'GetAttribute' - You can change it into any message you want to trigger the event. */ 
    if (message === 'GetAttribute') {
        printRegistryEntries(ATTRIBUTE);
    }

    /** @param {string} message - 'GetEnchantment' - You can change it into any message you want to trigger the event. */
    if (message === 'GetEnchantment') {
        printRegistryEntries(ENCHANTMENT);
    }

    /** @param {string} message - 'GetTier' - You can change it into any message you want to trigger the event. */ 
    if (message === 'GetTier') {
        printTiers();
    }
});
