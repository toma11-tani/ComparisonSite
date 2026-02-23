import { Office } from '../types';

export const offices: Office[] = [
    {
        id: 'reversal-kagoshima',
        name: 'リバーサル鹿児島',
        type: 'Transition',
        area: 'Tenmonkan',
        support_benefits: ['昼食補助（1食200円）', '資格取得支援（受験料補助あり）'],
        job_programs: ['パソコン訓練', '軽作業', '生活訓練', '実習（職場体験）'],
        job_hunt_support: ['面接対策', '応募書類作成（履歴書・職務履歴書）', '求人検索サポート', '企業研究', 'ハローワーク同行'],
        main_skills: ['就労移行支援', '定着支援', '復職（リワーク）支援'],
        features: ['天文館通駅 徒歩2分', '在宅訓練の相談可', '昼食無料・資格補助の記載あり'],
        is_client: true,
        tier: 'Platinum',
        meta: {
            description: '通所と在宅訓練の相談ができる就労移行支援事業所。就職後の定着支援や復職支援の案内があります。',
            address: '鹿児島県鹿児島市中町3-5 ババデンキビル4F',
            nearest_station: '天文館通駅',
            walking_minutes: 2,
            cta_link: 'https://www.ribasarukagoshima.jp/',
            image_url: '/images/reversal.jpg',
            phone: '099-813-7733'
        },
        matching: {
            remoteSupport: 'available',
            nearMajorStation: true,
            supportStyle: 'hands_on',
            programStrengths: ['office', 'practical', 'life_rhythm'],
            paceFits: ['steady', 'standard']
        }
    },
    {
        id: 'goshiki-work',
        name: 'ゴシキワーク',
        type: 'Transition',
        area: 'Other',
        support_benefits: [],
        job_programs: ['座学', 'グループワーク', 'JST（職場対人技能訓練）', '施設内作業・施設外作業', '企業見学（個別）', '企業実習（全体）'],
        job_hunt_support: ['ハローワーク同行', '面接同行', '就労定着支援（職場訪問によるサポート）'],
        main_skills: ['就労移行支援', '企業見学・実習', '定着支援'],
        features: ['中洲通電停 徒歩約4分（補完）', '同法人で定着/B型/生活訓練を運営', 'ジョブコーチの言及あり'],
        is_client: false,
        tier: 'Basic',
        meta: {
            description: '就労移行に加え、同法人内で就労定着・B型・生活訓練を展開。企業実習や就職後フォローの情報があります。',
            address: '鹿児島県鹿児島市武1丁目34-6',
            nearest_station: '中洲通電停',
            walking_minutes: 4,
            cta_link: 'https://www.regoshiki.com/',
            image_url: '/images/goshiki.jpg',
            phone: '099-214-2535'
        },
        matching: {
            remoteSupport: 'none',
            nearMajorStation: false,
            supportStyle: 'hands_on',
            programStrengths: ['practical', 'life_rhythm'],
            paceFits: ['steady', 'standard']
        }
    },
    {
        id: 'racine',
        name: 'ラシーネ',
        type: 'Transition',
        area: 'Other',
        support_benefits: [],
        job_programs: ['グループワーク', 'パソコン訓練', 'ビジネスマナー', 'リフレッシュヨガ', '応募書類作成（履歴書・職務履歴書）／面接対策', '実務想定訓練'],
        job_hunt_support: ['就労定着支援'],
        main_skills: ['就労移行支援', '就労定着支援', '在宅支援相談'],
        features: ['中郡電停 徒歩1分（補完）', '在宅支援の言及あり', '同法人で生活訓練/相談支援'],
        is_client: false,
        tier: 'Basic',
        meta: {
            description: '就労移行と就労定着を提供し、在宅支援の案内もある事業所です。',
            address: '鹿児島県鹿児島市郡元2丁目1-4',
            nearest_station: '中郡電停',
            walking_minutes: 1,
            cta_link: 'https://www.npo-racine.com/ラシーネ',
            image_url: '/images/racine.jpg',
            phone: '099-813-8852'
        },
        matching: {
            remoteSupport: 'available',
            nearMajorStation: true,
            supportStyle: 'hands_on',
            programStrengths: ['office', 'practical', 'life_rhythm'],
            paceFits: ['steady', 'standard']
        }
    },
    {
        id: 'welbe-kagoshima-chuo',
        name: 'ウェルビー 鹿児島中央センター',
        type: 'Transition',
        area: 'ChuoStation',
        support_benefits: [],
        job_programs: ['パソコン訓練', 'ウォーキング', 'オフィスワークシミュレーション', 'グループワーク・グループディスカッション', 'ビジネスマナー', 'ベーシックトレーニング（軽作業）'],
        job_hunt_support: ['就労定着支援', '復職支援（リワーク）'],
        main_skills: ['就労移行支援', '就労定着支援', '復職支援（リワーク）'],
        features: ['鹿児島中央駅東口 徒歩8分', '利用定員16名', '曜日別利用時間を公開'],
        is_client: false,
        tier: 'Platinum',
        meta: {
            description: '鹿児島中央駅徒歩圏。就労移行・定着に加え、復職支援（リワーク）にも対応する拠点です。',
            address: '鹿児島県鹿児島市上之園町4-6 アルベラータ上之園 2階B号室',
            nearest_station: '鹿児島中央駅（東口）',
            walking_minutes: 8,
            cta_link: 'https://www.welbe.co.jp/center/kagoshima/kagoshimachuo.html',
            image_url: '/images/welbe.jpg',
            phone: '099-230-7601'
        },
        matching: {
            remoteSupport: 'none',
            nearMajorStation: true,
            supportStyle: 'balanced',
            programStrengths: ['office', 'practical', 'life_rhythm'],
            paceFits: ['standard', 'fast']
        }
    },
    {
        id: 'welbe-kagoshima-chuo-2',
        name: 'ウェルビー 鹿児島中央第2センター',
        type: 'Transition',
        area: 'ChuoStation',
        main_skills: ['就労移行支援', '就労定着支援', '就職活動支援'],
        features: ['鹿児島中央駅東口 徒歩6分', '利用定員16名', '曜日別利用時間を公開'],
        is_client: false,
        tier: 'Platinum',
        meta: {
            description: '就労移行と就労定着を提供する鹿児島中央駅近くの拠点です。',
            address: '鹿児島県鹿児島市中央町4-34 メディカルミュゼビル中央駅4階',
            nearest_station: '鹿児島中央駅（東口）',
            walking_minutes: 6,
            cta_link: 'https://www.welbe.co.jp/center/kagoshima/kagoshimachuo2.html',
            image_url: '/images/welbe2.jpg',
            phone: '099-296-9380'
        },
        matching: {
            remoteSupport: 'none',
            nearMajorStation: true,
            supportStyle: 'balanced',
            programStrengths: ['office', 'life_rhythm'],
            paceFits: ['standard', 'fast']
        }
    },
    {
        id: 'manaby-kagoshima',
        name: 'マナビー 鹿児島事業所',
        type: 'Transition',
        area: 'Tenmonkan',
        support_benefits: ['在宅利用'],
        job_programs: ['パソコンスキル習得', 'ソーシャルスキルトレーニング', 'eラーニング学習（1500以上の動画）', '職場実習'],
        job_hunt_support: ['求人検索サポート', '業界研究', '面接対策', '応募書類作成（履歴書・職務履歴書）'],
        main_skills: ['就労移行支援', '在宅訓練', 'eラーニング学習'],
        features: ['高見馬場駅 徒歩1分', '在宅/通所併用可を明記', '企業見学・実習の記載あり'],
        is_client: false,
        tier: 'Platinum',
        meta: {
            description: '在宅と通所の併用を明記している就労移行支援事業所。eラーニング中心に学習できます。',
            address: '鹿児島県鹿児島市山之口町1-30 Idehara-BLD 8階',
            nearest_station: '高見馬場駅',
            walking_minutes: 1,
            cta_link: 'https://manaby.co.jp/office/kagoshima/',
            image_url: '/images/manaby.jpg',
            phone: '099-201-5231'
        },
        matching: {
            remoteSupport: 'strong',
            nearMajorStation: true,
            supportStyle: 'self_paced',
            programStrengths: ['it_web', 'office', 'practical'],
            paceFits: ['steady', 'standard']
        }
    },
    {
        id: 'hac',
        name: 'HAC',
        type: 'Transition',
        area: 'Other',
        support_benefits: ['昼食提供'],
        job_programs: ['生活リズムづくり', 'うぬぼれプロジェクト', '軽作業訓練', 'パソコン訓練', 'ビジネスマナー', 'クラブ活動'],
        job_hunt_support: ['就職活動準備', '採用試験対策', '面接対策', '面談・相談（必要に応じて実施）'],
        main_skills: ['就労移行支援', '自己理解プログラム', '軽作業訓練'],
        features: ['新屋敷電停 徒歩1分', '昼食提供の記載あり', '自己理解プログラムの記載あり'],
        is_client: false,
        tier: 'Basic',
        meta: {
            description: '新屋敷電停近くの就労移行支援事業所。パンフで日課や昼食提供の案内があります。',
            address: '鹿児島県鹿児島市新屋敷町16番 公社ビル420号',
            nearest_station: '新屋敷電停',
            walking_minutes: 1,
            cta_link: 'https://hac-kg.co.jp/',
            image_url: '/images/hac.jpg',
            phone: '099-298-9689'
        },
        matching: {
            remoteSupport: 'none',
            nearMajorStation: true,
            supportStyle: 'balanced',
            programStrengths: ['office', 'practical', 'life_rhythm'],
            paceFits: ['steady', 'standard']
        }
    },
    {
        id: 'shogaisha-shuro-academy',
        name: '障害者就労アカデミー',
        type: 'Transition',
        area: 'Other',
        main_skills: ['就労選択支援', '就労移行支援', '就労定着支援'],
        features: ['新屋敷バス停 徒歩1分', '職場体験・実習中心', '個別支援計画を明記'],
        is_client: false,
        tier: 'Basic',
        meta: {
            description: '選択→移行→定着まで一体で提供。実習中心で適職探索を進める支援スタイルです。',
            address: '鹿児島県鹿児島市新屋敷町16番401号・406号',
            nearest_station: '新屋敷バス停',
            walking_minutes: 1,
            cta_link: 'https://shuro-academy.jp/about/',
            image_url: '/images/academy.jpg',
            phone: '099-219-3456'
        },
        matching: {
            remoteSupport: 'none',
            nearMajorStation: true,
            supportStyle: 'hands_on',
            programStrengths: ['practical', 'office'],
            paceFits: ['standard', 'fast']
        }
    },
    {
        id: 'clover',
        name: 'クローバー三つ葉事業所',
        type: 'Transition',
        area: 'Tenmonkan',
        main_skills: ['就労移行支援', '就労定着支援', '就職準備'],
        features: ['高見馬場駅 徒歩3分（補完）', 'バス停徒歩1分（補完）', '移行+定着の種別確認'],
        is_client: false,
        tier: 'Basic',
        meta: {
            description: '高見馬場近くの事業所。外部DBで就労移行・就労定着の種別情報が確認できます。',
            address: '鹿児島県鹿児島市西千石町17-28 NADESHIKOビル6F',
            nearest_station: '高見馬場駅',
            walking_minutes: 3,
            cta_link: 'https://www.bsd.jp.net/office.html',
            image_url: '/images/clover.jpg',
            phone: '099-248-8771'
        },
        matching: {
            remoteSupport: 'none',
            nearMajorStation: true,
            supportStyle: 'balanced',
            programStrengths: ['office', 'life_rhythm'],
            paceFits: ['steady', 'standard']
        }
    },
    {
        id: 'with',
        name: 'ウィズ',
        type: 'Transition',
        area: 'Other',
        main_skills: ['就労移行支援', '生活訓練', '就労継続B型'],
        features: ['JR谷山駅 徒歩15分（補完）', '就労定着支援を含む多機能型', '定員情報を公開'],
        is_client: false,
        tier: 'Basic',
        meta: {
            description: '生活訓練・就労移行・B型・定着までを提供する多機能型事業所です。',
            address: '鹿児島県鹿児島市谷山中央2丁目657番4',
            nearest_station: 'JR谷山駅',
            walking_minutes: 15,
            cta_link: 'https://tokiwakai.com/sisetsu/shogai/wiz/',
            image_url: '/images/with.jpg',
            phone: '099-299-0300'
        },
        matching: {
            remoteSupport: 'none',
            nearMajorStation: false,
            supportStyle: 'hands_on',
            programStrengths: ['life_rhythm', 'practical'],
            paceFits: ['steady']
        }
    },
    {
        id: 'tio-kagoshima-chuo',
        name: 'ティオ 鹿児島中央',
        type: 'Transition',
        area: 'ChuoStation',
        main_skills: ['就労移行支援', 'オンライン在宅サポート', '就職支援'],
        features: ['鹿児島中央駅東口 徒歩5分', '在宅PCレンタルの記載あり', '面接同行の記載あり'],
        is_client: false,
        tier: 'Platinum',
        meta: {
            description: '通所と在宅オンラインを併用しやすい就労移行支援。面接同行やPC貸与などの記載があります。',
            address: '鹿児島県鹿児島市西田1丁目4-12 下釜ビル2階',
            nearest_station: '鹿児島中央駅（東口）',
            walking_minutes: 5,
            cta_link: 'https://fit2022.or.jp/access/kagoshima_chuo/',
            image_url: '/images/tio-chuo.jpg',
            phone: '099-272-9777'
        },
        matching: {
            remoteSupport: 'strong',
            nearMajorStation: true,
            supportStyle: 'balanced',
            programStrengths: ['office', 'it_web'],
            paceFits: ['standard', 'fast']
        }
    },
    {
        id: 'tio-kagoshima-nichudori',
        name: 'ティオ 鹿児島二中通',
        type: 'Transition',
        area: 'Other',
        main_skills: ['就労移行支援', 'オンライン在宅サポート', '軽作業訓練'],
        features: ['二中通駅 徒歩1分', '通所/在宅の日課を公開', '在宅PCレンタルの記載あり'],
        is_client: false,
        tier: 'Platinum',
        meta: {
            description: '駅近で通いやすく、在宅オンライン支援も明記している就労移行支援事業所です。',
            address: '鹿児島県鹿児島市荒田1丁目16-3 YU FIRST BLDG. 5階',
            nearest_station: '二中通駅',
            walking_minutes: 1,
            cta_link: 'https://fit2022.or.jp/access/kagoshima_nichudori/',
            image_url: '/images/tio-nichudori.jpg',
            phone: '099-272-9997'
        },
        matching: {
            remoteSupport: 'strong',
            nearMajorStation: true,
            supportStyle: 'balanced',
            programStrengths: ['practical', 'office'],
            paceFits: ['standard', 'fast']
        }
    }
];
