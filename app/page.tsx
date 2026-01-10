import React from 'react';
import { RankingList } from '../components/RankingList';
import { CheckCircle } from 'lucide-react';

export default function Home() {
    return (
        <main className="min-h-screen bg-brand-surface pb-20">
            <section className="bg-brand-lime text-brand-text pt-16 pb-20 px-4">
                <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
                    <div>
                        <p className="text-xs font-semibold tracking-[0.2em] text-brand-text uppercase">
                            Kagoshima Employment Support
                        </p>
                        <h1 className="hero-text text-3xl md:text-5xl font-bold mt-4 leading-tight">
                            鹿児島で、<br className="md:hidden" />
                            <span className="highlight">自分らしく</span>働くための
                            <br />
                            <span className="highlight">就労移行支援</span>を選ぶ。
                        </h1>
                        <p className="text-base md:text-lg text-brand-text mt-4">
                            エリア、支援内容、特徴を見比べて、あなたに合う事業所をスムーズに探せます。
                        </p>
                        <div className="mt-8 flex flex-col sm:flex-row gap-4">
                            <a
                                href="#rankings"
                                className="bg-brand-surface text-brand-text px-6 py-3 rounded-md text-center font-semibold shadow-sm hover:opacity-90 transition-opacity border border-black/10"
                            >
                                詳細を見る
                            </a>
                            <a
                                href="#contact"
                                className="bg-brand-surface text-brand-text px-6 py-3 rounded-md text-center font-semibold shadow-sm hover:opacity-90 transition-opacity border border-black/10"
                            >
                                お問い合わせ
                            </a>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="bg-white border border-black/10 rounded-lg p-6 shadow-sm">
                            <div className="text-sm font-semibold text-brand-muted mb-3">
                                比較ポイント
                            </div>
                            <div className="space-y-3 text-brand-text">
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-brand-lime-strong" />
                                    支援内容と強みを一覧で確認
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-brand-lime-strong" />
                                    エリア別に通いやすさを比較
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-brand-lime-strong" />
                                    連絡先までワンストップで把握
                                </div>
                            </div>
                            <div className="mt-6 rounded-md bg-white px-4 py-3 text-sm text-brand-muted border border-black/10">
                                まずは気になる事業所をチェックして、見学の相談を。
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="-mt-10 relative z-20">
                <RankingList />
            </div>

            <section className="bg-brand-surface">
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
