import { offices } from '../data/offices';
import { OfficeCard } from './OfficeCard';

const preferredBrandOrder = [
    'リバーサル鹿児島',
    'ゴシキワーク',
    'ラシーネ',
    'ウェルビー',
    'マナビー',
    'HAC',
    '障害者就労アカデミー',
    'クローバー',
    'ウィズ',
    'ティオ'
] as const;

const getOfficeBrand = (name: string): (typeof preferredBrandOrder)[number] => {
    if (name.startsWith('ウェルビー')) return 'ウェルビー';
    if (name.startsWith('ティオ')) return 'ティオ';
    if (name.startsWith('マナビー')) return 'マナビー';
    return (preferredBrandOrder.find((brand) => name.startsWith(brand)) ?? 'HAC') as (typeof preferredBrandOrder)[number];
};

const comparisonOffices = preferredBrandOrder
    .map((brand) => offices.find((office) => getOfficeBrand(office.name) === brand))
    .filter((office): office is (typeof offices)[number] => Boolean(office));

export const RankingList: React.FC = () => {
    return (
        <section id="rankings" className="max-w-5xl mx-auto px-4 py-10 mt-[100px]">
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
                    <div>
                        <p className="text-base text-brand-muted">掲載事業所</p>
                        <h2 className="text-3xl font-bold text-brand-text">鹿児島の掲載事業所一覧</h2>
                        <p className="mt-2 text-sm text-brand-muted leading-relaxed">
                            掲載順は順位ではありません。各事業所の公開情報をもとに掲載しています。
                        </p>
                    </div>
                    <span className="text-brand-muted text-base">全{comparisonOffices.length}件</span>
                </div>

                {comparisonOffices.length > 0 ? (
                    comparisonOffices.map((office, index) => (
                        <OfficeCard
                            key={office.id}
                            office={office}
                            rank={index + 1}
                            mode="comparison"
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
