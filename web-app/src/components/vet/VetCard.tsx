import React from 'react';
import { Link } from 'react-router-dom';

import type { Vet, VetWithDistance } from '../../types/vet';
import { trackVetPhoneClick, trackVetWebsiteClick } from '../../utils/analytics';
import { appendUTM, slugify } from '../../utils/url';
import { formatVerifiedLabel, isVetVerified } from '../../utils/verifiedLabel';
import { ConfirmEnglish } from './ConfirmEnglish';
import { PracticeFocus } from './PracticeFocus';
import ReportIssueLink from './ReportIssueLink';
import { VerificationBadge } from './VerificationBadge';

interface VetCardProps {
    vet: VetWithDistance;
    isSelected?: boolean;
    onSelect?: (vet: Vet) => void;
    onReportIssue?: (vet: Vet, trigger: HTMLButtonElement) => void;
    analyticsLocation?: string;
    headingLevel?: 2 | 3;
    linkDistrict?: boolean;
}

function hasMobileAddress(vet: Vet): boolean {
    return Boolean(
        vet.address &&
        (
            vet.address.includes('Mobile Service') ||
            vet.address.includes('Home Visits') ||
            vet.address === 'Unknown'
        ),
    );
}

function formatEvidenceSignal(rawSignals: string[]): string {
    const parts = rawSignals
        .flatMap((rawSignal) => rawSignal.split(';'))
        .map((part) => part.trim())
        .filter(Boolean);
    const englishSignals = parts.filter(
        (part) => /\benglish\b/i.test(part) && !/^verified english support$/i.test(part),
    );
    const signal = englishSignals.sort((first, second) => second.length - first.length)[0]
        ?? parts[0]
        ?? '';

    if (/^confirmed via google review:/i.test(signal) && !/\benglish\b/i.test(signal)) {
        return 'Community confirmation recorded; confirm English availability when booking.';
    }

    const normalized = signal
        .replace(/\s+,/g, ',')
        .replace(/-\s*"$/, '."')
        .trim();
    const quoteCount = (normalized.match(/"/g) ?? []).length;

    return quoteCount % 2 === 0 ? normalized : `${normalized}"`;
}

export const VetCard: React.FC<VetCardProps> = ({
    vet,
    isSelected = false,
    onSelect,
    onReportIssue,
    analyticsLocation = 'Home_VetCard',
    headingLevel = 2,
    linkDistrict = false,
}) => {
    const Heading = headingLevel === 3 ? 'h3' : 'h2';
    const mobileAddress = hasMobileAddress(vet);
    const hasWebsite = Boolean(vet.contact?.website);
    const hasPhone = Boolean(vet.contact?.phone);
    const hasDirectContact = hasWebsite || hasPhone;
    const isEmergency24h = vet.verification?.emergency_services === '24/7';
    const mapUrl = vet.contact?.google_maps ||
        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            `${vet.practice_name} ${mobileAddress ? vet.city : vet.address || vet.city}`,
        )}`;
    const evidenceSignal = vet.verification.english_signals?.length
        ? formatEvidenceSignal(vet.verification.english_signals)
        : null;
    const districtPath = `/vets/${slugify(vet.city)}/${slugify(vet.district)}`;

    return (
        <article
            onClick={onSelect ? () => onSelect(vet) : undefined}
            className={`group/card relative bg-white p-6 rounded-[2rem] border transition-all duration-500 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)] hover:-translate-y-1 ${
                onSelect ? 'cursor-pointer' : ''
            } ${
                isSelected
                    ? 'border-accent ring-1 ring-accent shadow-lg shadow-accent/5'
                    : 'border-primary/5 hover:border-accent/20'
            }`}
        >
            <div className="flex justify-between items-start gap-3 mb-4">
                <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 bg-primary/5 text-primary text-[9px] font-black uppercase tracking-widest rounded-full">
                            {vet.city}
                        </span>
                        {vet.district && vet.district !== 'Unknown' && (
                            linkDistrict && slugify(vet.district) !== slugify(vet.city) ? (
                                <Link
                                    to={districtPath}
                                    onClick={(event) => event.stopPropagation()}
                                    className="min-h-11 min-w-11 px-2 py-0.5 bg-accent/5 text-accent-ink text-[9px] font-black uppercase tracking-widest rounded-full hover:bg-accent/15 transition-colors inline-flex items-center"
                                    title={`All English-speaking vets in ${vet.district}`}
                                >
                                    {vet.district}
                                </Link>
                            ) : (
                                <span className="px-2 py-0.5 bg-accent/5 text-accent-ink text-[9px] font-black uppercase tracking-widest rounded-full">
                                    {vet.district}
                                </span>
                            )
                        )}
                    </div>
                    <Heading className="text-lg font-black text-primary group-hover/card:text-accent-ink transition-colors leading-tight break-words">
                        {vet.practice_name}
                    </Heading>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-2">
                    <VerificationBadge vet={vet} />
                    {vet.distance !== undefined && vet.distance !== 9999 && (
                        <span className="text-[10px] font-bold text-primary/80 bg-secondary/50 px-2 py-0.5 rounded-lg border border-primary/5">
                            📍 {vet.distance.toFixed(1)} km
                        </span>
                    )}
                </div>
            </div>

            {mobileAddress ? (
                <div className="text-[12px] text-primary/80 mb-5 font-bold leading-relaxed bg-accent/10 p-4 rounded-xl border border-accent/20 flex items-center gap-2">
                    <span aria-hidden="true">🚐</span> Mobile Service - {vet.city}
                </div>
            ) : (
                <a
                    href={mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(event) => event.stopPropagation()}
                    className="block text-[12px] text-primary/80 mb-5 font-medium leading-relaxed bg-secondary/30 p-4 rounded-xl border border-primary/5 group-hover/card:bg-secondary/40 transition-colors hover:text-accent-ink hover:border-accent/30"
                >
                    {vet.address}
                </a>
            )}

            <PracticeFocus practiceFocus={vet.practice_focus} />

            {evidenceSignal && (
                <div className="space-y-2 mb-6">
                    <div className="flex gap-3 items-start group/signal">
                        <div className="mt-1 flex-shrink-0 w-4 h-4 bg-accent rounded-full flex items-center justify-center shadow-lg shadow-accent/20">
                            <svg className="w-2.5 h-2.5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <p className="text-[11px] text-primary/80 italic leading-snug group-hover/signal:text-primary transition-colors break-words">
                            {evidenceSignal}
                        </p>
                    </div>
                    {vet.verification?.emergency_services === '24/7' && (
                        <div className="flex gap-3 items-start">
                            <div className="mt-1 flex-shrink-0 w-4 h-4 bg-red-100 rounded-full flex items-center justify-center">
                                <span className="text-[10px]" aria-hidden="true">🚑</span>
                            </div>
                            <p className="text-[11px] text-red-700 font-bold leading-snug">
                                24h Emergency Service
                            </p>
                        </div>
                    )}
                </div>
            )}

            {!hasDirectContact && (
                <p className="mb-2 text-[11px] font-semibold text-primary/80">
                    No direct website or phone listed
                </p>
            )}

            <div className="flex flex-wrap gap-3">
                {hasPhone && (
                    <a
                        href={`tel:${vet.contact.phone}`}
                        onClick={(event) => {
                            event.stopPropagation();
                            trackVetPhoneClick(vet.id, vet.city, analyticsLocation);
                        }}
                        aria-label={`Call ${vet.practice_name}`}
                        className={`min-h-11 py-3 text-center text-[11px] font-black uppercase tracking-widest rounded-xl transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2 ${
                            isEmergency24h
                                ? 'w-full bg-red-600 text-white hover:bg-red-700 shadow-red-600/15'
                                : 'flex-1 bg-primary text-secondary hover:bg-primary/95 shadow-primary/10'
                        }`}
                    >
                        <span aria-hidden="true">📞</span> Call Practice
                    </a>
                )}

                {hasWebsite && (
                    <a
                        href={appendUTM(vet.contact.website!)}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Visit ${vet.practice_name} website`}
                        onClick={(event) => {
                            event.stopPropagation();
                            trackVetWebsiteClick(vet.id, vet.city, analyticsLocation);
                        }}
                        className={`min-h-11 flex-1 py-3 text-center text-[11px] font-black uppercase tracking-widest rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2 ${
                            hasPhone
                                ? 'bg-white border border-primary/15 text-primary hover:border-primary/40 hover:bg-gray-50'
                                : 'bg-primary text-secondary hover:bg-primary/95 shadow-xl shadow-primary/10'
                        }`}
                    >
                        <span aria-hidden="true">🌐</span> Visit Website
                    </a>
                )}

                <a
                    href={mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={
                        hasDirectContact
                            ? `View ${vet.practice_name} on Google Maps`
                            : `Search for ${vet.practice_name} on Google Maps`
                    }
                    onClick={(event) => event.stopPropagation()}
                    className={`min-h-11 px-4 py-3 text-center text-[11px] font-black uppercase tracking-widest bg-white border border-primary/15 text-primary rounded-xl hover:bg-gray-50 transition-all hover:border-primary/40 flex items-center justify-center gap-2 ${
                        hasDirectContact ? 'min-w-11' : 'flex-1'
                    }`}
                >
                    <span aria-hidden="true">📍</span>
                    {!hasDirectContact && <span>Search on Google Maps</span>}
                </a>

                {onSelect && (
                    <button
                        type="button"
                        aria-label={`Show ${vet.practice_name} on the directory map`}
                        aria-pressed={isSelected}
                        onClick={(event) => {
                            event.stopPropagation();
                            onSelect(vet);
                        }}
                        className="hidden md:inline-flex min-h-11 min-w-11 px-3 py-3 items-center justify-center rounded-xl border border-primary/15 bg-white text-primary hover:border-accent/40 hover:text-accent-ink transition-colors"
                    >
                        ◎
                    </button>
                )}
            </div>

            <ConfirmEnglish vet={vet} />

            <div className="mt-3 flex justify-between items-center gap-3 pt-2 border-t border-primary/10">
                <span className="text-[10px] text-gray-600">
                    {isVetVerified(vet)
                        ? `Verified: ${formatVerifiedLabel(vet.verification?.last_scanned)}`
                        : 'English availability: confirm when booking'}
                </span>
                {onReportIssue ? (
                    <button
                        type="button"
                        aria-label={`Report issue for ${vet.practice_name}`}
                        onClick={(event) => {
                            event.stopPropagation();
                            onReportIssue(vet, event.currentTarget);
                        }}
                        className="min-h-11 px-2 text-gray-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-colors flex items-center justify-center gap-1"
                    >
                        <span className="text-[10px] font-semibold">Report issue</span>
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </button>
                ) : (
                    <ReportIssueLink
                        vetId={vet.id}
                        vetName={vet.practice_name}
                        reason="Data Incorrect"
                        onClick={(event) => event.stopPropagation()}
                        aria-label={`Report issue for ${vet.practice_name}`}
                        className="px-2 text-gray-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-colors gap-1"
                    >
                        <span className="text-[10px] font-semibold">Report issue</span>
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </ReportIssueLink>
                )}
            </div>
        </article>
    );
};
