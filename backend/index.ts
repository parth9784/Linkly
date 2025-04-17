import { Request, Response } from "express";

require("dotenv").config();
const express = require("express");
const app = express();

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("<h1>Hi i am a server</h1>");
});

app.listen(process.env.PORT, () => {
  console.log("server is running at ", process.env.PORT);
});
