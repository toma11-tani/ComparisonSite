'use client';

import Link from 'next/link';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { offices } from '../data/offices';
import { quizQuestions } from '../utils/rankingEngine';
import { getDiagnosisProfile } from '../utils/diagnosisProfile';
import { getReversalPromotion } from '../utils/reversalPromotion';
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
    hasStarted: boolean;
    showDiagnosisResult: boolean;
    isPersonalized?: boolean;
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
    const [hasStarted, setHasStarted] = useState(false);
    const [showDiagnosisResult, setShowDiagnosisResult] = useState(false);
    const [submitCount, setSubmitCount] = useState(0);
    const [pendingScrollToRanking, setPendingScrollToRanking] = useState(false);
    const [pendingHashScroll, setPendingHashScroll] = useState<string | null>(null);
    const [hasHydratedState, setHasHydratedState] = useState(false);
    const hashScrollAttemptRef = useRef(0);
    const resultRef = useRef<HTMLDivElement | null>(null);
    const rankingAnchorRef = useRef<HTMLDivElement | null>(null);

    const comparisonOffices = useMemo(
        () =>
            preferredBrandOrder
                .map((brand) => offices.find((office) => getOfficeBrand(office.name) === brand))
                .filter((office): office is (typeof offices)[number] => Boolean(office)),
        []
    );

    const diagnosisProfile = useMemo(
        () => (showDiagnosisResult ? getDiagnosisProfile(answers) : null),
        [answers, showDiagnosisResult]
    );

    const reversalPromotion = useMemo(
        () => (diagnosisProfile ? getReversalPromotion(diagnosisProfile.id) : null),
        [diagnosisProfile]
    );

    useEffect(() => {
        if (!showDiagnosisResult || submitCount === 0) return;
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, [showDiagnosisResult, submitCount]);

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
                }

                setShowDiagnosisResult(
                    forceOpenByHash ? false : Boolean(parsed.showDiagnosisResult ?? parsed.isPersonalized)
                );
                setHasStarted(Boolean(parsed.hasStarted) || forceOpenByHash);
            } else if (forceOpenByHash) {
                setHasStarted(true);
            }
        } catch {
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
                setShowDiagnosisResult(false);
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
            hasStarted,
            showDiagnosisResult
        };
        sessionStorage.setItem(DIAGNOSIS_STORAGE_KEY, JSON.stringify(payload));
    }, [answers, hasStarted, showDiagnosisResult, hasHydratedState]);

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
    }, [pendingScrollToRanking]);

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
    }, [pendingHashScroll, hasStarted]);

    const handleOptionChange = <K extends keyof QuizAnswers>(key: K, value: QuizAnswers[K]) => {
        setAnswers((prev) => ({ ...prev, [key]: value }));
    };

    return (
        <section id="diagnosis" className="max-w-5xl mx-auto px-4 py-10 mt-4 md:mt-6">
            <div className="space-y-5">
                <div className="rounded-xl bg-gradient-to-r from-brand-surface-alt to-white border border-black/10 p-5 md:p-6">
                    <p className="text-base text-brand-muted">5問診断</p>
                    <h1 className="text-3xl md:text-4xl font-bold text-brand-text mt-1">
                        自分に合う事業所の選び方を整理します
                    </h1>
                    <p className="text-base text-brand-muted mt-2 leading-relaxed">
                        回答内容からタイプと、見学で確認したいポイントを表示します。
                    </p>
                </div>

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
                            setShowDiagnosisResult(true);
                            setSubmitCount((prev) => prev + 1);
                        }}
                        className="bg-brand-orange text-white font-bold py-3 px-5 rounded-md hover:opacity-90 text-base"
                    >
                        診断結果を見る
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            setHasStarted(true);
                            setShowDiagnosisResult(false);
                            setPendingScrollToRanking(true);
                        }}
                        className="border border-black/20 bg-white text-brand-text py-3 px-5 rounded-md text-base"
                    >
                        診断をスキップして掲載事業所を見る
                    </button>
                </div>
            </div>

            {hasStarted && showDiagnosisResult && diagnosisProfile && reversalPromotion ? (
                <div ref={resultRef} className="pt-8 space-y-4">
                    <div className="rounded-xl bg-gradient-to-r from-brand-surface-alt to-white border border-black/10 p-5 md:p-6">
                        <p className="text-base text-brand-muted">診断結果</p>
                        <h2 className="text-3xl md:text-4xl font-bold text-brand-text mt-1">
                            あなたは「{diagnosisProfile.title}」です
                        </h2>
                        <p className="text-base text-brand-muted mt-3 leading-relaxed">
                            {diagnosisProfile.summary}
                        </p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="rounded-lg border border-black/10 bg-white p-5">
                            <p className="text-sm font-semibold text-brand-lime-strong">事業所選びのポイント</p>
                            <ul className="mt-3 space-y-2 text-base text-brand-muted leading-relaxed">
                                {diagnosisProfile.selectionPoints.map((item) => (
                                    <li key={item}>・{item}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="rounded-lg border border-black/10 bg-white p-5">
                            <p className="text-sm font-semibold text-brand-lime-strong">見学で確認したいこと</p>
                            <ul className="mt-3 space-y-2 text-base text-brand-muted leading-relaxed">
                                {diagnosisProfile.visitChecklist.map((item) => (
                                    <li key={item}>・{item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="rounded-xl border border-brand-orange/40 bg-white p-5 md:p-6">
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="inline-flex rounded-full bg-brand-orange px-2.5 py-1 text-xs font-bold tracking-[0.14em] text-white">
                                PR
                            </span>
                            <p className="text-sm font-semibold text-brand-orange">運営元リバーサル鹿児島のご案内</p>
                        </div>
                        <h3 className="mt-4 text-2xl font-bold text-brand-text">
                            {reversalPromotion.heading}
                        </h3>
                        <p className="mt-3 text-base text-brand-muted leading-relaxed">
                            {reversalPromotion.intro}
                        </p>
                        <ul className="mt-4 space-y-2 text-base text-brand-muted leading-relaxed">
                            {reversalPromotion.highlights.map((item) => (
                                <li key={item}>・{item}</li>
                            ))}
                        </ul>
                        <p className="mt-4 text-sm text-brand-muted leading-relaxed">
                            {reversalPromotion.note}
                        </p>
                        <div className="mt-5">
                            <Link
                                href="/offices/reversal-kagoshima"
                                className="inline-flex items-center justify-center rounded-md bg-brand-orange px-5 py-2.5 text-base font-bold text-white hover:opacity-90"
                            >
                                リバーサル鹿児島の詳細を見る
                            </Link>
                        </div>
                    </div>

                    <div className="rounded-lg border border-brand-orange/40 bg-white p-5">
                        <p className="text-base text-brand-muted leading-relaxed">
                            診断結果を参考にしながら、気になる事業所の公開情報や見学時の印象を見比べて選んでみてください。
                        </p>
                        <button
                            type="button"
                            onClick={() => setPendingScrollToRanking(true)}
                            className="mt-4 bg-brand-orange text-white font-bold py-2.5 px-5 rounded-md hover:opacity-90"
                        >
                            掲載事業所を見る
                        </button>
                    </div>
                </div>
            ) : null}

            <div id="rankings" ref={rankingAnchorRef} className="pt-8" />

            {!hasStarted ? (
                <div>
                    <details className="rounded-lg border border-black/10 bg-white p-4">
                        <summary className="cursor-pointer list-none flex items-center justify-between">
                            <div>
                                <p className="text-base text-brand-muted">掲載事業所</p>
                                <h2 className="text-2xl font-bold text-brand-text">鹿児島の掲載事業所一覧</h2>
                                <p className="mt-2 text-sm text-brand-muted leading-relaxed">
                                    掲載順は順位ではありません。各事業所の公開情報をもとに掲載しています。
                                </p>
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
                        <p className="text-base text-brand-muted">掲載事業所</p>
                        <h2 className="text-3xl font-bold text-brand-text">鹿児島の掲載事業所一覧</h2>
                        <p className="mt-2 text-sm text-brand-muted leading-relaxed">
                            掲載順は順位ではありません。各事業所の公開情報をもとに掲載しています。
                        </p>
                    </div>
                    {comparisonOffices.map((office, index) => (
                        <OfficeCard
                            key={office.id}
                            office={office}
                            rank={index + 1}
                            mode="comparison"
                        />
                    ))}
                </div>
            ) : null}
        </section>
    );
};
