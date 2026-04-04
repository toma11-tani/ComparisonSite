import React from 'react';

type SitePolicyPanelProps = {
    compact?: boolean;
};

export const SitePolicyPanel: React.FC<SitePolicyPanelProps> = ({ compact = false }) => {
    return (
        <section className={compact ? 'rounded-xl border border-black/10 bg-white p-5' : 'bg-brand-surface'}>
            <div className={compact ? '' : 'max-w-5xl mx-auto px-4 py-12'}>
                <div className={compact ? '' : 'rounded-xl border border-black/10 bg-white p-5 md:p-6'}>
                    <div className="space-y-2">
                        <p className="text-sm font-semibold tracking-[0.08em] text-brand-lime-strong uppercase">
                            Site Policy
                        </p>
                        <h2 className="text-2xl font-bold text-brand-text">運営者情報・掲載方針</h2>
                    </div>

                    <div className="mt-5 grid gap-4 md:grid-cols-3">
                        <div className="rounded-lg bg-brand-surface-alt p-4">
                            <p className="text-sm font-semibold text-brand-lime-strong">運営者情報</p>
                            <p className="mt-2 text-sm leading-relaxed text-brand-muted">
                                当サイトはリバーサル鹿児島が運営する案内サイトです。第三者が運営する中立的な案内サイトではありません。
                            </p>
                        </div>

                        <div className="rounded-lg bg-brand-surface-alt p-4">
                            <p className="text-sm font-semibold text-brand-lime-strong">掲載方針</p>
                            <p className="mt-2 text-sm leading-relaxed text-brand-muted">
                                各事業所の公開情報をもとに参考情報を掲載しています。掲載順は順位ではなく、見学前には各事業所の公式情報をご確認ください。
                            </p>
                        </div>

                        <div className="rounded-lg bg-brand-surface-alt p-4">
                            <p className="text-sm font-semibold text-brand-lime-strong">情報更新</p>
                            <p className="mt-2 text-sm leading-relaxed text-brand-muted">
                                案内文と掲載方針の最終更新日は2026年3月8日です。掲載情報は変更される場合があるため、最新情報は各事業所へご確認ください。
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
