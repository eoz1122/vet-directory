/** Interpret recorded availability without promising telephone-only clinic access. */
export function is24HourEmergency(value?: string): boolean {
    const availability = typeof value === 'string' ? value.trim() : '';
    return /^24\s*\/\s*7(?:\b|$)/i.test(availability)
        && !/telephone|phone|house calls?|home visits?|by appointment/i.test(availability);
}

export function hasEmergencyCare(value?: string): boolean {
    const availability = typeof value === 'string' ? value.trim() : '';
    if (!availability || /^(?:no|none|false|nein|n\/a)\b/i.test(availability)) return false;
    if (/referral|refer(?:s|ral)? clinics|directs? .*clinics|routing|answering machine/i.test(availability)) return false;
    return is24HourEmergency(availability) || /emergenc|urgent|weekends?|holidays?/i.test(availability);
}
