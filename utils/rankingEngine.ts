import { Office, ProgramFocus, QuizAnswers } from '../types';

export interface QuizQuestionOption<T extends string> {
    value: T;
    label: string;
}

export interface QuizQuestion<T extends string> {
    id: keyof QuizAnswers;
    question: string;
    options: QuizQuestionOption<T>[];
}

export interface RankedOffice {
    office: Office;
    score: number;
    reasons: string[];
}

export const quizQuestions: [
    QuizQuestion<QuizAnswers['deliveryMode']>,
    QuizQuestion<QuizAnswers['locationPriority']>,
    QuizQuestion<QuizAnswers['supportIntensity']>,
    QuizQuestion<QuizAnswers['programFocus']>,
    QuizQuestion<QuizAnswers['timeline']>
] = [
    {
        id: 'deliveryMode',
        question: 'Q1. 希望する利用スタイルは？',
        options: [
            { value: 'commute', label: '通所中心で進めたい' },
            { value: 'hybrid', label: '通所と在宅を併用したい' },
            { value: 'remote', label: '在宅中心で進めたい' }
        ]
    },
    {
        id: 'locationPriority',
        question: 'Q2. 事業所選びで重視する点は？',
        options: [
            { value: 'station', label: '駅からの通いやすさを最優先' },
            { value: 'program', label: '立地より支援内容を優先' },
            { value: 'balanced', label: '立地と内容のバランスを重視' }
        ]
    },
    {
        id: 'supportIntensity',
        question: 'Q3. 支援の受け方の希望は？',
        options: [
            { value: 'hands_on', label: '手厚く伴走してほしい' },
            { value: 'balanced', label: '必要時に相談できる形がよい' },
            { value: 'self_paced', label: '自分のペースで進めたい' }
        ]
    },
    {
        id: 'programFocus',
        question: 'Q4. 特に重視したい内容は？',
        options: [
            { value: 'office', label: 'PC・事務スキル' },
            { value: 'it_web', label: 'IT・Web系スキル' },
            { value: 'practical', label: '実習・実務に近い訓練' },
            { value: 'life_rhythm', label: '生活リズムの安定から始めたい' }
        ]
    },
    {
        id: 'timeline',
        question: 'Q5. 就職までのペース感は？',
        options: [
            { value: 'steady', label: 'まず安定を優先して進めたい' },
            { value: 'standard', label: '半年〜1年を目安にしたい' },
            { value: 'fast', label: 'できるだけ早く就職したい' }
        ]
    }
];

const TIER_BOOST: Record<Office['tier'], number> = {
    Platinum: 2,
    Basic: 0
};

const PROGRAM_BONUS: Record<ProgramFocus, number> = {
    office: 10,
    it_web: 10,
    practical: 10,
    life_rhythm: 10
};

const REMOTE_SCORE: Record<QuizAnswers['deliveryMode'], Record<Office['matching']['remoteSupport'], number>> = {
    commute: {
        none: 8,
        available: 7,
        strong: 6
    },
    hybrid: {
        none: 3,
        available: 8,
        strong: 10
    },
    remote: {
        none: -15,
        available: 7,
        strong: 12
    }
};

const SUPPORT_SCORE: Record<QuizAnswers['supportIntensity'], Record<Office['matching']['supportStyle'], number>> = {
    hands_on: {
        hands_on: 10,
        balanced: 6,
        self_paced: 2
    },
    balanced: {
        hands_on: 7,
        balanced: 10,
        self_paced: 6
    },
    self_paced: {
        hands_on: 1,
        balanced: 6,
        self_paced: 10
    }
};

const TIMELINE_SCORE: Record<QuizAnswers['timeline'], number> = {
    steady: 10,
    standard: 8,
    fast: 8
};

const calculateStrongMismatchCount = (office: Office, answers: QuizAnswers): number => {
    let mismatchCount = 0;

    if (answers.deliveryMode === 'remote' && office.matching.remoteSupport === 'none') {
        mismatchCount += 1;
    }

    if (answers.supportIntensity === 'self_paced' && office.matching.supportStyle === 'hands_on') {
        mismatchCount += 1;
    }

    if (answers.timeline === 'fast' && !office.matching.paceFits.includes('fast')) {
        mismatchCount += 1;
    }

    return mismatchCount;
};

