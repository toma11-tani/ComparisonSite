import { DiagnosisProfileId } from './diagnosisProfile';

export interface ReversalPromotionContent {
    heading: string;
    intro: string;
    highlights: string[];
    note: string;
}

const commonNote =
    '以下は運営元による案内です。第三者による中立的な推薦ではありません。支援内容や利用条件の詳細は、見学時にご確認ください。';

const promotionByProfile: Record<DiagnosisProfileId, ReversalPromotionContent> = {
    stable_commute: {
        heading: '「無理なく通いたいタイプ」の方へ',
        intro:
            '通いやすさや続けやすさを重視する方に向けて、リバーサル鹿児島で見学時に確認しやすい特徴をご案内します。',
        highlights: [
            '天文館通駅から徒歩2分で、通所の負担感を現地で確かめやすい立地です。',
            '生活訓練や就職後の定着支援、復職支援の案内があり、無理のない利用ペースを相談しやすい構成です。',
            '昼食補助や資格取得支援の記載があり、継続面の相談ポイントも確認できます。'
        ],
        note: commonNote
    },
    flexible_remote: {
        heading: '「在宅も使いながら進めたいタイプ」の方へ',
        intro:
            '通所だけに絞らず進めたい方に向けて、リバーサル鹿児島で確認しやすい特徴をご案内します。',
        highlights: [
            '在宅訓練は相談可能で、通所との組み合わせ方を見学時に確認できます。',
            'パソコン訓練の案内があり、自宅学習とどう組み合わせるかをイメージしやすい内容です。',
            '定着支援や復職支援の案内があり、利用開始後のフォロー範囲も相談できます。'
        ],
        note: commonNote
    },
    hands_on: {
        heading: '「手厚いサポートを受けたいタイプ」の方へ',
        intro:
            '相談のしやすさや伴走支援を重視する方に向けて、リバーサル鹿児島の案内内容をご紹介します。',
        highlights: [
            '面接対策、応募書類作成、求人検索サポート、企業研究、ハローワーク同行の案内があります。',
            '定着支援や復職支援の案内があり、就職前後を通した相談の流れを確認できます。',
            '天文館通駅から徒歩2分で、継続して通うイメージを持ちやすい立地です。'
        ],
        note: commonNote
    },
    practical: {
        heading: '「実践的な訓練を重視したいタイプ」の方へ',
        intro:
            '実務に近い訓練を重視する方に向けて、リバーサル鹿児島で確認しやすいポイントをご案内します。',
        highlights: [
            '軽作業と実習（職場体験）の案内があり、実務に近い訓練内容を見学で確認できます。',
            '面接対策や応募書類作成の案内があり、訓練から就職活動へのつながりを確かめやすい構成です。',
            '定着支援の案内があり、就職後のフォローまで含めて相談できます。'
        ],
        note: commonNote
    },
    skill_up: {
        heading: '「スキルアップを重視したいタイプ」の方へ',
        intro:
            '学習内容や就職準備の進め方を重視する方に向けて、リバーサル鹿児島の案内内容をご紹介します。',
        highlights: [
            'パソコン訓練の案内があり、どのような学習を進めるかを具体的に確認できます。',
            '資格取得支援の記載があり、学習を形にしたい方の相談ポイントがあります。',
            '応募書類作成や面接対策の案内があり、学んだ内容を就職活動へつなげる流れを確認できます。'
        ],
        note: commonNote
    }
};

export const getReversalPromotion = (
    profileId: DiagnosisProfileId
): ReversalPromotionContent => promotionByProfile[profileId];
