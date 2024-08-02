// priority: 150
import { $Player } from "packages/net/minecraft/world/entity/player/$Player";
const { $APIUtils } = require("packages/harmonised/pmmo/api/$APIUtils");
/**
 * @typedef {"strength" | "dexterity" | "constitution" | "intelligence" | "wisdom" | "charisma" } SkillType
 * str dex con int wis cha
 * 力量 敏捷 体质 智力 感知 魅力
 */
/**
 * @author M1hono
 * @description get the skill level of the player
 * @param {SkillType} skill str dex con int wis cha
 * 力量 敏捷 体质 智力 感知 魅力
 * @param {$Player} player the player
 * @returns {number} the level of the skill
 */
export function getSkillLevel(skill, player) {
  return $APIUtils.getLevel(skill, player);
}
