import React from 'react';
import { RankingList } from '../components/RankingList';

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
                    <div className="text-left md:pl-[40%] md:w-[60%]">
                        <p className="text-xs font-semibold tracking-[0.2em] text-white uppercase">
                            <span className="inline-block md:whitespace-nowrap">Kagoshima Employment Support</span>
                        </p>
                        <h1 className="hero-title text-[1.75rem] md:text-[3rem] font-bold mt-6">
                            鹿児島で、<br className="md:hidden" />
                            <span className="md:whitespace-nowrap">
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

            <div className="-mt-10 relative z-20">
                <RankingList />
            </div>

            <section className="bg-brand-surface-alt">
                <div className="max-w-5xl mx-auto px-4 py-14 text-center">
                    <h2 className="text-2xl font-bold text-brand-text mb-4">
                        就労移行支援とは？
                    </h2>
                    <p className="text-brand-muted leading-relaxed max-w-2xl mx-auto">
                        障害や難病のある方が、一般企業への就職を目指してトレーニングを行う福祉サービスです。
                        PCスキルやビジネスマナーの習得だけでなく、就職活動のサポートや定着支援も受けられます。
                        利用料は9割以上の方が無料で利用されています。
                    </p>
                </div>
            </section>
        </main>
    );
}
