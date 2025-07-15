import { useState, useEffect } from "react";
import diaryService from "./services/diaryService";
import type { Diary, NewDiary, Notification } from "./types";
import AddLogForm from "./components/AddLogForm";
import NotiComponent from "./components/NotiComponent";

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [notification, setNotification] = useState<Notification>({
    message: "",
    messageType: "success",
  });

  useEffect(() => {
    const getAllDiaries = async () => {
      const allD = await diaryService.getInclusive();
      setDiaries(allD);
    };
    void getAllDiaries();
  }, []);

  const handleAdd = async (diary: NewDiary) => {
    const result = await diaryService.addEntry(diary);
    const messagePayload: Notification = notification;

    if (result.data) {
      const newDiaries = diaries.concat(result.data);
      setDiaries(newDiaries);
      messagePayload.message = "Successfully added an entry";
      setNotification(messagePayload);
      setTimeout(() => {
        setNotification({ message: "", messageType: "success" });
      }, 5000);
    } else if (result.error) {
      setNotification({ message: result.error, messageType: "error" });
      setTimeout(() => {
        setNotification({ message: "", messageType: "success" });
      }, 5000);
    }
  };

  return (
    <div>
      <h1>Flight Log</h1>
      <NotiComponent
        message={notification.message}
        messageType={notification.messageType}
      />
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
