import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { offices } from '../../../data/offices';
import { SitePolicyPanel } from '../../../components/SitePolicyPanel';
import { TrackedLink } from '../../../components/TrackedLink';

type Props = {
    params: { id: string };
};

const buildMapUrl = (address: string) =>
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

export function generateStaticParams() {
    return offices.map((office) => ({ id: office.id }));
}

export function generateMetadata({ params }: Props): Metadata {
    const office = offices.find((item) => item.id === params.id);
    if (!office) {
        return { title: '事業所情報' };
    }
    return {
        title: `${office.name} | リバーサル鹿児島`,
        description: `${office.name}の基本情報や支援内容を掲載している、リバーサル鹿児島運営の案内ページです。`
    };
}

export default function OfficeDetailPage({ params }: Props) {
    const office = offices.find((item) => item.id === params.id);
    if (!office) {
        notFound();
    }

    const mapUrl = office.meta.access_map_url ?? buildMapUrl(office.meta.address);

    return (
        <main className="min-h-screen bg-brand-surface pb-20">
            <section className="max-w-5xl mx-auto px-4 py-12 space-y-6">
                <div className="rounded-xl border border-black/10 bg-white p-6">
                    <p className="text-xs font-semibold tracking-[0.08em] uppercase text-brand-lime-strong">
                        Operated by Reversal Kagoshima
                    </p>
                    <p className="text-sm text-brand-muted">事業所詳細</p>
                    <h1 className="text-3xl md:text-4xl font-bold text-brand-text mt-1">{office.name}</h1>
                    <p className="text-base text-brand-muted mt-3 leading-relaxed">{office.meta.description}</p>
                </div>

                <div className="rounded-lg border border-black/10 bg-brand-surface-alt p-5">
                    <p className="text-base text-brand-muted leading-relaxed">
                        このページはリバーサル鹿児島が運営する案内ページです。第三者が運営する中立的な案内ページではありません。
                    </p>
                </div>

                <SitePolicyPanel compact />

                <div className="rounded-lg border border-black/10 bg-white p-5 space-y-3">
                    <h2 className="text-xl font-bold text-brand-text">基本情報</h2>
                    <p className="text-base text-brand-muted">
                        最寄り駅: {office.meta.nearest_station}
                        {office.meta.walking_minutes !== undefined ? `（徒歩${office.meta.walking_minutes}分）` : ''}
                    </p>
                    <p className="text-base text-brand-muted">住所: {office.meta.address}</p>
                    <p className="text-base text-brand-muted">電話: {office.meta.phone ?? '要確認'}</p>
                    <div className="flex flex-wrap gap-2 pt-1">
                        <a
                            href={mapUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="border border-black/20 bg-white text-brand-text py-2 px-4 rounded-md text-sm"
                        >
                            MAPを見る
                        </a>
                        <TrackedLink
                            href={office.meta.cta_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            eventName="cta_click"
                            eventParams={{
                                office_id: office.id,
                                office_name: office.name,
                                link_type: 'hp',
                                location: 'office_detail'
                            }}
                            className="bg-brand-orange text-white font-bold py-2 px-4 rounded-md text-sm"
                        >
                            公式サイトを見る
                        </TrackedLink>
                    </div>
                </div>

                <div className="rounded-lg border border-black/10 bg-white p-5 space-y-4">
                    <h2 className="text-xl font-bold text-brand-text">支援内容</h2>

                    <div className="space-y-2">
                        <p className="text-sm font-semibold text-brand-lime-strong">補助内容</p>
                        <div className="flex flex-wrap gap-1">
                            {(office.support_benefits ?? []).map((item) => (
                                <span key={`benefit-${item}`} className="px-2.5 py-1 bg-brand-surface-alt text-brand-muted rounded text-sm border border-black/10">
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <p className="text-sm font-semibold text-brand-lime-strong">就職プログラム</p>
                        <div className="flex flex-wrap gap-1">
                            {(office.job_programs?.length ? office.job_programs : []).map((item) => (
                                <span key={`program-${item}`} className="px-2.5 py-1 bg-brand-surface-alt text-brand-muted rounded text-sm border border-black/10">
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <p className="text-sm font-semibold text-brand-lime-strong">就活サポート</p>
                        <div className="flex flex-wrap gap-1">
                            {(office.job_hunt_support?.length ? office.job_hunt_support : []).map((item) => (
                                <span key={`job-${item}`} className="px-2.5 py-1 bg-brand-surface-alt text-brand-muted rounded text-sm border border-black/10">
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="rounded-lg border border-brand-orange/50 bg-white p-5">
                    <h2 className="text-2xl font-bold text-brand-text">5問で事業所選びのタイプを診断</h2>
                    <p className="text-base text-brand-muted mt-2">回答内容から、自分に合う選び方や見学で確認したいポイントを表示します。</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                        <Link
                            href="/#diagnosis"
                            className="bg-brand-orange text-white font-bold py-2.5 px-5 rounded-md hover:opacity-90"
                        >
                            タイプ診断を見る
                        </Link>
                        <Link
                            href={`/?focus=${office.id}`}
                            className="border border-black/20 bg-white text-brand-text py-2.5 px-5 rounded-md"
                        >
                            掲載事業所一覧に戻る
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
