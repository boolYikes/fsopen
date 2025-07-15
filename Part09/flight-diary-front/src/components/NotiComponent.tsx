import { useState, useEffect } from "react";
import type { Notification } from "../types";

const NotiComponent = ({ message, messageType }: Notification) => {
  const [isVisible, setIsVisibile] = useState("none");

  useEffect(() => {
    if (message) {
      setIsVisibile("block");
    } else {
      setIsVisibile("none");
    }
  }, [message]);

  const colorSet = { backgroundColor: "", color: "" };
  switch (messageType) {
    case "error":
      colorSet.color = "red";
      colorSet.backgroundColor = "salmon";
      break;
    case "info":
      colorSet.color = "black";
      colorSet.backgroundColor = "skyblue";
      break;
    case "success":
      colorSet.color = "black";
      colorSet.backgroundColor = "limegreen";
  }

  return <p style={{ ...colorSet, display: isVisible }}>{message}</p>;
};

export default NotiComponent;
