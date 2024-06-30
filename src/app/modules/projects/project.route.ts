import express from "express";
import { ProjectController } from "./project.controller";

const router = express.Router();

router.post("/", ProjectController.createProjectFromDB);
router.get("/", ProjectController.GetAllProjectFromDB);
router.get("/:id", ProjectController.getProjectById);

export const ProjectRoutes = router;
