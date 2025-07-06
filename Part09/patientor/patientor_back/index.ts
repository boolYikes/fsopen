import express from "express";
const app = express();
app.use(express.json());

const PORT = 3000;

app.get("/api/ping", (_req, res) => {
  console.log("pingpingping");
  res.send("pongpongpong");
});

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
