
export interface Game {
  id: string;
  title: string;
  description: string | null;
  download_count: number;
  file_path: string | null;
  trial_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface GameFormData {
  title: string;
  description: string;
  trial_url: string;
}
