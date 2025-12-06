import express from "express";
import { Request, Response } from "express";
import { routes } from "./routes";
import cookieParser from "cookie-parser";
import { envVars } from "./app/config/env";
import cors from "cors";
import { notFound } from "./app/middleware/notFound";
import { globalErrorHandler } from "./app/middleware/globalErrorHandler";
export const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "https://course-master-frontend-five.vercel.app",
    credentials: true,
  })
);

app.use("/api/v1", routes);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Course Master Backend");
});

app.use(globalErrorHandler);
app.use(notFound);
