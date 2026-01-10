export type Area = 'Tenmonkan' | 'ChuoStation' | 'Other';
export type OfficeType = 'Transition' | 'B_Type';
export type Tier = 'Platinum' | 'Basic';

export interface Office {
  id: string;
  name: string;
  type: OfficeType;
  area: Area;
  main_skills: string[]; // 'Webデザイン', 'プログラミング' etc.
  features: string[];    // '在宅OK', '送迎あり' etc.
  is_client: boolean;    // リバーサル鹿児島フラグ
  tier: Tier;
  meta: {
    description: string;
    address: string;
    access_map_url?: string;
    cta_link: string;
    image_url: string; // 仮の画像パス
    opening_hours?: string;
    phone?: string;
  };
}
