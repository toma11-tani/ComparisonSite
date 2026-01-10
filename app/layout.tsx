import type { Metadata } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import './globals.css';
import { StickyFooter } from '../components/StickyFooter';

const notoSans = Noto_Sans_JP({
    subsets: ['latin'],
    weight: ['400', '500', '700'],
});

export const metadata: Metadata = {
    title: '鹿児島・就労移行支援ナビ | あなたに最適な事業所が見つかる',
    description: '鹿児島市内の就労移行支援事業所を徹底比較。天文館・中央駅エリアを中心に、ITスキル、在宅ワークなどあなたの希望に合った事業所をランキング形式でご紹介します。',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ja">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@500;700&display=swap" rel="stylesheet" />
            </head>
            <body className={notoSans.className}>
                <header className="bg-[rgba(122,163,74,0.9)] border-b border-black/10 sticky top-0 z-50">
                    <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-center">
                        <div className="font-bold text-lg md:text-xl text-white tracking-wide text-center">
                            鹿児島・就労移行支援ナビ
                        </div>
                    </div>
                </header>

                {children}

                <footer id="contact" className="bg-brand-surface-alt border-t border-black/5 py-12 text-center text-sm">
                    <div className="max-w-5xl mx-auto px-4 text-brand-muted">
                        <p className="mb-4">
                            掲載情報に関するお問い合わせは
                            <a href="#" className="text-brand-lime-strong font-medium underline underline-offset-4 hover:opacity-80">
                                こちら
                            </a>
                            から
                        </p>
                        <p>&copy; 2024 Kagoshima Employment Support Navi. All rights reserved.</p>
                    </div>
                </footer>

                <StickyFooter />
            </body>
        </html>
    );
}
