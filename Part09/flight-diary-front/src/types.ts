export type Weather = "rainy" | "sunny" | "windy" | "cloudy";
export type Visibility = "good" | "poor";

export interface Diary {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment?: string;
}
