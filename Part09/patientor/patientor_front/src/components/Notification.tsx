import { Box, Typography } from "@mui/material";

const Notification = ({
  message,
}: {
  message: { type: string; message: string };
}) => {
  if (!message.type || !message.message) {
    return <div></div>;
  }
  const style = { color: "red", backgroundColor: "salmon" };
  switch (message.type) {
    case "error":
      style.color = "red";
      style.backgroundColor = "pink";
      break;
    case "success":
      style.color = "green";
      style.backgroundColor = "lightgreen";
  }

  return (
    <Box sx={style}>
      <Typography>{message.message}</Typography>
    </Box>
  );
};

export default Notification;
