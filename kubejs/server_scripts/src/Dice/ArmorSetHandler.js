// priority: 150
import { getUniqueCuriosItems, isPlayerWearingItem } from "../API/Curios";
import { PlayerAttributeManager } from "./AttributeManager";
const { $Player } = require("packages/net/minecraft/world/entity/player/$Player");
const { $CompoundTag } = require("packages/net/minecraft/nbt/$CompoundTag");

export const SetBonusManager = {
    setDefinitions: {},

    defineSet: function(setName, definition) {
        this.setDefinitions[setName] = definition;
        return this;
    },

    updatePlayerSetBonus: function(player) {
        this._initializePlayerData(player);
        const equippedItems = this._getEquippedItems(player);
        const curiosItems = getUniqueCuriosItems(player);
        let newActiveSet = "default";
        for (const [setName, definition] of Object.entries(this.setDefinitions)) {
            if (this._checkSetRequirements(player, equippedItems, curiosItems, definition)) {
                newActiveSet = setName;
                break;
            }
        }
        const currentActiveSet = player.persistentData.getString("activeSetBonus");
        if (newActiveSet !== currentActiveSet) {
            this._removeSetBonus(player, currentActiveSet);
            if (newActiveSet !== "default") {
                this._applySetBonus(player, newActiveSet);
            }
        }
        player.persistentData.putString("activeSetBonus", newActiveSet);
    },

    _initializePlayerData: function(player) {
        if (!player.persistentData.contains("activeSetBonus")) {
            player.persistentData.putString("activeSetBonus", "default");
        }
        PlayerAttributeManager.initializeAttributes(player);
    },

    _getEquippedItems: function(player) {
        const equipped = {};
        const slots = ["chest", "feet", "head", "legs", "mainhand", "offhand"];
        slots.forEach(slot => {
            const item = player.getEquipment(slot);
            if (!item.isEmpty()) {
                equipped[slot] = item.getId();
            }
        });
        return equipped;
    },

    _checkSetRequirements: function(player, equippedItems, curiosItems, definition) {
        const requiredEquipment = definition.requiredEquipment || {};
        const requiredCurios = definition.requiredCurios || [];

        const equipmentCheck = Object.entries(requiredEquipment).every(([slot, id]) => 
            equippedItems[slot] === id
        );

        const curiosCheck = requiredCurios.every(id => 
            isPlayerWearingItem(player, id)
        );

        if (definition.customCheck) {
            return equipmentCheck && curiosCheck && definition.customCheck(player, equippedItems, curiosItems);
        }

        return equipmentCheck && curiosCheck;
    },

    _applySetBonus: function(player, setName) {
        if (setName === "default") return;

        const bonuses = this.setDefinitions[setName].bonuses;
        for (const [attribute, value] of Object.entries(bonuses)) {
            PlayerAttributeManager.addAttribute(player, attribute, value);
            console.log(`Applying ${value} to ${attribute} for ${setName}`);
        }
    },

    _removeSetBonus: function(player, setName) {
        if (setName === "default") return;

        const bonuses = this.setDefinitions[setName].bonuses;
        for (const [attribute, value] of Object.entries(bonuses)) {
            PlayerAttributeManager.subtractAttribute(player, attribute, value);
        }
    },

    getActiveSet: function(player) {
        return player.persistentData.getString("activeSetBonus") || "default";
    }
};
SetBonusManager.defineSet("test1", {
    requiredEquipment: {
        "chest": "minecraft:diamond_chestplate",
        "legs": "minecraft:diamond_leggings"
    },
    requiredCurios: [
        "l2hostility:ring_of_corrosion",
        "l2hostility:ring_of_healing"
    ],
    bonuses: {
        "minecraft:generic.max_health": 10,
        "minecraft:generic.armor": 5
    }
});
SetBonusManager.defineSet("test2", {
    requiredEquipment: {
        "head": "minecraft:diamond_helmet",
        "chest": "minecraft:diamond_chestplate",
        "legs": "minecraft:diamond_leggings",
        "feet": "minecraft:diamond_boots"
    },
    requiredCurios: [
        "l2hostility:ring_of_healing"
    ],
    bonuses: {
        "minecraft:generic.max_health": 3,
        "minecraft:generic.armor": 2
    }
});