'use client';

import React, { useState, useMemo } from 'react';
import { Office, FilterState } from '../types';
import { offices } from '../data/offices';
import { sortOffices } from '../utils/rankingEngine';
import { OfficeCard } from './OfficeCard';
import { SearchFilter } from './SearchFilter';

export const RankingList: React.FC = () => {
    const [filter, setFilter] = useState<FilterState>({
        area: 'All',
        skill: 'All',
    });

    // フィルター変更時に再計算（メモ化してパフォーマンス最適化）
    const sortedOffices = useMemo(() => {
        return sortOffices(offices, filter);
    }, [filter]);

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <SearchFilter filter={filter} onFilterChange={setFilter} />

            <div className="space-y-4">
                <div className="flex justify-between items-end mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">
                        おすすめ事業所ランキング
                    </h2>
                    <span className="text-gray-500 text-sm">
                        {sortedOffices.length}件 ヒット
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
                    <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                        <p className="text-gray-500">条件に一致する事業所が見つかりませんでした。</p>
                        <button
                            onClick={() => setFilter({ area: 'All', skill: 'All' })}
                            className="mt-4 text-blue-500 hover:underline"
                        >
                            条件をリセットする
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
