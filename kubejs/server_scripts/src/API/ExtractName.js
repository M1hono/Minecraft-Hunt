/**
 * @description Extracts recipe name from the recipe path.
 * @param {string} Id 
 * @returns {string} - recipeName
 */
export function extractName(Id) {
    const parts = Id.split(':');
    if (parts.length > 1) {
        return parts[1].split('/').pop();
    } else {
        return Id.split('/').pop();
    }
}