export type Area = 'Tenmonkan' | 'ChuoStation' | 'Other';
export type OfficeType = 'Transition' | 'B_Type';
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

export interface Office {
  id: string;
  name: string;
  type: OfficeType;
  area: Area;
  support_benefits?: string[];
  job_programs?: string[];
  job_hunt_support?: string[];
  main_skills: string[];
  features: string[];
  is_client: boolean;
  meta: {
    description: string;
    address: string;
    nearest_station: string;
    walking_minutes?: number;
    access_map_url?: string;
    cta_link: string;
    image_url: string;
    opening_hours?: string;
    phone?: string;
  };
}
