const UUID = Java.loadClass('java.util.UUID');
const $UUIDUtil = Java.loadClass('net.minecraft.core.UUIDUtil');
/**
 * @description Return a random UUID.
 * @returns {UUID}
 */
export let randomUUID = () => UUID.randomUUID();
/**
 * @description Convert a UUID to the IntegerArray that nbt can use.
 * @param {UUID} uuid
 * @returns {Array.<integer>}
 */
export let toNBTUUID = (uuid) => $UUIDUtil.uuidToIntArray(uuid);
/**
 * @description Check the entity by UUID.
 * @param {UUID}
 * @returns {$Entity_}
 */
export let entityByUUID = (uuid) => {
    Utils.server.getEntities().forEach(entity => {
        if (entity.uuid.equals(uuid)) return entity;
        return null;
    });
}