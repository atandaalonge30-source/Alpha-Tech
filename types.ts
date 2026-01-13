
export interface ServiceItem {
  id: string;
  title: string;
  icon?: string;
}

export interface TrainingProgram {
  id: string;
  title: string;
  status: 'active' | 'coming_soon';
  description: string;
}
