/**
 * @description Extracts the ritual name from the ritualId
 * @param {string} Id 
 * @returns {string} - ritualName
 */
export function extractName(Id) {
    const parts = Id.split(':');
    if (parts.length > 1) {
        return parts[1].split('/').pop();
    } else {
        return Id.split('/').pop();
    }
}