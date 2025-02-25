import express from "express";
import { AuthRoutes } from "../modules/auth/auth.routes";
import { ProjectRoutes } from "../modules/projects/project.route";
import { BlogRoutes } from "../modules/blog/blog.route";
import { MailRoutes } from "../modules/sendMail/mail.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/project",
    route: ProjectRoutes,
  },
  {
    path: "/blog",
    route: BlogRoutes,
  },
  {
    path: "/mail",
    route: MailRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
