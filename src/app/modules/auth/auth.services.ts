import { Secret } from "jsonwebtoken";
import * as bcrypt from "bcrypt";

import prisma from "../../../shared/prisma";
import { hashedPassword } from "../../../helpers/hashPasswordHelper";
import { Admin } from "@prisma/client";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import config from "../../../config";
import { ILoginUser } from "./auth.interface";

const createAdmin = async (payload: Admin): Promise<Admin> => {
  const { name, email, password } = payload;

  // Hash the password before storing it
  const hashPassword = await hashedPassword(payload.password);

  const existingUser = await prisma.admin.findFirst({
    where: {
      OR: [{ email }, { name }],
    },
  });

  if (existingUser) {
    throw new Error("User with the same email or username already exists");
  }

  // Create the admin within a transaction
  const result = await prisma.admin.create({
    data: {
      name,
      email,
      password: hashPassword,
    },
    select: {
      id: true,
      name: true,
      email: true,
      password: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return result;
};

const loginUser = async (payload: ILoginUser) => {
  const userData = await prisma.admin.findFirstOrThrow({
    where: {
      email: payload.email,
    },
  });

  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.password,
    userData.password
  );

  if (!isCorrectPassword) {
    throw new Error("Password Incorrect!");
  }

  const accessToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      userId: userData.id,
    },
    config.jwt.jwt_secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken,
  };
};

export const AuthService = {
  createAdmin,
  loginUser,
};
