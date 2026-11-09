import { describe, expect, it } from 'vitest';
import { hasEmergencyCare, is24HourEmergency } from './emergency';

describe('emergency availability', () => {
    it.each([false, 0, null, {}])('fails closed for malformed availability: %s', (value) => {
        expect(is24HourEmergency(value as unknown as string)).toBe(false);
        expect(hasEmergencyCare(value as unknown as string)).toBe(false);
    });
    it.each(['24/7', '24/7 Emergency', '24/7 Emergency Care', '24/7 Emergency Service (call first)'])('includes clinic availability: %s', (value) => {
        expect(is24HourEmergency(value)).toBe(true);
        expect(hasEmergencyCare(value)).toBe(true);
    });

    it.each(['', 'No', 'None', 'false', 'N/A', undefined, 'Appointments by arrangement',
        'The official site lists referral clinics for emergencies',
        'Call the practice during opening hours for emergency routing',
        '24/7 telephone availability and emergency house calls; practice visits by appointment'])('does not promise a 24-hour clinic for %s', (value) => {
        expect(is24HourEmergency(value)).toBe(false);
    });

    it.each(['No', 'None', '', undefined, 'The official site directs out-of-hours cases to nearby emergency clinics'])('does not imply emergency care from %s', (value) => {
        expect(hasEmergencyCare(value)).toBe(false);
    });

    it('keeps limited emergency care separate from 24-hour care', () => {
        expect(hasEmergencyCare('Emergencies during opening hours')).toBe(true);
        expect(is24HourEmergency('Emergencies during opening hours')).toBe(false);
    });
});
