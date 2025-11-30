import React from 'react';
import { FilterState, Area } from '../types';
import { Search, MapPin, Laptop } from 'lucide-react';

interface SearchFilterProps {
    filter: FilterState;
    onFilterChange: (newFilter: FilterState) => void;
}

export const SearchFilter: React.FC<SearchFilterProps> = ({ filter, onFilterChange }) => {

    const handleAreaChange = (area: Area | 'All') => {
        onFilterChange({ ...filter, area });
    };

    const handleSkillChange = (skill: string) => {
        onFilterChange({ ...filter, skill });
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <div className="flex items-center gap-2 mb-4 text-gray-800 font-bold text-lg border-b border-gray-100 pb-2">
                <Search className="w-5 h-5 text-blue-500" />
                条件で絞り込む
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Area Filter */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        エリアを選ぶ
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {(['All', 'Tenmonkan', 'ChuoStation', 'Other'] as const).map((area) => (
                            <button
                                key={area}
                                onClick={() => handleAreaChange(area)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter.area === area
                                        ? 'bg-blue-600 text-white shadow-md'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                {area === 'All' && 'すべて'}
                                {area === 'Tenmonkan' && '天文館'}
                                {area === 'ChuoStation' && '中央駅'}
                                {area === 'Other' && 'その他'}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Skill Filter */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                        <Laptop className="w-4 h-4" />
                        身につけたいスキル
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {['All', 'Webデザイン', 'プログラミング', '事務・Office', '軽作業'].map((skill) => (
                            <button
                                key={skill}
                                onClick={() => handleSkillChange(skill)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter.skill === skill
                                        ? 'bg-green-600 text-white shadow-md'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                {skill === 'All' ? '指定なし' : skill}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
