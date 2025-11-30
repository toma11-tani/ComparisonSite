import { Office } from '../types';

export const offices: Office[] = [
    {
        id: 'reversal-kagoshima',
        name: 'リバーサル鹿児島',
        type: 'Transition',
        area: 'Tenmonkan',
        main_skills: ['Webデザイン', 'プログラミング', '事務・Office', '英語'],
        features: ['定着率100%', '交通費支給', '昼食助成', '企業実習充実', '少人数制'],
        is_client: true,
        tier: 'Platinum',
        meta: {
            description: '【天文館通駅 徒歩3分】「働きたい」を叶える、IT・Webスキル特化型の就労移行支援。一人ひとりに合わせたカリキュラムと、手厚い就職サポートで高い定着率を実現しています。見学・体験は随時無料受付中。',
            address: '鹿児島県鹿児島市東千石町',
            cta_link: 'https://reversal.jp/kagoshima', // 仮のリンク
            image_url: '/images/reversal.jpg',
            opening_hours: '10:00 - 16:00 (土日祝休み)',
            phone: '099-123-4567'
        }
    },
    {
        id: 'manaby-kagoshima',
        name: 'manaby 鹿児島中央',
        type: 'Transition',
        area: 'ChuoStation',
        main_skills: ['Webデザイン', 'プログラミング', '在宅ワーク'],
        features: ['在宅OK', 'eラーニング', '個別ブース'],
        is_client: false,
        tier: 'Platinum',
        meta: {
            description: '「自分らしく働く」を学ぶ。ITスキルを在宅でも学べるeラーニングシステムが充実。',
            address: '鹿児島県鹿児島市中央町',
            cta_link: '#',
            image_url: '/images/manaby.jpg'
        }
    },
    {
        id: 'welbe-kagoshima',
        name: 'ウェルビー 鹿児島センター',
        type: 'Transition',
        area: 'ChuoStation',
        main_skills: ['事務・Office', 'ビジネスマナー', '軽作業'],
        features: ['大手グループ', '模擬オフィス', '就職実績多数'],
        is_client: false,
        tier: 'Platinum',
        meta: {
            description: '全国展開の大手就労移行支援。模擬オフィスでの実践的なトレーニングが特徴。',
            address: '鹿児島県鹿児島市西田',
            cta_link: '#',
            image_url: '/images/welbe.jpg'
        }
    },
    {
        id: 'litalico-kagoshima',
        name: 'LITALICOワークス 鹿児島',
        type: 'Transition',
        area: 'Tenmonkan',
        main_skills: ['自己理解', '対人スキル', '事務・Office'],
        features: ['業界最大手', '独自のプログラム', '定着支援'],
        is_client: false,
        tier: 'Platinum',
        meta: {
            description: '「障害のない社会をつくる」LITALICOグループ。一人ひとりの特性に合わせた個別支援計画。',
            address: '鹿児島県鹿児島市山之口町',
            cta_link: '#',
            image_url: '/images/litalico.jpg'
        }
    },
    {
        id: 'cocorport-kagoshima',
        name: 'Cocorport 鹿児島',
        type: 'Transition',
        area: 'Tenmonkan',
        main_skills: ['事務・Office', '資格取得', 'コミュニケーション'],
        features: ['交通費助成', 'ランチ提供', '資格取得支援'],
        is_client: false,
        tier: 'Platinum',
        meta: {
            description: '通いやすさを重視したサポート体制。交通費・ランチ助成など福利厚生が充実。',
            address: '鹿児島県鹿児島市中町',
            cta_link: '#',
            image_url: '/images/cocorport.jpg'
        }
    },
    {
        id: 'atgp-kagoshima',
        name: 'atGPジョブトレ 鹿児島',
        type: 'Transition',
        area: 'Tenmonkan',
        main_skills: ['事務・Office', 'Web制作', 'うつ症状専門'],
        features: ['症状別コース', 'メンタルケア', '復職支援'],
        is_client: false,
        tier: 'Basic',
        meta: {
            description: 'うつ症状のある方のための専門コースなど、症状に合わせた専門的な支援を提供。',
            address: '鹿児島県鹿児島市加治屋町',
            cta_link: '#',
            image_url: '/images/atgp.jpg'
        }
    },
    {
        id: 'mirai-kagoshima',
        name: '就労移行支援事業所 みらい',
        type: 'Transition',
        area: 'Other',
        main_skills: ['軽作業', '清掃', '調理'],
        features: ['地域密着', 'アットホーム', '生活支援'],
        is_client: false,
        tier: 'Basic',
        meta: {
            description: '地域に根ざしたアットホームな事業所。生活リズムの構築からサポート。',
            address: '鹿児島県鹿児島市宇宿',
            cta_link: '#',
            image_url: '/images/mirai.jpg'
        }
    },
    {
        id: 'smile-work',
        name: 'スマイルワーク',
        type: 'B_Type',
        area: 'Other',
        main_skills: ['手芸', '箱詰め', '農作業'],
        features: ['短時間OK', '送迎あり', '工賃あり'],
        is_client: false,
        tier: 'Basic',
        meta: {
            description: '自分のペースで働けるB型事業所。手芸や農作業など多様な作業を用意。',
            address: '鹿児島県鹿児島市谷山',
            cta_link: '#',
            image_url: '/images/smile.jpg'
        }
    },
    {
        id: 'kagoshima-step',
        name: '鹿児島ステップ・アップ',
        type: 'Transition',
        area: 'ChuoStation',
        main_skills: ['PC基礎', 'ビジネスマナー'],
        features: ['初心者歓迎', '資格試験会場'],
        is_client: false,
        tier: 'Basic',
        meta: {
            description: 'パソコン初心者からでも安心して学べるカリキュラム。',
            address: '鹿児島県鹿児島市武',
            cta_link: '#',
            image_url: '/images/step.jpg'
        }
    },
    {
        id: 'sun-village',
        name: 'サンヴィレッジ鹿児島',
        type: 'Transition',
        area: 'Tenmonkan',
        main_skills: ['事務', '販売', '清掃'],
        features: ['体験実習', '就職相談'],
        is_client: false,
        tier: 'Basic',
        meta: {
            description: '実習中心のカリキュラムで実践力を身につける。',
            address: '鹿児島県鹿児島市大黒町',
            cta_link: '#',
            image_url: '/images/sun.jpg'
        }
    }
];
