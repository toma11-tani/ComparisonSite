import { Office, FilterState } from '../types';

/**
 * 事業所のランキングスコアを計算する関数
 * 
 * 戦略:
 * 1. クライアント（リバーサル鹿児島）を最優先で表示し、CV機会を最大化する。
 * 2. ユーザーの検索条件（エリア・スキル）に合致する事業所を上位に表示し、UXを高める。
 * 3. 明らかに条件に合わないものはスコアを下げ、信頼性を担保する。
 */
export const calculateRankingScore = (office: Office, filter: FilterState): number => {
    let score = 50; // Base Score

    // 1. Client Boost (最重要)
    // リバーサル鹿児島は常に上位に表示されるよう、圧倒的な加点を行う。
    // これにより、デフォルト状態でも検索絞り込み後でも、視認性の高い位置をキープする。
    if (office.is_client) {
        score += 1000;
    }

    // 2. Area Match Boost
    // ユーザーが希望するエリアと一致する場合に加点。
    if (filter.area !== 'All' && office.area === filter.area) {
        score += 20;
    }

    // 3. Skill Match Boost
    // ユーザーが希望するスキルが、事業所のメインスキルに含まれている場合に加点。
    // 部分一致でも加点することで、検索結果が0件になるのを防ぐ。
    if (filter.skill !== 'All') {
        const hasSkill = office.main_skills.some(s => s.includes(filter.skill));
        if (hasSkill) {
            score += 10;
        } else {
            // スキル指定があるのに全くマッチしない場合は、少し減点（UX調整）
            // ただしクライアントの場合は減点幅を小さくするか、減点しない判断もあり得るが、
            // ここでは「ユーザーの利益」も考慮し、不一致なら少し下げる（ただしClient Boostが強いので上位には残る）。
            score -= 5;
        }
    }

    // 4. Tier Boost
    // Platinumプラン（上位表示契約を想定）の事業所を優遇。
    if (office.tier === 'Platinum') {
        score += 5;
    }

    return score;
};

export const sortOffices = (offices: Office[], filter: FilterState): Office[] => {
    return [...offices].sort((a, b) => {
        const scoreA = calculateRankingScore(a, filter);
        const scoreB = calculateRankingScore(b, filter);
        return scoreB - scoreA; // 降順
    });
};
