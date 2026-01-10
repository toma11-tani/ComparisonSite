import React from 'react';
import { offices } from '../data/offices';
import { sortOffices } from '../utils/rankingEngine';
import { OfficeCard } from './OfficeCard';

export const RankingList: React.FC = () => {
    const sortedOffices = sortOffices(offices);

    return (
        <section id="rankings" className="max-w-5xl mx-auto px-4 py-10 mt-[100px]">
            <div className="space-y-5">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2">
                    <div>
                        <p className="text-sm text-brand-muted">事業所一覧</p>
                        <h2 className="text-2xl font-bold text-brand-text">
                            おすすめ事業所ランキング
                        </h2>
                    </div>
                    <span className="text-brand-muted text-sm">
                        全{sortedOffices.length}件
                    </span>
                </div>

                {sortedOffices.length > 0 ? (
                    sortedOffices.map((office, index) => (
                        <OfficeCard
                            key={office.id}
                            office={office}
                            rank={index + 1}
                        />
                    ))
                ) : (
                    <div className="text-center py-12 bg-brand-surface-alt rounded-lg border border-dashed border-black/10">
                        <p className="text-brand-muted">現在表示できる事業所がありません。</p>
                    </div>
                )}
            </div>
        </section>
    );
};
