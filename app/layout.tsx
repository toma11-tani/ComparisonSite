import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { StickyFooter } from '../components/StickyFooter';

const inter = Inter({ subsets: ['latin'] });

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
            <body className={inter.className}>
                {/* Header: Clean & White */}
                <header className="bg-fog-white border-b border-gray-200 sticky top-0 z-50">
                    <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
                        <div className="font-bold text-xl text-muted-teal tracking-wide">
                            鹿児島・就労移行支援ナビ
                        </div>
                        {/* PC Menu */}
                        <nav className="hidden md:flex gap-6 text-sm font-medium text-blue-black/70">
                            <a href="#" className="hover:text-muted-teal transition-colors">ランキング</a>
                            <a href="#" className="hover:text-muted-teal transition-colors">コラム</a>
                            <a href="#" className="hover:text-muted-teal transition-colors">とは？</a>
                        </nav>
                    </div>
                </header>

                {children}

                {/* Footer: Muted Teal Background */}
                <footer className="bg-muted-teal text-white py-12 text-center text-sm">
                    <div className="max-w-4xl mx-auto px-4">
                        <p className="mb-4 text-white/90">
                            掲載情報に関するお問い合わせは<a href="#" className="underline hover:text-deep-moss">こちら</a>から
                        </p>
                        <p className="text-white/70">&copy; 2024 Kagoshima Employment Support Navi. All rights reserved.</p>
                    </div>
                </footer>

                <StickyFooter />
            </body>
        </html>
    );
}
