import React from 'react';
import { RankingList } from '../components/RankingList';
import { CheckCircle } from 'lucide-react';

export default function Home() {
    return (
        <main className="min-h-screen bg-fog-white pb-24 md:pb-12">
            {/* Hero Section: Nordic Modern Style (Solid Muted Teal) */}
            <div className="bg-muted-teal text-white pt-16 pb-24 px-4 relative overflow-hidden">
                <div className="max-w-4xl mx-auto relative z-10">
                    <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight tracking-tight">
                        鹿児島で<br className="md:hidden" />
                        <span className="text-deep-moss">「自分らしく働く」</span>を<br />
                        見つけよう。
                    </h1>
                    <p className="text-lg md:text-xl text-fog-white/90 mb-8 max-w-2xl font-light">
                        鹿児島市内の就労移行支援事業所を徹底比較。<br />
                        あなたにぴったりの事業所が必ず見つかります。
                    </p>

                    <div className="flex flex-wrap gap-4 text-sm md:text-base font-medium">
                        <div className="flex items-center bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/20">
                            <CheckCircle className="w-5 h-5 text-deep-moss mr-2" />
                            掲載数No.1
                        </div>
                        <div className="flex items-center bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/20">
                            <CheckCircle className="w-5 h-5 text-deep-moss mr-2" />
                            リアルな口コミ
                        </div>
                        <div className="flex items-center bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/20">
                            <CheckCircle className="w-5 h-5 text-deep-moss mr-2" />
                            見学予約まで完結
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content (Ranking) */}
            <div className="-mt-16 relative z-20">
                <RankingList />
            </div>

            {/* Trust Section */}
            <div className="max-w-4xl mx-auto px-4 py-12 text-center">
                <h2 className="text-2xl font-bold text-blue-black mb-4">
                    就労移行支援とは？
                </h2>
                <p className="text-blue-black/80 leading-relaxed max-w-2xl mx-auto">
                    障害や難病のある方が、一般企業への就職を目指してトレーニングを行う福祉サービスです。
                    PCスキルやビジネスマナーの習得だけでなく、就職活動のサポートや定着支援も受けられます。
                    利用料は9割以上の方が無料で利用されています。
                </p>
            </div>
        </main>
    );
}
