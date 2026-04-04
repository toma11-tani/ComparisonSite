import React from 'react';
import { DiagnosisFlow } from '../components/DiagnosisFlow';
import { SitePolicyPanel } from '../components/SitePolicyPanel';

export default function Home() {
    const heroImageUrlDesktop =
        process.env.NODE_ENV === 'production'
            ? '/ComparisonSite/assets/hero.jpg'
            : '/assets/hero.jpg';

    const heroImageUrlMobile =
        process.env.NODE_ENV === 'production'
            ? '/ComparisonSite/assets/hero_media.jpg'
            : '/assets/hero_media.jpg';

    return (
        <main className="min-h-screen bg-brand-surface pb-20">
            <section
                className="hero-section text-white py-20 px-4"
                style={{
                    '--hero-image-mobile': `url(${heroImageUrlMobile})`,
                    '--hero-image-desktop': `url(${heroImageUrlDesktop})`,
                } as React.CSSProperties}
            >
                <div className="w-full flex flex-col justify-center min-h-[32vh]">
                    <div className="text-center md:text-left md:pl-[40%] md:w-[60%]">
                        <p className="text-xs font-semibold tracking-[0.2em] text-white uppercase">
                            <span className="inline-block md:whitespace-nowrap">Reversal Kagoshima</span>
                        </p>
                        <h1 className="hero-title text-[1.75rem] md:text-[3rem] font-bold mt-6">
                            <span className="md:whitespace-nowrap">
                                鹿児島で、<br className="md:hidden" />
                                自分らしく働くための
                            </span>
                            <br />
                            <span className="md:whitespace-nowrap">就労移行支援を選ぶ。</span>
                        </h1>
                    </div>
                    <div className="scroll-hint mt-16 w-full flex justify-center">
                        Scroll
                        <span aria-hidden="true">↓</span>
                    </div>
                </div>
            </section>

            <section className="bg-brand-surface">
                <div className="max-w-5xl mx-auto px-4 pt-6 md:pt-8">
                    <div className="rounded-xl border border-black/10 bg-brand-surface-alt p-5 md:p-6">
                        <p className="text-sm leading-relaxed text-brand-muted md:max-w-4xl md:text-base">
                            このサイトはリバーサル鹿児島が運営し、鹿児島で自分に合う就労移行支援事業所を見つけてもらうための参考情報を掲載しています。
                            第三者が運営する中立的な案内サイトではありません。
                        </p>
                    </div>
                </div>
            </section>

            <div className="relative z-20">
                <DiagnosisFlow />
            </div>

            <SitePolicyPanel />

            <section className="bg-brand-surface-alt">
                <div className="max-w-5xl mx-auto px-4 py-14 text-center">
                    <h2 className="text-2xl font-bold text-brand-text mb-4">
                        就労移行支援とは？
                    </h2>
                    <p className="text-brand-muted leading-relaxed max-w-2xl mx-auto">
                        就労移行支援は、一般企業などへの就労を希望する障害のある方に対して、
                        一定期間、就労に必要な知識や能力の向上に向けた訓練を行う障害福祉サービスです。
                        支援内容や利用条件、利用者負担は支給決定の内容や事業所ごとに異なるため、
                        詳細は自治体窓口や各事業所で確認が必要です。
                    </p>
                </div>
            </section>
        </main>
    );
}