const calculateRankingScoreWithAnswers = (office: Office, answers: QuizAnswers): number => {
    let score = 40;

    score += TIER_BOOST[office.tier];

    // 通常時はクライアントを自然な範囲で押し上げる
    if (office.is_client) {
        score += 20;
    }

    score += REMOTE_SCORE[answers.deliveryMode][office.matching.remoteSupport];

    if (answers.locationPriority === 'station') {
        score += office.matching.nearMajorStation ? 10 : -6;
    } else if (answers.locationPriority === 'program') {
        score += office.matching.nearMajorStation ? 2 : 6;
    } else {
        score += office.matching.nearMajorStation ? 6 : 4;
    }

    score += SUPPORT_SCORE[answers.supportIntensity][office.matching.supportStyle];

    if (office.matching.programStrengths.includes(answers.programFocus)) {
        score += PROGRAM_BONUS[answers.programFocus];
    } else {
        score -= 5;
    }

    score += office.matching.paceFits.includes(answers.timeline) ? TIMELINE_SCORE[answers.timeline] : -4;

    const mismatchCount = calculateStrongMismatchCount(office, answers);
    score -= mismatchCount * 4;

    return score;
};

const buildReasons = (office: Office, answers: QuizAnswers): string[] => {
    const reasons: string[] = [];

    if (answers.deliveryMode === 'remote' && office.matching.remoteSupport !== 'none') {
        reasons.push('在宅利用の希望に対応しやすい');
    } else if (answers.deliveryMode === 'commute') {
        reasons.push('通所中心の利用に合わせやすい');
    }

    if (answers.locationPriority === 'station' && office.matching.nearMajorStation) {
        reasons.push('駅から通いやすい立地');
    }

    if (office.matching.programStrengths.includes(answers.programFocus)) {
        const programLabel: Record<QuizAnswers['programFocus'], string> = {
            office: 'PC・事務系の訓練',
            it_web: 'IT・Web系の訓練',
            practical: '実習・実務寄りの訓練',
            life_rhythm: '生活リズムの安定支援'
        };
        reasons.push(`${programLabel[answers.programFocus]}に強み`);
    }

    if (answers.supportIntensity === office.matching.supportStyle) {
        reasons.push('希望する支援スタイルに近い');
    }

    if (office.is_client) {
        reasons.push('週1通所から相談できる案内がある');
    }

    return reasons.slice(0, 3);
};

export const rankOffices = (offices: Office[], answers?: QuizAnswers): RankedOffice[] => {
    if (!answers) {
        return [...offices]
            .sort((a, b) => {
            const baseA = 50 + TIER_BOOST[a.tier] + (a.is_client ? 8 : 0);
            const baseB = 50 + TIER_BOOST[b.tier] + (b.is_client ? 8 : 0);
            return baseB - baseA;
            })
            .map((office) => ({
                office,
                score: 0,
                reasons: ['総合的な比較軸で表示中']
            }));
    }

    const ranked = [...offices]
        .map((office) => ({
            office,
            score: calculateRankingScoreWithAnswers(office, answers),
            mismatchCount: calculateStrongMismatchCount(office, answers),
            reasons: buildReasons(office, answers)
        }))
        .sort((a, b) => b.score - a.score);

    // 強ミスマッチ時はリバーサルを1位にしない。可能なら2位へ配置する。
    const top = ranked[0];
    if (top?.office.is_client && top.mismatchCount >= 2 && ranked.length > 1) {
        const [clientTop] = ranked.splice(0, 1);
        ranked.splice(1, 0, clientTop);
    }

    const clientIndex = ranked.findIndex((item) => item.office.is_client);
    if (clientIndex > 1 && ranked.length > 2) {
        const [clientItem] = ranked.splice(clientIndex, 1);
        ranked.splice(1, 0, clientItem);
    }

    return ranked.map((item) => ({
        office: item.office,
        score: item.score,
        reasons: item.reasons
    }));
};

export const sortOffices = (offices: Office[], answers?: QuizAnswers): Office[] =>
    rankOffices(offices, answers).map((item) => item.office);
