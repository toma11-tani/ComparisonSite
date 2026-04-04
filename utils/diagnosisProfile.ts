import { QuizAnswers } from '../types';

export type DiagnosisProfileId =
    | 'stable_commute'
    | 'flexible_remote'
    | 'hands_on'
    | 'skill_up'
    | 'practical';

export interface DiagnosisProfile {
    id: DiagnosisProfileId;
    title: string;
    summary: string;
    selectionPoints: string[];
    visitChecklist: string[];
}

const profilePriority: DiagnosisProfileId[] = [
    'flexible_remote',
    'stable_commute',
    'hands_on',
    'practical',
    'skill_up'
] as const;

const getProfileScores = (answers: QuizAnswers): Record<DiagnosisProfileId, number> => {
    const scores: Record<DiagnosisProfileId, number> = {
        stable_commute: 0,
        flexible_remote: 0,
        hands_on: 0,
        skill_up: 0,
        practical: 0
    };

    if (answers.deliveryMode === 'remote') {
        scores.flexible_remote += 6;
    } else if (answers.deliveryMode === 'hybrid') {
        scores.flexible_remote += 3;
    } else {
        scores.stable_commute += 1;
    }

    if (answers.locationPriority === 'station') {
        scores.stable_commute += 2;
    } else if (answers.locationPriority === 'program') {
        scores.hands_on += 1;
        scores.practical += 2;
    }

    if (answers.supportIntensity === 'hands_on') {
        scores.hands_on += 6;
        scores.stable_commute += 1;
    } else if (answers.supportIntensity === 'balanced') {
        scores.skill_up += 1;
        scores.practical += 2;
        scores.stable_commute += 1;
    } else {
        scores.skill_up += 2;
        scores.flexible_remote += 1;
    }

    if (answers.programFocus === 'office') {
        scores.skill_up += 4;
    } else if (answers.programFocus === 'it_web') {
        scores.skill_up += 5;
        scores.flexible_remote += 2;
    } else if (answers.programFocus === 'practical') {
        scores.practical += 7;
        scores.hands_on += 1;
    } else {
        scores.stable_commute += 5;
        scores.hands_on += 4;
    }

    if (answers.timeline === 'steady') {
        scores.stable_commute += 3;
        scores.hands_on += 1;
    } else if (answers.timeline === 'standard') {
        scores.practical += 1;
        scores.stable_commute += 2;
    } else {
        scores.skill_up += 2;
        scores.flexible_remote += 1;
    }

    return scores;
};

const buildProfileContent = (profileId: DiagnosisProfileId, answers: QuizAnswers): Omit<DiagnosisProfile, 'traits'> => {
    switch (profileId) {
        case 'stable_commute':
            return {
                id: profileId,
                title: '無理なく通いたいタイプ',
                summary:
                    answers.timeline === 'steady' || answers.programFocus === 'life_rhythm'
                        ? 'まずは生活リズムや通うペースを整えながら、無理なく就職準備を進めたいタイプです。'
                        : '通いやすさや続けやすさを大切にしながら、落ち着いて就職準備を進めたいタイプです。',
                selectionPoints: [
                    '通所日数や利用時間を段階的に調整しやすいか',
                    '生活リズムづくりや定着支援の案内があるか',
                    answers.locationPriority === 'station'
                        ? '通い続けやすい場所にあるか'
                        : '体調に合わせて無理なく続けられる運営か'
                ],
                visitChecklist: [
                    '週何日から利用を始められるか',
                    '体調や生活状況に合わせた相談ができるか',
                    '就職後のフォローや定着支援があるか'
                ]
            };
        case 'flexible_remote':
            return {
                id: profileId,
                title: '在宅も使いながら進めたいタイプ',
                summary:
                    answers.deliveryMode === 'remote'
                        ? '通所だけに絞らず、在宅訓練も活用しながら就職準備を進めたいタイプです。'
                        : '通所と在宅をうまく組み合わせながら、自分に合うペースで進めたいタイプです。',
                selectionPoints: [
                    '在宅利用や通所との併用に対応しているか',
                    answers.programFocus === 'office' || answers.programFocus === 'it_web'
                        ? 'PC学習や就活支援を自宅でも進めやすいか'
                        : '在宅でも続けやすい支援内容になっているか',
                    '連絡手段やフォロー体制がわかりやすいか'
                ],
                visitChecklist: [
                    '在宅利用ができる条件や頻度',
                    '通所と在宅をどう組み合わせるか',
                    '在宅時の1日の流れや相談方法'
                ]
            };
        case 'hands_on':
            return {
                id: profileId,
                title: '手厚いサポートを受けたいタイプ',
                summary:
                    '一人で進めるよりも、相談のしやすさや伴走支援の手厚さを重視して事業所を選びたいタイプです。',
                selectionPoints: [
                    '面談や相談の頻度が自分に合っているか',
                    '応募書類や面接対策をどこまで一緒に進めてもらえるか',
                    '困った時に相談しやすい雰囲気があるか'
                ],
                visitChecklist: [
                    '担当スタッフとの関わり方や面談の流れ',
                    '見学から利用開始までのサポート内容',
                    '就職活動で同行やフォローがあるか'
                ]
            };
        case 'practical':
            return {
                id: profileId,
                title: '実践的な訓練を重視したいタイプ',
                summary:
                    '座学だけでなく、実習や実務に近いトレーニングを通して就職準備を進めたいタイプです。',
                selectionPoints: [
                    '実習や実務に近い訓練の機会があるか',
                    '就職後をイメージしやすいプログラム内容か',
                    '企業見学や職場体験につながる導線があるか'
                ],
                visitChecklist: [
                    'どんな訓練をどのくらいの頻度で行うか',
                    '実習や職場体験の進め方',
                    '訓練から就職支援につながる流れ'
                ]
            };
        case 'skill_up':
        default:
            return {
                id: profileId,
                title: 'スキルアップを重視したいタイプ',
                summary:
                    answers.programFocus === 'it_web'
                        ? 'IT・Web系の学習を軸にしながら、就職につながる力を身につけたいタイプです。'
                        : 'PCや事務系のスキルを身につけながら、就職準備を進めたいタイプです。',
                selectionPoints: [
                    answers.programFocus === 'it_web'
                        ? 'IT・Web系の学習メニューが自分に合っているか'
                        : 'PC・事務系の訓練内容が自分に合っているか',
                    '自分のペースで学習を進めやすいか',
                    '学んだ内容を就職活動につなげる支援があるか'
                ],
                visitChecklist: [
                    '1日の訓練メニューや学習の進め方',
                    'わからない時の質問やサポート方法',
                    '学んだ内容が希望する仕事につながりそうか'
                ]
            };
    }
};

export const getDiagnosisProfile = (answers: QuizAnswers): DiagnosisProfile => {
    const scores = getProfileScores(answers);

    const selectedProfileId = profilePriority.reduce((currentBest, candidate) => {
        if (scores[candidate] > scores[currentBest]) {
            return candidate;
        }
        return currentBest;
    }, profilePriority[0]);

    return buildProfileContent(selectedProfileId, answers);
};
