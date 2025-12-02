import express from "express";
import { Request, Response } from "express";
export const app = express();

app.use(express.json());

// app.use("/api/v1", routes);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Course Master Backend");
});
