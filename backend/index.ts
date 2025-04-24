import { Request, Response } from "express";
import express from "express";
import cors from "cors";
require("dotenv").config();
const app = express();
const routes = require("./src/routes/routes");
const { dbConnect } = require("./src/config/database");
const cookieParser = require("cookie-parser");
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ extended: true, limit: '30mb' }));
app.use(routes);

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("<h1>Hi i am a server</h1>");
});

app.listen(process.env.PORT, () => {
  console.log("server is running at ", process.env.PORT);
  dbConnect();
});
