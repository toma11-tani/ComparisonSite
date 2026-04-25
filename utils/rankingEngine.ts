import { QuizAnswers } from '../types';

export interface QuizQuestionOption<T extends string> {
    value: T;
    label: string;
}

export interface QuizQuestion<T extends string> {
    id: keyof QuizAnswers;
    question: string;
    options: QuizQuestionOption<T>[];
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
