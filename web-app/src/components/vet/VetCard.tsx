import React from 'react';
import type { Vet, VetWithDistance } from '../../types/vet';
import { appendUTM } from '../../utils/url';

interface VetCardProps {
    vet: VetWithDistance;
    isSelected: boolean;
    onSelect: (vet: Vet) => void;
    onReportIssue: (vet: Vet) => void;
}

export const VetCard: React.FC<VetCardProps> = ({ vet, isSelected, onSelect, onReportIssue }) => {
    return (
        <article
            onClick={() => onSelect(vet)}
            className={`group/card relative bg-white p-6 rounded-[2rem] border transition-all duration-500 cursor-pointer shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)] hover:-translate-y-1 ${isSelected ? 'border-accent ring-1 ring-accent shadow-lg shadow-accent/5' : 'border-primary/5 hover:border-accent/20'
                }`}
        >
            <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 bg-primary/5 text-primary text-[9px] font-black uppercase tracking-widest rounded-full">
                            {vet.city}
                        </span>
                        {vet.district && vet.district !== "Unknown" && (
                            <span className="px-2 py-0.5 bg-accent/5 text-accent text-[9px] font-black uppercase tracking-widest rounded-full">
                                {vet.district}
                            </span>
                        )}
                    </div>
                    <h2 className="text-lg font-black text-primary group-hover/card:text-accent transition-colors leading-tight">
                        {vet.practice_name}
                    </h2>
                </div>
                <div className="flex flex-col items-end gap-2">
                    <div className="relative group/tooltip z-20">
                        <div className="px-3 py-1 bg-accent/20 text-primary text-[10px] font-black uppercase tracking-tighter rounded-xl border border-accent/20 flex items-center gap-1.5 shadow-sm cursor-help">
                            <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse"></div>
                            Verified
                        </div>
                        <div className="absolute bottom-full right-0 mb-2 w-64 p-4 bg-primary text-secondary border border-white/10 rounded-xl shadow-xl opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-300 z-50 transform translate-y-1 group-hover/tooltip:translate-y-0 pointer-events-none">
                            <p className="text-[11px] leading-relaxed font-medium text-secondary/90 normal-case tracking-normal">
                                <span className="font-bold text-accent block mb-1 uppercase tracking-widest text-[9px]">Community Verified</span>
                                We analyze thousands of patient reviews to identify "English signals"—confirming that other international pet owners successfully communicated in English.
                            </p>
                            <div className="absolute -bottom-1.5 right-4 w-3 h-3 bg-primary border-b border-r border-white/10 rotate-45"></div>
                        </div>
                    </div>
                    {vet.distance !== undefined && vet.distance !== 9999 && (
                        <span className="text-[10px] font-bold text-primary/40 bg-secondary/50 px-2 py-0.5 rounded-lg border border-primary/5">
                            📍 {vet.distance.toFixed(1)} km
                        </span>
                    )}
                </div>
            </div>

            {/* Address Display - Mobile vs Fixed */}
            {vet.address && (vet.address.includes("Mobile Service") || vet.address.includes("Home Visits") || vet.address === 'Unknown') ? (
                <div className="text-[12px] text-primary/60 mb-5 font-bold leading-relaxed bg-accent/10 p-4 rounded-xl border border-accent/20 flex items-center gap-2">
                    <span>🚐</span> Mobile Service - {vet.city}
                </div>
            ) : (
                <a
                    href={`https://www.google.com/search?q=${encodeURIComponent(vet.practice_name + " " + (vet.address || ""))}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="block text-[12px] text-primary/60 mb-5 font-medium leading-relaxed bg-secondary/30 p-4 rounded-xl border border-primary/5 group-hover/card:bg-secondary/40 transition-colors hover:text-accent hover:border-accent/30"
                >
                    {vet.address}
                </a>
            )}

            <div className="space-y-2 mb-6">
                {vet.verification.english_signals && vet.verification.english_signals.slice(0, 1).map((signal, idx) => (
                    <div key={idx} className="flex gap-3 items-start group/signal">
                        <div className="mt-1 flex-shrink-0 w-4 h-4 bg-accent rounded-full flex items-center justify-center shadow-lg shadow-accent/20">
                            <svg className="w-2.5 h-2.5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"></path></svg>
                        </div>
                        <p className="text-[11px] text-primary/60 italic leading-snug group-hover/signal:text-primary/80 transition-colors line-clamp-2">
                            "{signal}"
                        </p>
                    </div>
                ))}
                {vet.verification?.emergency_services === '24/7' && (
                    <div className="flex gap-3 items-start group/signal">
                        <div className="mt-1 flex-shrink-0 w-4 h-4 bg-red-100 rounded-full flex items-center justify-center animate-pulse">
                            <span className="text-[10px]">🚑</span>
                        </div>
                        <p className="text-[11px] text-red-600 font-bold leading-snug">
                            24h Emergency Service
                        </p>
                    </div>
                )}
            </div>

            <div className="flex gap-3">
                {(vet.contact && vet.contact.website) ? (
                    <a
                        href={appendUTM(vet.contact.website)}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 py-3 text-center text-[11px] font-black uppercase tracking-widest bg-primary text-secondary rounded-xl hover:bg-primary/95 transition-all shadow-xl shadow-primary/10 active:scale-95 flex items-center justify-center gap-2"
                    >
                        <span>🌐</span> Visit Website
                    </a>
                ) : (
                    <a
                        href={vet.contact?.phone ? `tel:${vet.contact.phone}` : '#'}
                        onClick={(e) => e.stopPropagation()}
                        className={`flex-1 py-3 text-center text-[11px] font-black uppercase tracking-widest rounded-xl transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2 ${vet.contact?.phone ? 'bg-primary text-secondary hover:bg-primary/95 shadow-primary/10' : 'bg-gray-100 text-gray-400 cursor-not-allowed hidden'}`}
                    >
                        <span>📞</span> Call Practice
                    </a>
                )}

                {/* Hide Map button for Mobile Services */}
                {!(vet.address && (vet.address.includes("Mobile Service") || vet.address.includes("Home Visits") || vet.address === 'Unknown')) && (
                    <a
                        href={vet.contact?.google_maps || `https://www.google.com/search?q=${encodeURIComponent(vet.practice_name + " " + (vet.address || ""))}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="px-4 py-3 text-center text-[11px] font-black uppercase tracking-widest bg-white border border-primary/10 text-primary rounded-xl hover:bg-gray-50 transition-all hover:border-primary/30 flex items-center justify-center"
                        title="View on Maps"
                    >
                        📍
                    </a>
                )}
            </div>

            <div className="mt-3 flex justify-between items-center pt-2 border-t border-gray-50/50">
                <span className="text-[10px] text-gray-400">
                    Last Verified: {vet.verification?.last_scanned ? new Date(vet.verification.last_scanned).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '2025'}
                </span>
                <button
                    onClick={(e) => { e.stopPropagation(); onReportIssue(vet); }}
                    className="text-gray-300 hover:text-red-400 transition-colors flex items-center gap-1 group/report"
                >
                    <span className="text-[9px] opacity-0 group-hover/report:opacity-100 transition-opacity">Report Issue</span>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                </button>
            </div>
        </article>
    );
};
