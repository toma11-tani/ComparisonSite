export type Area = 'Tenmonkan' | 'ChuoStation' | 'Other';
export type OfficeType = 'Transition' | 'B_Type';
export type Tier = 'Platinum' | 'Basic';
export type DeliveryModePreference = 'commute' | 'hybrid' | 'remote';
export type LocationPriority = 'station' | 'program' | 'balanced';
export type SupportIntensity = 'hands_on' | 'balanced' | 'self_paced';
export type ProgramFocus = 'office' | 'it_web' | 'practical' | 'life_rhythm';
export type TimelinePreference = 'steady' | 'standard' | 'fast';

export interface QuizAnswers {
  deliveryMode: DeliveryModePreference;
  locationPriority: LocationPriority;
  supportIntensity: SupportIntensity;
  programFocus: ProgramFocus;
  timeline: TimelinePreference;
}

export interface OfficeMatchingProfile {
  remoteSupport: 'none' | 'available' | 'strong';
  nearMajorStation: boolean;
  supportStyle: SupportIntensity;
  programStrengths: ProgramFocus[];
  paceFits: TimelinePreference[];
}

export interface Office {
  id: string;
  name: string;
  type: OfficeType;
  area: Area;
  support_benefits?: string[];
  job_programs?: string[];
  job_hunt_support?: string[];
  main_skills: string[]; // 'Webデザイン', 'プログラミング' etc.
  features: string[];    // '在宅OK', '送迎あり' etc.
  is_client: boolean;    // リバーサル鹿児島フラグ
  tier: Tier;
  meta: {
    description: string;
    address: string;
    nearest_station: string;
    walking_minutes?: number;
    access_map_url?: string;
    cta_link: string;
    image_url: string; // 仮の画像パス
    opening_hours?: string;
    phone?: string;
  };
  matching: OfficeMatchingProfile;
}
