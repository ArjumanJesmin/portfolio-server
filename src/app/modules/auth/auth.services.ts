import { Secret } from "jsonwebtoken";
import config from "../../../config";
import * as bcrypt from "bcrypt";

import prisma from "../../../shared/prisma";
import { jwtHelpers } from "../../../helpers/jwtHelpers";

const loginUser = async (payload: any) => {
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
  loginUser,
};
