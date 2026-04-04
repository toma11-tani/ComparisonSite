import React from 'react';
import Link from 'next/link';
import { Office } from '../types';
import { MapPin, Phone, ExternalLink, Star } from 'lucide-react';

interface OfficeCardProps {
    office: Office;
    rank: number;
    reasons?: string[];
    mode?: 'comparison' | 'modal';
}

export const OfficeCard: React.FC<OfficeCardProps> = ({ office, rank, reasons, mode = 'comparison' }) => {
    const isClient = office.is_client;
    const isClientHighlight = isClient && mode === 'comparison';
    const isCompactComparison = mode === 'comparison' && rank >= 7 && rank <= 10;
    const showTopSupportBlocks = mode === 'comparison' && rank <= 6;
    const phoneDigits = office.meta.phone ? office.meta.phone.replace(/[^\d+]/g, '') : '';
    const telLink = phoneDigits ? `tel:${phoneDigits}` : undefined;
    const mapUrl =
        office.meta.access_map_url ??
        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.meta.address)}`;

    return (
        <div
            id={mode === 'comparison' ? `office-${office.id}` : undefined}
            className={`relative w-full rounded-lg shadow-sm border overflow-hidden ${mode === 'comparison' ? 'mb-6' : ''} ${
                isClientHighlight ? 'bg-brand-surface border-brand-lime shadow-md' : 'bg-brand-surface-alt border-black/5'
            }`}
        >
            {isClientHighlight ? (
                <div className="absolute top-0 left-0 bg-brand-lime-strong text-white text-sm font-medium px-3 py-1.5 rounded-br-md z-10 flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" />
                    運営事業所
                </div>
            ) : null}

            <div className={isCompactComparison ? 'p-4 md:p-5' : 'p-6 md:p-7'}>
                <div className={`flex flex-col md:flex-row gap-5 ${isCompactComparison ? '' : 'min-h-[220px]'}`}>
                    <div className="w-full md:w-1/4 shrink-0">
                        <div className="aspect-video bg-white rounded-md flex items-center justify-center text-brand-muted text-base border border-black/5">
                            No Image
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-2xl font-bold text-brand-text">{office.name}</h3>
                            <span className="text-sm bg-brand-surface-alt text-brand-lime-strong px-2.5 py-1 rounded-md border border-brand-lime">
                                {office.type === 'Transition' ? '就労移行支援' : '就労継続支援B型'}
                            </span>
                        </div>

                        <div className="mb-2">
                            <Link href={`/offices/${office.id}`} className="text-sm text-brand-lime-strong underline underline-offset-2">
                                このサイトで詳細を見る
                            </Link>
                        </div>

                        <div className="mb-3 text-sm text-brand-muted">
                            <div className="flex items-center justify-between gap-2">
                                <div className="min-w-0 flex items-center gap-1.5">
                                    <MapPin className="w-3 h-3 text-brand-lime-strong shrink-0" />
                                    <span className="truncate">
                                        {office.meta.nearest_station}
                                        {office.meta.walking_minutes !== undefined ? ` 徒歩${office.meta.walking_minutes}分` : ''}
                                    </span>
                                </div>
                                <a
                                    href={mapUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="shrink-0 text-brand-lime-strong underline underline-offset-2 text-sm font-medium"
                                >
                                    MAPを見る
                                </a>
                            </div>
                        </div>

                        {!isCompactComparison ? (
                            <p className="text-base text-brand-muted mb-3 leading-relaxed line-clamp-2">
                                {office.meta.description}
                            </p>
                        ) : null}

                        {showTopSupportBlocks && (office.support_benefits || office.job_programs || office.job_hunt_support) ? (
                            <div className="mb-3 space-y-2">
                                <div className="grid grid-cols-[112px_1fr] items-start gap-2">
                                    <p className="text-sm font-semibold text-brand-lime-strong pt-0.5">補助内容</p>
                                    <div className="flex flex-wrap gap-1">
                                        {(office.support_benefits ?? []).map((item) => (
                                            <span key={`benefit-${item}`} className="px-2.5 py-1 bg-white text-brand-muted rounded text-sm border border-black/10">
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="grid grid-cols-[112px_1fr] items-start gap-2">
                                    <p className="text-sm font-semibold text-brand-lime-strong pt-0.5">就職プログラム</p>
                                    <div className="flex flex-wrap gap-1">
                                        {(office.job_programs?.length ? office.job_programs : ['未掲載']).map((item) => (
                                            <span key={`program-${item}`} className="px-2.5 py-1 bg-white text-brand-muted rounded text-sm border border-black/10">
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="grid grid-cols-[112px_1fr] items-start gap-2">
                                    <p className="text-sm font-semibold text-brand-lime-strong pt-0.5">就活サポート</p>
                                    <div className="flex flex-wrap gap-1">
                                        {(office.job_hunt_support?.length ? office.job_hunt_support : ['未掲載']).map((item) => (
                                            <span key={`job-${item}`} className="px-2.5 py-1 bg-white text-brand-muted rounded text-sm border border-black/10">
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : null}

                        {!isCompactComparison && !showTopSupportBlocks ? (
                            <div className="flex flex-wrap gap-1 mb-4">
                                {office.main_skills.slice(0, 3).map((skill) => (
                                    <span key={skill} className="px-2.5 py-1 bg-white text-brand-muted rounded text-sm border border-black/5">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        ) : null}

                        <div className="flex flex-col sm:flex-row gap-2">
                            <a
                                href={office.meta.cta_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex-1 text-center py-2.5 rounded-md text-base font-bold transition-colors border ${
                                    isClientHighlight
                                        ? 'bg-brand-orange text-white border-brand-orange hover:opacity-90'
                                        : 'bg-white hover:bg-brand-surface-alt text-brand-lime-strong border-brand-lime'
                                }`}
                            >
                                HPで詳細を見る
                            </a>
                            {telLink ? (
                                <a
                                    href={telLink}
                                    className="flex-1 bg-brand-surface border border-black/10 text-brand-text text-center py-2.5 rounded-md text-base font-semibold hover:bg-white"
                                >
                                    電話する: {office.meta.phone}
                                </a>
                            ) : (
                                <div className="flex-1 bg-brand-surface border border-black/10 text-brand-muted text-center py-2.5 rounded-md text-base">
                                    電話番号は要確認
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
