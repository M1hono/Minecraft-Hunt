// priority: 101
const { $Player_ } = require("packages/net/minecraft/world/entity/player/$Player")
const { extractName } = require("../API/ExtractName")
/**
 * @description A set of actions when players complete the ritual.
 * @param { $RitualCompleteEvent_ } event
 */
global.ritualComplete = (event) => {

    /** @type {string}*/
    let ritual = extractName(event.getRitual().getRegistryId().toString())
    /** @type {$Player_}*/
    let caster = event.getCaster()
    /** @type {string}*/
    let casterName = event.getCaster().getName().getString()

    switch (ritual) {
        case 'wandering_wizard':
            caster.tell(`You have completed the ritual: ${ritual}`)
            caster.tell(`Test`)
            caster.tell(`Test2`)
            break;
        case '':

            break;
        default:
            break;
    }
}