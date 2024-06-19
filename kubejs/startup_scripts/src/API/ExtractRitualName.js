/**
 * 
 * @param {string} ritualId 
 * @returns {string} - ritualName
 */
export function extractRitualName(ritualId) {
    const parts = ritualId.split(':');
    if (parts.length > 1) {
        return parts[1].split('/').pop();
    } else {
        return ritualId.split('/').pop();
    }
}