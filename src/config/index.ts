import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  bycrypt_salt_rounds: process.env.SALT_ROUND,
  jwt: {
    jwt_secret: process.env.JWT_SECRET,
    expires_in: process.env.EXPIRES_IN,
  },
  mail: {
    email_host: process.env.EMAIL_HOST,
    email_user: process.env.EMAIL_USER,
    email_pass: process.env.EMAIL_PASS,
  },
};
