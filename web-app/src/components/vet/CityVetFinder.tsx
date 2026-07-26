import { useMemo, useState } from 'react';

import type { Vet } from '../../types/vet';
import { VetCard } from './VetCard';

type EvidenceFilter = 'all' | 'official_website' | 'government_source' | 'community';

interface CityVetFinderProps {
    city: string;
    vets: Vet[];
}

const ALL_DISTRICTS = 'all';

function includesSearchTerm(vet: Vet, searchTerm: string): boolean {
    if (!searchTerm) return true;

    return [
        vet.practice_name,
        vet.address,
        vet.district,
    ].some((value) => value?.toLocaleLowerCase().includes(searchTerm));
}

function matchesEvidence(vet: Vet, evidence: EvidenceFilter): boolean {
    if (evidence === 'all') return true;

    return (vet.verification.evidence_type ?? 'community') === evidence;
}

export function CityVetFinder({ city, vets }: CityVetFinderProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [district, setDistrict] = useState(ALL_DISTRICTS);
    const [evidence, setEvidence] = useState<EvidenceFilter>('all');
    const [emergencyOnly, setEmergencyOnly] = useState(false);

    const districts = useMemo(
        () => Array.from(new Set(
            vets
                .map((vet) => vet.district)
                .filter((value) => value && value !== 'Unknown'),
        )).sort((left, right) => left.localeCompare(right, 'en')),
        [vets],
    );

    const normalizedSearchTerm = searchTerm.trim().toLocaleLowerCase();
    const filteredVets = useMemo(
        () => vets.filter((vet) =>
            includesSearchTerm(vet, normalizedSearchTerm) &&
            (district === ALL_DISTRICTS || vet.district === district) &&
            matchesEvidence(vet, evidence) &&
            (!emergencyOnly || vet.verification.emergency_services === '24/7'),
        ),
        [district, emergencyOnly, evidence, normalizedSearchTerm, vets],
    );

    const hasActiveFilters = Boolean(
        normalizedSearchTerm ||
        district !== ALL_DISTRICTS ||
        evidence !== 'all' ||
        emergencyOnly,
    );

    const resetFilters = () => {
        setSearchTerm('');
        setDistrict(ALL_DISTRICTS);
        setEvidence('all');
        setEmergencyOnly(false);
    };

    return (
        <div className="space-y-6">
            <form
                role="search"
                aria-label={`Filter ${city} vets`}
                onSubmit={(event) => event.preventDefault()}
                className="rounded-3xl border border-primary/10 bg-white/70 p-4 shadow-sm md:p-6"
            >
                <div className="mb-5">
                    <h3 className="text-lg font-black text-primary">Find the right practice</h3>
                    <p className="mt-1 text-sm leading-relaxed text-primary/80">
                        Search locally, narrow by district, or compare how English support was confirmed.
                    </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <label className="space-y-2 md:col-span-2">
                        <span className="block text-xs font-bold uppercase tracking-widest text-primary/80">
                            Search
                        </span>
                        <input
                            type="search"
                            aria-label={`Search ${city} vets`}
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.target.value)}
                            placeholder="Practice, address, or district"
                            className="min-h-11 w-full rounded-xl border border-primary/15 bg-white px-4 text-sm text-primary outline-none transition-colors placeholder:text-primary/50 focus:border-accent focus:ring-4 focus:ring-accent/10"
                        />
                    </label>

                    <label className="space-y-2">
                        <span className="block text-xs font-bold uppercase tracking-widest text-primary/80">
                            District
                        </span>
                        <select
                            aria-label="Filter by district"
                            value={district}
                            onChange={(event) => setDistrict(event.target.value)}
                            className="min-h-11 w-full rounded-xl border border-primary/15 bg-white px-4 text-sm font-semibold text-primary outline-none transition-colors focus:border-accent focus:ring-4 focus:ring-accent/10"
                        >
                            <option value={ALL_DISTRICTS}>All districts</option>
                            {districts.map((districtName) => (
                                <option key={districtName} value={districtName}>
                                    {districtName}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label className="space-y-2">
                        <span className="block text-xs font-bold uppercase tracking-widest text-primary/80">
                            Evidence
                        </span>
                        <select
                            aria-label="Filter by evidence source"
                            value={evidence}
                            onChange={(event) => setEvidence(event.target.value as EvidenceFilter)}
                            className="min-h-11 w-full rounded-xl border border-primary/15 bg-white px-4 text-sm font-semibold text-primary outline-none transition-colors focus:border-accent focus:ring-4 focus:ring-accent/10"
                        >
                            <option value="all">All evidence sources</option>
                            <option value="official_website">Official website</option>
                            <option value="government_source">Government source</option>
                            <option value="community">Community evidence</option>
                        </select>
                    </label>

                    <button
                        type="button"
                        aria-label={
                            emergencyOnly
                                ? 'Show all emergency availability'
                                : 'Show only 24-hour emergency practices'
                        }
                        aria-pressed={emergencyOnly}
                        onClick={() => setEmergencyOnly((current) => !current)}
                        className={`min-h-11 rounded-xl border px-4 text-sm font-bold transition-colors ${
                            emergencyOnly
                                ? 'border-red-600 bg-red-600 text-white'
                                : 'border-primary/15 bg-white text-primary hover:border-red-500 hover:text-red-700'
                        }`}
                    >
                        <span aria-hidden="true">🚑</span>{' '}
                        24-hour emergency
                    </button>

                    <button
                        type="button"
                        aria-label="Reset vet filters"
                        onClick={resetFilters}
                        disabled={!hasActiveFilters}
                        className="min-h-11 rounded-xl border border-primary/15 bg-white px-4 text-sm font-bold text-primary transition-colors hover:border-accent hover:text-accent-ink disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Reset filters
                    </button>
                </div>
            </form>

            <div
                aria-live="polite"
                className="flex flex-wrap items-center justify-between gap-2"
            >
                <p className="text-sm font-black text-primary">
                    {filteredVets.length}{' '}
                    {filteredVets.length === 1 ? 'practice' : 'practices'} shown
                </p>
                {hasActiveFilters && (
                    <p className="text-xs font-semibold text-primary/70">
                        From {vets.length} in {city}
                    </p>
                )}
            </div>

            <div
                role="region"
                aria-label={`${city} vet results`}
                className="grid gap-6 md:grid-cols-2"
            >
                {filteredVets.map((vet) => (
                    <div
                        key={vet.id}
                        style={{
                            contentVisibility: 'auto',
                            containIntrinsicSize: 'auto 440px',
                        }}
                    >
                        <VetCard
                            vet={vet}
                            analyticsLocation="CityVets_Page"
                            headingLevel={3}
                            linkDistrict
                        />
                    </div>
                ))}
            </div>

            {filteredVets.length === 0 && (
                <div className="rounded-3xl border border-primary/10 bg-white p-8 text-center">
                    <p className="font-bold text-primary">No practices match these filters.</p>
                    <p className="mt-2 text-sm text-primary/70">
                        Try another district or clear the filters to see every listing in {city}.
                    </p>
                    <button
                        type="button"
                        onClick={resetFilters}
                        className="mt-5 min-h-11 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-secondary transition-opacity hover:opacity-90"
                    >
                        Show all practices
                    </button>
                </div>
            )}
        </div>
    );
}
