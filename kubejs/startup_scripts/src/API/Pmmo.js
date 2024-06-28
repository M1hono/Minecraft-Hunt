// priority: 101
import { $Player } from "packages/net/minecraft/world/entity/player/$Player";
const { $APIUtils } = require("packages/harmonised/pmmo/api/$APIUtils");
/**
 * @typedef {"strength" | "dexterity" | "constitution" | "intelligence" | "wisdom" | "charisma" } SkilType
 * str dex con int wis cha
 * 力量 敏捷 体质 智力 感知 魅力
 */
/**
 * 
 * @param {SkilType} skill 
 * @param {$Player} player 
 * @returns 
 */
export function getSkillLevel(skill , player) {
    return $APIUtils.getLevel(skill , player)
}