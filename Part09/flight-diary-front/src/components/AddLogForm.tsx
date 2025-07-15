import React, { useState } from "react";
import type { Diary, Visibility, Weather, NewDiary } from "../types";
interface FormProps {
  entriesLength: number;
  handleAdd: (diary: NewDiary) => void;
}

const AddLogForm = ({ handleAdd }: FormProps) => {
  const [date, setDate] = useState("");
  const [weather, setWeather] = useState<Weather>("sunny");
  const [visibility, setVisibility] = useState<Visibility>("good");
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
    setWeather("sunny");
    setVisibility("good");
    setComment("");
  };

  return (
    <form onSubmit={onSubmit}>
      <h3>Add log</h3>
      <input
        type="text"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <div className="weather-radio">
        <label>
          <input
            type="radio"
            value="rainy"
            onChange={() => setWeather("rainy")}
            checked={weather === "rainy"}
          />
          rainy
        </label>
        <label>
          <input
            type="radio"
            value="sunny"
            onChange={() => setWeather("sunny")}
            checked={weather === "sunny"}
          />
          sunny
        </label>
        <label>
          <input
            type="radio"
            value="windy"
            onChange={() => setWeather("windy")}
            checked={weather === "windy"}
          />
          windy
        </label>
        <label>
          <input
            type="radio"
            value="cloudy"
            onChange={() => setWeather("cloudy")}
            checked={weather === "cloudy"}
          />
          cloudy
        </label>
      </div>
      <div className="vis-radio">
        <label>
          <input
            type="radio"
            value="good"
            onChange={() => setVisibility("good")}
            checked={visibility === "good"}
          />
          good
        </label>
        <label>
          <input
            type="radio"
            value="poor"
            onChange={() => setVisibility("poor")}
            checked={visibility === "poor"}
          />
          poor
        </label>
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
