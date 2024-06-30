import { Request, Response } from "express";

import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { ILoginUserResponse } from "./auth.interface";
import { AuthService } from "./auth.services";
import httpStatus from "http-status";

const createAdmin = catchAsync(async (req, res) => {
  const result = await AuthService.createAdmin(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin created successfully!",
    data: result,
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.loginUser(req.body);
  sendResponse<ILoginUserResponse>(res, {
    statusCode: 200,
    success: true,
    message: "User logged in successfully !",
    data: {
      accessToken: result.accessToken,
    },
  });
});

export const AuthController = {
  createAdmin,
  loginUser,
};
