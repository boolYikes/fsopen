import { useState, useEffect } from "react";
import diaryService from "./services/diary";
import type { Diary } from "./types";
import AddLogForm from "./components/AddLogForm";

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([]);

  useEffect(() => {
    const getAllDiaries = async () => {
      const allD = await diaryService.getInclusive();
      setDiaries(allD);
    };
    void getAllDiaries();
  }, []);

  const handleAdd = (diary: Diary) => {
    // *post service and validation to be added here*
    const newDiaries = diaries.concat(diary);
    setDiaries(newDiaries);
  };

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
      <AddLogForm entriesLength={diaries.length} handleAdd={handleAdd} />
    </div>
  );
}

export default App;
