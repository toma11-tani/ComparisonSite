'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { offices } from '../data/offices';
import { quizQuestions, rankOffices } from '../utils/rankingEngine';
import { QuizAnswers } from '../types';
import { OfficeCard } from './OfficeCard';

const initialAnswers: QuizAnswers = {
    deliveryMode: 'commute',
    locationPriority: 'balanced',
    supportIntensity: 'balanced',
    programFocus: 'office',
    timeline: 'standard'
};

const preferredBrandOrder = [
    'リバーサル鹿児島',
    'ゴシキワーク',
    'ラシーネ',
    'ウェルビー',
    'マナビー',
    'HAC',
    '障害者就労アカデミー',
    'クローバー',
    'ウィズ',
    'ティオ'
] as const;

const getOfficeBrand = (name: string): (typeof preferredBrandOrder)[number] => {
    if (name.startsWith('ウェルビー')) return 'ウェルビー';
    if (name.startsWith('ティオ')) return 'ティオ';
    if (name.startsWith('マナビー')) return 'マナビー';
    return (preferredBrandOrder.find((brand) => name.startsWith(brand)) ?? 'HAC') as (typeof preferredBrandOrder)[number];
};

const DIAGNOSIS_STORAGE_KEY = 'comparison_site_diagnosis_state_v1';

type PersistedDiagnosisState = {
    answers: QuizAnswers;
    isPersonalized: boolean;
    hasStarted: boolean;
};

const isScrollableHash = (hash: string) => hash.startsWith('#office-') || hash === '#rankings';

const getScrollTargetFromLocation = (): string | null => {
    const hash = window.location.hash;
    if (isScrollableHash(hash)) return hash;

    const params = new URLSearchParams(window.location.search);
    const focus = params.get('focus');
    if (!focus) return null;
    if (focus === 'rankings') return '#rankings';
    if (focus.startsWith('office-')) return `#${focus}`;
    return `#office-${focus}`;
};

