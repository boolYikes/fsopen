export type Weather = "rainy" | "sunny" | "windy" | "cloudy";
export type Visibility = "good" | "poor";

export interface Diary {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment?: string;
}

export type NewDiary = Omit<Diary, "id">;

export interface ValidationError {
  message: string;
  errors: Record<string, string[]>;
}

export type MessageType = "error" | "info" | "success";
export interface Notification {
  message: string;
  messageType: MessageType;
}

export type AddEntryResult =
  | { data: Diary; error?: undefined }
  | { data?: undefined; error: string };
