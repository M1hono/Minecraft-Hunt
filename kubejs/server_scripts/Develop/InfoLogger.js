// WARN: You need to disable this script if you are not using it / finish using it.
// Or You could keep it as it has been developed into commands.

/**
 * @author M1hono
 * @description This script prints various information from your modpack to the console.
 */
ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments } = event;

    // List of available actions
    const availableActions = [
        'getRecipe', // Prints all recipes
        'getDamage', // Prints all damage types
        'getAttribute', // Prints all attributes
        'getEnchantment', // Prints all enchantments
        'getTier', // Prints all tiers
        'getBiome', // Prints all biomes
        'getFluid', // Prints all fluids
        'getFluidTags', // Prints all fluid tags
        'getDamageTypeTags' // Prints all damage type tags
    ];

    event.register(
        Commands.literal("info")
        .then(Commands.argument('action', Arguments.STRING.create(event))
            .suggests((context, builder) => {
                availableActions.forEach(action => builder.suggest(action));
                return builder.buildFuture();
            })
            .requires(src => src.hasPermission(2))
            .executes(ctx => {
                // Generate basic autocomplete
                const action = Arguments.STRING.getResult(ctx, "action");
                const source = ctx.source;
                const server = source.getServer();
                const level = source.getLevel();

                if (commandActions[action]) {
                    let result = commandActions[action](level);
                    if (typeof result === 'object' && result !== null) {
                        // Reload server scripts to Clear previous output.
                        server.runCommandSilent("kubejs reload server_scripts");
                        if (action === 'getTier') {
                            console.info(action + ":\n" + result.join('\n'));
                        } else {
                        console.info(action + ":\n" + Array.from(result).join('\n'));
                        }
                    }
                    source.sendSuccess("Output printed to console for " + action, false);
                    return 1;
                } else {
                    source.sendSuccess("Invalid command action.", false);
                    return 0;
                }
            })
        )
    );
});

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
 * Gets all entries from a given registry key.
 * @param {ResourceKey} registryKey - The registry key to get entries from.
 * @param {Object} level - The level object.
 * @returns {Set} - A set of entries.
 */
const getRegistryEntries = (registryKey, level) => {
    const registry = level.registryAccess().registryOrThrow(registryKey);
    const entries = registry.entrySet();
    let entrySet = new Set();

    // Convert the entries iterator to an array for easier iteration
    entries.forEach(entry => {
        entrySet.add(entry.getKey().location().toString());
    });

    return entrySet;
};

/**
 * Gets all tags from a given registry.
 * @param {ResourceKey} registryKey - The registry key to get tags from.
 * @param {Object} level - The level object.
 * @returns {Set} - A set of tags.
 */
const getTags = (registryKey, level) => {
    const registry = level.registryAccess().registryOrThrow(registryKey);
    const tags = registry.getTagNames();
    let tagSet = new Set();

    // Convert the tags iterator to an array for easier iteration
    tags.forEach(tag => {
        let tagKey = $TagKey.create(registryKey, tag.location());
        tagSet.add(tagKey.location().toString());
    });

    return tagSet;
};

/**
 * Gets all tier names, including custom KubeJS tiers.
 * @returns {Set} - A set of tier names.
 */
const getTiers = () => {
    const tiers = $TierSortingRegistry.getSortedTiers();
    let tierNames = tiers.map(tier => $TierSortingRegistry.getName(tier).toString());

    const customToolTiers = $ItemBuilder.TOOL_TIERS.keySet().toArray();
    const customArmorTiers = $ItemBuilder.TOOL_TIERS.keySet().toArray();

    customToolTiers.forEach(tier => tierNames.push(tier.toString()));
    customArmorTiers.forEach(tier => tierNames.push(tier.toString()));

    return tierNames;
};

// Mapping of commands to their respective actions
const commandActions = {
    'getRecipe': (level) => getRegistryEntries(RECIPE, level),
    'getDamage': (level) => getRegistryEntries(DAMAGE_TYPE, level),
    'getAttribute': (level) => getRegistryEntries(ATTRIBUTE, level),
    'getEnchantment': (level) => getRegistryEntries(ENCHANTMENT, level),
    'getBiome': (level) => getRegistryEntries(BIOME, level),
    'getFluid': (level) => getRegistryEntries(FLUID, level),
    'getEffect': (level) => getRegistryEntries(EFFECT, level),
    'getTier': () => getTiers(),
    'getFluidTags': (level) => getTags(FLUID, level),
    'getDamageTypeTags': (level) => getTags(DAMAGE_TYPE, level)
};