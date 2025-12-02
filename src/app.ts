import express from "express";
import { Request, Response } from "express";
import { routes } from "./routes";
import cookieParser from "cookie-parser";
import { envVars } from "./app/config/env";
import cors from "cors";
export const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin:
      envVars.NODE_ENV === "development"
        ? "http://localhost:3000"
        : envVars.FRONTEND_URL,
    credentials: true,
  })
);

app.use("/api/v1", routes);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Course Master Backend");
});
