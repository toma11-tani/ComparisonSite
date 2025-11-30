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
            <div className="relative w-full bg-white rounded-xl shadow-md border border-muted-teal/30 overflow-hidden mb-8 transform transition-all hover:shadow-lg">
                {/* Recommended Badge: Deep Moss Green + White Text */}
                <div className="absolute top-0 left-0 bg-deep-moss text-white text-sm font-medium px-4 py-1 rounded-br-lg z-10 flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" />
                    編集部おすすめ
                </div>

                <div className="p-6 md:p-8">
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Image Section */}
                        <div className="w-full md:w-1/3 shrink-0">
                            <div className="aspect-video bg-fog-white rounded-lg overflow-hidden relative">
                                <div className="w-full h-full flex items-center justify-center text-muted-teal font-medium text-lg">
                                    {office.name} Image
                                </div>
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="flex-1">
                            <h3 className="text-2xl md:text-3xl font-bold text-blue-black mb-2 flex items-center gap-2">
                                {office.name}
                                <span className="text-sm bg-fog-white text-muted-teal px-2 py-1 rounded-full font-normal border border-muted-teal/20">
                                    {office.type === 'Transition' ? '就労移行支援' : '就労継続支援B型'}
                                </span>
                            </h3>

                            <div className="flex items-center text-blue-black/70 mb-4 text-sm">
                                <MapPin className="w-4 h-4 mr-1 text-muted-teal" />
                                {office.meta.address} ({office.area === 'Tenmonkan' ? '天文館エリア' : office.area === 'ChuoStation' ? '中央駅エリア' : 'その他'})
                            </div>

                            <p className="text-blue-black mb-4 leading-relaxed">
                                {office.meta.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-6">
                                {office.main_skills.map((skill) => (
                                    <span key={skill} className="px-3 py-1 bg-fog-white text-blue-black rounded-full text-sm font-medium">
                                        {skill}
                                    </span>
                                ))}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
                                {office.features.map((feature) => (
                                    <div key={feature} className="flex items-center text-sm text-blue-black/80">
                                        <CheckCircle className="w-4 h-4 text-muted-teal mr-2" />
                                        {feature}
                                    </div>
                                ))}
                            </div>

                            {/* CTA Section - Deep Moss Green + White Text */}
                            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                                <a
                                    href={office.meta.cta_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 bg-deep-moss hover:opacity-90 text-white font-bold py-4 px-6 rounded-lg text-center shadow-sm transition-colors flex items-center justify-center gap-2 text-lg"
                                >
                                    <ExternalLink className="w-5 h-5" />
                                    無料見学を予約する
                                </a>
                                <div className="flex-1 bg-fog-white border border-gray-100 rounded-lg p-3 flex flex-col justify-center items-center text-sm text-blue-black/70">
                                    <div className="flex items-center gap-2 font-bold text-lg text-blue-black">
                                        <Phone className="w-5 h-5 text-muted-teal" />
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
            <div className="w-full bg-gray-50 rounded-lg shadow-sm border border-gray-100 overflow-hidden mb-6">
                <div className="p-6">
                    <div className="flex flex-col md:flex-row gap-5">
                        <div className="w-full md:w-1/4 shrink-0">
                            <div className="aspect-video bg-white rounded-md flex items-center justify-center text-gray-400 text-sm border border-gray-100">
                                No Image
                            </div>
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-xl font-bold text-blue-black">
                                    <span className="text-muted-teal mr-2">#{rank}</span>
                                    {office.name}
                                </h3>
                                <span className="text-xs bg-white text-blue-black/60 px-2 py-1 rounded border border-gray-100">
                                    {office.type === 'Transition' ? '移行' : 'B型'}
                                </span>
                            </div>

                            <div className="flex items-center text-sm text-blue-black/60 mb-3">
                                <MapPin className="w-3 h-3 mr-1" />
                                {office.meta.address}
                            </div>

                            <p className="text-sm text-blue-black/80 mb-3 line-clamp-2">
                                {office.meta.description}
                            </p>

                            <div className="flex flex-wrap gap-1 mb-4">
                                {office.main_skills.slice(0, 3).map((skill) => (
                                    <span key={skill} className="px-2 py-0.5 bg-white text-blue-black/70 rounded text-xs border border-gray-100">
                                        {skill}
                                    </span>
                                ))}
                            </div>

                            <a
                                href={office.meta.cta_link}
                                className="block w-full bg-white hover:bg-gray-50 text-muted-teal border border-muted-teal/30 text-center py-2 rounded-md text-sm font-bold transition-colors"
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
        <div className="w-full bg-gray-50 border-b border-gray-100 p-4 hover:bg-gray-100 transition-colors">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="font-bold text-blue-black">
                        <span className="text-muted-teal mr-2 text-sm">#{rank}</span>
                        {office.name}
                    </h3>
                    <div className="text-xs text-blue-black/60 mt-1">
                        {office.area === 'Tenmonkan' ? '天文館' : office.area === 'ChuoStation' ? '中央駅' : 'その他'} / {office.main_skills.join(', ')}
                    </div>
                </div>
                <a href={office.meta.cta_link} className="text-muted-teal text-sm hover:underline">
                    詳細
                </a>
            </div>
        </div>
    );
};