export const DiagnosisFlow: React.FC = () => {
    const [answers, setAnswers] = useState<QuizAnswers>(initialAnswers);
    const [isPersonalized, setIsPersonalized] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);
    const [submitCount, setSubmitCount] = useState(0);
    const [pendingScrollToRanking, setPendingScrollToRanking] = useState(false);
    const [pendingHashScroll, setPendingHashScroll] = useState<string | null>(null);
    const [hasHydratedState, setHasHydratedState] = useState(false);
    const hashScrollAttemptRef = useRef(0);
    const recommendationRef = useRef<HTMLDivElement | null>(null);
    const rankingAnchorRef = useRef<HTMLDivElement | null>(null);

    const comparisonOffices = useMemo(
        () =>
            preferredBrandOrder
                .map((brand) => offices.find((office) => getOfficeBrand(office.name) === brand))
                .filter((office): office is (typeof offices)[number] => Boolean(office)),
        []
    );

    const rankedOffices = useMemo(
        () => rankOffices(comparisonOffices, isPersonalized ? answers : undefined),
        [comparisonOffices, isPersonalized, answers]
    );

    const topThree = isPersonalized ? rankedOffices.slice(0, 3) : [];
    const recommendedIds = new Set(topThree.map((item) => item.office.id));
    const remainingOffices = isPersonalized
        ? comparisonOffices.filter((office) => !recommendedIds.has(office.id))
        : comparisonOffices;

    useEffect(() => {
        if (!isPersonalized || submitCount === 0) return;
        recommendationRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, [isPersonalized, submitCount]);

    useEffect(() => {
        const currentTarget = typeof window !== 'undefined' ? getScrollTargetFromLocation() : null;
        const forceOpenByHash = Boolean(currentTarget);
        try {
            const raw = sessionStorage.getItem(DIAGNOSIS_STORAGE_KEY);
            if (raw) {
                const parsed = JSON.parse(raw) as Partial<PersistedDiagnosisState>;
                if (parsed.answers) {
                    const restoredAnswers: QuizAnswers = {
                        deliveryMode: parsed.answers.deliveryMode ?? initialAnswers.deliveryMode,
                        locationPriority: parsed.answers.locationPriority ?? initialAnswers.locationPriority,
                        supportIntensity: parsed.answers.supportIntensity ?? initialAnswers.supportIntensity,
                        programFocus: parsed.answers.programFocus ?? initialAnswers.programFocus,
                        timeline: parsed.answers.timeline ?? initialAnswers.timeline
                    };
                    setAnswers(restoredAnswers);
                    setIsPersonalized(Boolean(parsed.isPersonalized));
                    setHasStarted(Boolean(parsed.hasStarted) || forceOpenByHash);
                } else if (forceOpenByHash) {
                    setHasStarted(true);
                }
            } else if (forceOpenByHash) {
                setHasStarted(true);
            }
        } catch {
            // If parse fails, ignore persisted state and continue with defaults.
            if (forceOpenByHash) {
                setHasStarted(true);
            }
        } finally {
            if (currentTarget) {
                hashScrollAttemptRef.current = 0;
                setPendingHashScroll(currentTarget);
            }
            setHasHydratedState(true);
        }
    }, []);

    useEffect(() => {
        const onHashChange = () => {
            const target = getScrollTargetFromLocation();
            if (target) {
                setHasStarted(true);
                hashScrollAttemptRef.current = 0;
                setPendingHashScroll(target);
            }
        };
        window.addEventListener('hashchange', onHashChange);
        return () => window.removeEventListener('hashchange', onHashChange);
    }, []);

    useEffect(() => {
        if (!hasHydratedState) return;
        const payload: PersistedDiagnosisState = {
            answers,
            isPersonalized,
            hasStarted
        };
        sessionStorage.setItem(DIAGNOSIS_STORAGE_KEY, JSON.stringify(payload));
    }, [answers, isPersonalized, hasStarted, hasHydratedState]);

    useEffect(() => {
        if (!pendingScrollToRanking) return;
        const timer = window.setTimeout(() => {
            const el = rankingAnchorRef.current;
            if (!el) return;
            const top = el.getBoundingClientRect().top + window.scrollY - 12;
            window.scrollTo({ top, behavior: 'smooth' });
            setPendingScrollToRanking(false);
        }, 60);
        return () => window.clearTimeout(timer);
    }, [pendingScrollToRanking, isPersonalized]);

    useEffect(() => {
        if (!pendingHashScroll) return;
        let cancelled = false;
        const tryScroll = () => {
            if (cancelled) return;
            const target = document.querySelector(pendingHashScroll) as HTMLElement | null;
            if (!target) {
                if (hashScrollAttemptRef.current >= 15) {
                    setPendingHashScroll(null);
                    hashScrollAttemptRef.current = 0;
                    return;
                }
                hashScrollAttemptRef.current += 1;
                window.setTimeout(tryScroll, 80);
                return;
            }
            const top = target.getBoundingClientRect().top + window.scrollY - 12;
            window.scrollTo({ top, behavior: 'smooth' });
            setPendingHashScroll(null);
            hashScrollAttemptRef.current = 0;
        };
        const timer = window.setTimeout(tryScroll, 120);
        return () => {
            cancelled = true;
            window.clearTimeout(timer);
        };
    }, [pendingHashScroll, hasStarted, isPersonalized, topThree.length, remainingOffices.length]);

    const handleOptionChange = <K extends keyof QuizAnswers>(key: K, value: QuizAnswers[K]) => {
        setAnswers((prev) => ({ ...prev, [key]: value }));
    };

    return (
        <section id="diagnosis" className="max-w-5xl mx-auto px-4 py-10 mt-[60px]">
            <div className="space-y-5">
                <div className="rounded-xl bg-gradient-to-r from-brand-surface-alt to-white border border-black/10 p-5 md:p-6">
                    <p className="text-base text-brand-muted">5問診断</p>
                    <h1 className="text-3xl md:text-4xl font-bold text-brand-text mt-1">
                        あなたに合う就労移行支援を提案します
                    </h1>
                    <p className="text-base text-brand-muted mt-2 leading-relaxed">
                        回答内容からおすすめ上位3件を表示します。
                    </p>
                </div>

                <p className="text-sm md:text-base text-brand-muted leading-relaxed">
                    掲載情報は編集部が公式サイト等の公開情報をもとに作成しています。最新情報・詳細は各事業所の公式サイトをご確認ください。
                </p>

                {quizQuestions.map((item) => (
                    <div key={item.id} className="rounded-lg border border-black/10 bg-white p-4">
                        <p className="text-base md:text-lg font-semibold text-brand-text mb-2">{item.question}</p>
                        <div className="grid gap-2 md:grid-cols-2">
                            {item.options.map((option) => (
                                <label
                                    key={option.value}
                                    className="flex items-center gap-2 rounded-md border border-black/10 bg-brand-surface-alt px-3 py-2.5 cursor-pointer hover:bg-white transition-colors"
                                >
                                    <input
                                        type="radio"
                                        name={item.id}
                                        value={option.value}
                                        checked={answers[item.id] === option.value}
                                        onChange={() => handleOptionChange(item.id, option.value)}
                                    />
                                    <span className="text-[15px] md:text-base text-brand-text">{option.label}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                ))}

                <div className="flex flex-col sm:flex-row gap-2">
                    <button
                        type="button"
                        onClick={() => {
                            setHasStarted(true);
                            setIsPersonalized(true);
                            setSubmitCount((prev) => prev + 1);
                        }}
                        className="bg-brand-orange text-white font-bold py-3 px-5 rounded-md hover:opacity-90 text-base"
                    >
                        {isPersonalized ? 'この回答でおすすめを更新' : 'おすすめを見る'}
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            setHasStarted(true);
                            setIsPersonalized(false);
                            setPendingScrollToRanking(true);
                        }}
                        className="border border-black/20 bg-white text-brand-text py-3 px-5 rounded-md text-base"
                    >
                        診断をスキップして比較を見る
                    </button>
                </div>
            </div>

            {hasStarted && isPersonalized ? (
                <div ref={recommendationRef} className="pt-8 space-y-4">
                    <div className="rounded-xl bg-gradient-to-r from-brand-surface-alt to-white border border-black/10 p-5 md:p-6">
                        <p className="text-base text-brand-muted">診断結果</p>
                        <h2 className="text-3xl md:text-4xl font-bold text-brand-text mt-1">あなたへのおすすめ3件</h2>
                    </div>

                    {topThree.map((item, index) => (
                        <div key={item.office.id}>
                            <OfficeCard
                                office={item.office}
                                rank={index + 1}
                                reasons={item.reasons}
                                mode="comparison"
                            />
                            <div className="rounded-md border-2 border-brand-orange bg-white p-5 -mt-2 shadow-sm">
                                <p className="text-lg font-bold text-brand-text mb-1">
                                    「{item.office.name}」があなたに合う理由
                                </p>
                                <p className="text-sm text-brand-lime-strong font-semibold mb-2">編集部コメント</p>
                                <ul className="text-base text-brand-muted space-y-1.5">
                                    {item.reasons.slice(0, 3).map((reason) => (
                                        <li key={reason}>・{reason}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            ) : null}

            <div id="rankings" ref={rankingAnchorRef} className="pt-8" />

            {!hasStarted ? (
                <div>
                    <details className="rounded-lg border border-black/10 bg-white p-4">
                        <summary className="cursor-pointer list-none flex items-center justify-between">
                            <div>
                                <p className="text-base text-brand-muted">比較一覧</p>
                                <h2 className="text-2xl font-bold text-brand-text">鹿児島 就労移行支援 比較一覧</h2>
                            </div>
                            <span className="text-sm text-brand-lime-strong underline">開く</span>
                        </summary>
                        <div className="mt-4 space-y-4">
                            {comparisonOffices.map((office, index) => (
                                <OfficeCard
                                    key={office.id}
                                    office={office}
                                    rank={index + 1}
                                    mode="comparison"
                                />
                            ))}
                        </div>
                    </details>
                </div>
            ) : null}

            {hasStarted ? (
                <div className="space-y-4">
                    <div>
                        <p className="text-base text-brand-muted">比較一覧</p>
                        <h2 className="text-3xl font-bold text-brand-text">
                            {isPersonalized ? 'その他の事業所' : '鹿児島 就労移行支援 比較一覧'}
                        </h2>
                    </div>
                    {remainingOffices.map((office, index) => (
                        <OfficeCard
                            key={office.id}
                            office={office}
                            rank={isPersonalized ? topThree.length + index + 1 : index + 1}
                            mode="comparison"
                        />
                    ))}
                </div>
            ) : null}
        </section>
    );
};
