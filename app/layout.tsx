import type { Metadata } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const GA_MEASUREMENT_ID = 'G-6FT1VNY9DX';

const notoSans = Noto_Sans_JP({
    subsets: ['latin'],
    weight: ['400', '500', '700'],
});

export const metadata: Metadata = {
    title: 'リバーサル鹿児島 | 鹿児島の就労移行支援案内サイト',
    description: 'リバーサル鹿児島が運営する、鹿児島の就労移行支援案内サイトです。5問診断で、自分に合う事業所の選び方や見学のポイントを整理できます。',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ja">
            <head>
                <Script
                    src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
                    strategy="afterInteractive"
                />
                <Script id="ga4-init" strategy="afterInteractive">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', '${GA_MEASUREMENT_ID}');
                    `}
                </Script>
            </head>
            <body className={notoSans.className}>
                {children}

                <footer id="contact" className="bg-brand-surface-alt border-t border-black/5 py-12 text-center text-sm">
                    <div className="max-w-5xl mx-auto px-4 text-brand-muted">
                        <p className="text-xs font-semibold tracking-[0.08em] uppercase text-brand-lime-strong">
                            Operated by Reversal Kagoshima
                        </p>
                        <p className="mt-2 text-base font-medium text-brand-text">運営元: リバーサル鹿児島</p>
                        <p className="mb-4">
                            掲載情報に関するお問い合わせは
                            <a
                                href="https://www.ribasarukagoshima.jp/contents/category/contact/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-brand-lime-strong font-medium underline underline-offset-4 hover:opacity-80"
                            >
                                こちら
                            </a>
                            から
                        </p>
                        <p>&copy; 2026 リバーサル鹿児島 All Rights Reserved.</p>
                    </div>
                </footer>

            </body>
        </html>
    );
}
