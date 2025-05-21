
export interface Game {
  id: string;
  title: string;
  description: string | null;
  download_count: number;
  file_path: string | null;
  trial_url: string | null;
  thumbnail_path?: string | null;
  thumbnailUrl?: string | null; // Client-side URL for display
  created_at: string;
  updated_at: string;
}

export interface GameFormData {
  title: string;
  description: string;
  trial_url: string;
}

export interface UserGameHistory {
  id: string;
  user_id: string;
  game_id: string;
  played_trial_at: string | null;
  downloaded_at: string | null;
  last_action: 'download' | 'play_trial'; 
  created_at: string;
  updated_at: string;
}
