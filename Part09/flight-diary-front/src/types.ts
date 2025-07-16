// export type Weather = "rainy" | "sunny" | "windy" | "cloudy";
// export type Visibility = "good" | "poor";

// can't use enum directly cuz of the 'erasable only' rule
export const WeatherEnum = {
  Sunny: "sunny",
  Rainy: "rainy",
  Cloudy: "cloudy",
  Stormy: "stormy",
  Windy: "windy",
};

export const VisibilityEnum = {
  Great: "great",
  Good: "good",
  Ok: "ok",
  Poor: "poor",
};

export type Weather = (typeof WeatherEnum)[keyof typeof WeatherEnum];
export type Visibility = (typeof VisibilityEnum)[keyof typeof VisibilityEnum];

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

// notification related
export const MessageTypeEnum = {
  Error: "error",
  Info: "info",
  Success: "success",
};
export type MessageType =
  (typeof MessageTypeEnum)[keyof typeof MessageTypeEnum];
export interface Notification {
  message: string;
  messageType: MessageType;
}

export type AddEntryResult =
  | { data: Diary; error?: undefined }
  | { data?: undefined; error: string };
