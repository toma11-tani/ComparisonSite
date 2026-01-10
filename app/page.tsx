import React from 'react';
import { RankingList } from '../components/RankingList';

export default function Home() {
    const heroImageUrl =
        process.env.NODE_ENV === 'production'
            ? '/ComparisonSite/assets/hero.jpg'
            : '/assets/hero.jpg';

    return (
        <main className="min-h-screen bg-brand-surface pb-20">
            <section
                className="hero-section text-white pt-32 pb-36 px-4"
                style={{
                    backgroundImage: `linear-gradient(90deg, rgba(122, 163, 74, 0) 0%, rgba(122, 163, 74, 0) 33%, rgba(122, 163, 74, 0.6) 50%, rgba(122, 163, 74, 0.9) 66%, rgba(122, 163, 74, 0.9) 100%), url(${heroImageUrl})`,
                }}
            >
                <div className="max-w-4xl mx-auto flex flex-col items-center justify-center text-center min-h-[42vh]">
                    <p className="text-xs font-semibold tracking-[0.2em] text-white uppercase">
                        Kagoshima Employment Support
                    </p>
                    <h1 className="hero-title text-[1.7rem] md:text-[3rem] font-bold mt-6">
                        鹿児島で、<br className="md:hidden" />
                        自分らしく働くための
                        <br />
                        就労移行支援を選ぶ。
                    </h1>
                    <div className="scroll-hint mt-16">
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
