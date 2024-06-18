/**
 * Converts a UUID string to NBT format.
 * @param {string} uuid 
 * @returns {string}
 */
function toNBTUUID(uuid) {
    return `[I;${uuid.replace(/-/g, '').match(/.{8}/g).map(str => Number.parseInt(str, 16)).map(num => num & 0x80000000 ? num - 0xffffffff - 1 : num).join(',')}]`;
}