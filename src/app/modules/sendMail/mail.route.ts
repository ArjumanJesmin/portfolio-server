import express from "express";
import { MailController } from "./mail.controller";

const router = express.Router();

router.post("/", MailController.handleSendEmail);

export const MailRoutes = router;
