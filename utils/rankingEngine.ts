import { Office } from '../types';

/**
 * 事業所のランキングスコアを計算する関数
 *
 * 戦略:
 * 1. クライアント（リバーサル鹿児島）を最優先で表示し、CV機会を最大化する。
 * 2. Platinumプラン（上位表示契約を想定）の事業所を優遇する。
 */
export const calculateRankingScore = (office: Office): number => {
    let score = 50; // Base Score

    // 1. Client Boost (最重要)
    // リバーサル鹿児島は常に上位に表示されるよう、圧倒的な加点を行う。
    if (office.is_client) {
        score += 1000;
    }

    // 2. Tier Boost
    // Platinumプラン（上位表示契約を想定）の事業所を優遇。
    if (office.tier === 'Platinum') {
        score += 5;
    }

    return score;
};

export const sortOffices = (offices: Office[]): Office[] => {
    return [...offices].sort((a, b) => {
        const scoreA = calculateRankingScore(a);
        const scoreB = calculateRankingScore(b);
        return scoreB - scoreA; // 降順
    });
};
