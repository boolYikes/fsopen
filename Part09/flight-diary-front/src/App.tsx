import { useState, useEffect } from "react";
import diaryService from "./services/diary";
import type { Diary } from "./types";

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([]);

  useEffect(() => {
    const getAllDiaries = async () => {
      const allD = await diaryService.getInclusive();
      setDiaries(allD);
    };
    void getAllDiaries();
  }, []);

  return (
    <div>
      <h1>Flight Log</h1>
      <table style={{ textAlign: "end" }}>
        <thead>
          <tr>
            <th>date</th>
            <th>visibility</th>
            <th>weather</th>
            <th>comment</th>
          </tr>
        </thead>
        <tbody>
          {diaries.map((diary) => {
            return (
              <tr key={diary.id}>
                <td>{diary.date}</td>
                <td>{diary.visibility}</td>
                <td>{diary.weather}</td>
                <td>{diary.comment}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
