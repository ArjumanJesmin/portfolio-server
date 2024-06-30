import express from "express";
import { BlogController } from "./blog.controller";

const router = express.Router();

router.post("/", BlogController.createBlogFromDB);
router.get("/", BlogController.GetAllBlogFromDB);

export const BlogRoutes = router;
