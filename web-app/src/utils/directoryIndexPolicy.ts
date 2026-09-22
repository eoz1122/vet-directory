/**
 * A district route needs more than a single practice card to stand on its
 * own as a useful search landing page. City pages remain indexable and still
 * link to these practices directly.
 */
export const MIN_INDEXABLE_DISTRICT_LISTINGS = 2;

export function shouldIndexDistrict(listingCount: number): boolean {
    return listingCount >= MIN_INDEXABLE_DISTRICT_LISTINGS;
}
