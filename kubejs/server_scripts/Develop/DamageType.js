/**
 * @author M1hono
 * @description This script prints all the damage types of your modpack to the console.
 */
PlayerEvents.chat(event => {
    // Get Registry Key of DamageType through Reflection.
    // Should be able to be replaced to any resource key that you want to get.
    let $ResourceKey = Java.loadClass("net.minecraft.resources.ResourceKey");
    let DAMAGE_TYPE = $ResourceKey.createRegistryKey("damage_type");

    /** @param {string} message - 'DamegeType' - You can change it into any message you want to trigger the event. */ 
    if (event.message === 'GetDamage') {
        // Get registry through registry key of damage_type.
        let registry = event.level.registryAccess().registryOrThrow(DAMAGE_TYPE);
        let entries = registry.entrySet();
        let damageTypes = new Set();

        // Get all damage types and add them to the set.
        for (let entry of entries) {
            let resourceKey = entry.getKey();
            damageTypes.add(resourceKey.location().toString());
        }

        // Print all damage types to the console.
        let allDamageTypes = '\n' + Array.from(damageTypes).join('\n');
        console.info(allDamageTypes);
    }
});
