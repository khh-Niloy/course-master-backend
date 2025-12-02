import { Response } from "express";
import { envVars } from "../config/env";

export const setCookie = (
  res: Response,
  accessToken?: string,
  refreshToken?: string
) => {
  if (accessToken) {
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: envVars.NODE_ENV === "production",
      sameSite: "none"
    });
  }

  if (refreshToken) {
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: envVars.NODE_ENV === "production",
      sameSite: "none"
    });
  }
};

export const clearCookie = (res: Response) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
  });
  res.clearCookie("accessToken", {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
  });
};

export const cookiesManagement = {
  setCookie,
  clearCookie,
}

