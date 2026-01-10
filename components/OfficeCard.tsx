import React from 'react';
import { Office } from '../types';
import { MapPin, CheckCircle, Phone, Clock, ExternalLink, Star } from 'lucide-react';

interface OfficeCardProps {
    office: Office;
    rank: number;
}

export const OfficeCard: React.FC<OfficeCardProps> = ({ office, rank }) => {
    const isClient = office.is_client;
    const isPlatinum = office.tier === 'Platinum';

    // クライアント（リバーサル）向けの特別スタイル（静寂な強調）
    if (isClient) {
        return (
            <div className="relative w-full bg-brand-surface rounded-lg shadow-sm border border-brand-lime overflow-hidden mb-8 transition-shadow hover:shadow-md">
                <div className="absolute top-0 left-0 bg-brand-lime-strong text-white text-sm font-medium px-4 py-1 rounded-br-md z-10 flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" />
                    編集部おすすめ
                </div>

                <div className="p-6 md:p-8">
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Image Section */}
                        <div className="w-full md:w-1/3 shrink-0">
                            <div className="aspect-video bg-brand-surface-alt rounded-lg overflow-hidden relative border border-black/5">
                                <div className="w-full h-full flex items-center justify-center text-brand-muted font-medium text-lg">
                                    {office.name} Image
                                </div>
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="flex-1">
                            <h3 className="text-2xl md:text-3xl font-bold text-brand-text mb-2 flex items-center gap-2">
                                {office.name}
                                <span className="text-sm bg-brand-surface-alt text-brand-lime-strong px-2 py-1 rounded-md font-normal border border-brand-lime">
                                    {office.type === 'Transition' ? '就労移行支援' : '就労継続支援B型'}
                                </span>
                            </h3>

                            <div className="flex items-center text-brand-muted mb-4 text-sm">
                                <MapPin className="w-4 h-4 mr-1 text-brand-lime-strong" />
                                {office.meta.address} ({office.area === 'Tenmonkan' ? '天文館エリア' : office.area === 'ChuoStation' ? '中央駅エリア' : 'その他'})
                            </div>

                            <p className="text-brand-text mb-4 leading-relaxed">
                                {office.meta.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-6">
                                {office.main_skills.map((skill) => (
                                    <span key={skill} className="px-3 py-1 bg-brand-surface-alt text-brand-text rounded-md text-sm font-medium border border-black/5">
                                        {skill}
                                    </span>
                                ))}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
                                {office.features.map((feature) => (
                                    <div key={feature} className="flex items-center text-sm text-brand-muted">
                                        <CheckCircle className="w-4 h-4 text-brand-lime-strong mr-2" />
                                        {feature}
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                                <a
                                    href={office.meta.cta_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 bg-brand-orange hover:opacity-90 text-white font-bold py-4 px-6 rounded-md text-center shadow-sm transition-colors flex items-center justify-center gap-2 text-lg"
                                >
                                    <ExternalLink className="w-5 h-5" />
                                    無料見学を予約する
                                </a>
                                <div className="flex-1 bg-brand-surface-alt border border-black/5 rounded-md p-3 flex flex-col justify-center items-center text-sm text-brand-muted">
                                    <div className="flex items-center gap-2 font-bold text-lg text-brand-text">
                                        <Phone className="w-5 h-5 text-brand-lime-strong" />
                                        {office.meta.phone}
                                    </div>
                                    <span>{office.meta.opening_hours}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Platinum Tier (上位表示) - 少し背景を落としてリバーサルを目立たせる
    if (isPlatinum) {
        return (
            <div className="w-full bg-brand-surface-alt rounded-lg shadow-sm border border-black/5 overflow-hidden mb-6">
                <div className="p-6">
                    <div className="flex flex-col md:flex-row gap-5">
                        <div className="w-full md:w-1/4 shrink-0">
                            <div className="aspect-video bg-white rounded-md flex items-center justify-center text-brand-muted text-sm border border-black/5">
                                No Image
                            </div>
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-xl font-bold text-brand-text">
                                    <span className="text-brand-lime-strong mr-2">#{rank}</span>
                                    {office.name}
                                </h3>
                                <span className="text-xs bg-white text-brand-muted px-2 py-1 rounded border border-black/5">
                                    {office.type === 'Transition' ? '移行' : 'B型'}
                                </span>
                            </div>

                            <div className="flex items-center text-sm text-brand-muted mb-3">
                                <MapPin className="w-3 h-3 mr-1" />
                                {office.meta.address}
                            </div>

                            <p className="text-sm text-brand-muted mb-3 line-clamp-2">
                                {office.meta.description}
                            </p>

                            <div className="flex flex-wrap gap-1 mb-4">
                                {office.main_skills.slice(0, 3).map((skill) => (
                                    <span key={skill} className="px-2 py-0.5 bg-white text-brand-muted rounded text-xs border border-black/5">
                                        {skill}
                                    </span>
                                ))}
                            </div>

                            <a
                                href={office.meta.cta_link}
                                className="block w-full bg-white hover:bg-brand-surface-alt text-brand-lime-strong border border-brand-lime text-center py-2 rounded-md text-sm font-bold transition-colors"
                            >
                                詳細を見る
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Basic Tier (簡易表示)
    return (
        <div className="w-full bg-brand-surface-alt border-b border-black/5 p-4 hover:bg-white transition-colors">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="font-bold text-brand-text">
                        <span className="text-brand-lime-strong mr-2 text-sm">#{rank}</span>
                        {office.name}
                    </h3>
                    <div className="text-xs text-brand-muted mt-1">
                        {office.area === 'Tenmonkan' ? '天文館' : office.area === 'ChuoStation' ? '中央駅' : 'その他'} / {office.main_skills.join(', ')}
                    </div>
                </div>
                <a href={office.meta.cta_link} className="text-brand-lime-strong text-sm hover:underline">
                    詳細
                </a>
            </div>
        </div>
    );
};
