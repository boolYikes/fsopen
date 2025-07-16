import React, { useState } from "react";
import type { Visibility, Weather, NewDiary } from "../types";
import { WeatherEnum, VisibilityEnum } from "../types";

interface FormProps {
  entriesLength: number;
  handleAdd: (diary: NewDiary) => void;
}

const AddLogForm = ({ handleAdd }: FormProps) => {
  const [date, setDate] = useState("");
  const [weather, setWeather] = useState<Weather>(WeatherEnum.Sunny);
  const [visibility, setVisibility] = useState<Visibility>(VisibilityEnum.Good);
  const [comment, setComment] = useState("");

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const newEntry: NewDiary = {
      date: date,
      weather: weather,
      visibility: visibility,
      comment: comment,
    };
    handleAdd(newEntry);
    setDate("");
    setWeather(WeatherEnum.Sunny);
    setVisibility(VisibilityEnum.Good);
    setComment("");
  };

  return (
    <form onSubmit={onSubmit}>
      <h3>Add log</h3>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <div className="weather-radio">
        {Object.values(WeatherEnum).map((forecast) => {
          return (
            // assume all forecast enums are unique...
            <label key={forecast}>
              <input
                type="radio"
                value={forecast}
                onChange={() => setWeather(forecast)}
                checked={weather === forecast}
              />
              {forecast}
            </label>
          );
        })}
      </div>
      <div className="vis-radio">
        {Object.values(VisibilityEnum).map((visStat) => {
          return (
            <label>
              <input
                type="radio"
                value={visStat}
                onChange={() => setVisibility(visStat)}
                checked={visibility === visStat}
              />
              {visStat}
            </label>
          );
        })}
      </div>
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button type="submit">add</button>
    </form>
  );
};

export default AddLogForm;
