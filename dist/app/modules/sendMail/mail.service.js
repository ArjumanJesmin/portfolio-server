"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const config_1 = __importDefault(require("../../../config"));
const handleSendEmail = (to, subject, message, html) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = nodemailer_1.default.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: config_1.default.mail.email_user,
            pass: config_1.default.mail.email_pass,
        },
    });
    console.log(transporter);
    const mailOptions = {
        from: `"Your Name 👻"config.mail.email_user`,
        to,
        subject,
        text: message,
    };
    console.log(mailOptions);
    try {
        const info = yield transporter.sendMail(mailOptions);
        console.log("Email sent: " + info.response);
        yield prisma_1.default.emailLog.create({
            data: {
                to,
                subject,
                message,
            },
        });
        return { success: true };
    }
    catch (error) {
        console.error("Error sending email:", error);
        return { success: false, error: error.message };
    }
});
const sendEmailExample = () => __awaiter(void 0, void 0, void 0, function* () {
    const to = "recipient@example.com";
    const subject = "Hello ✔";
    const text = "Hello world?"; // Plain text body
    const html = "<b>Hello world?</b>"; // HTML body
    const result = yield exports.MailService.handleSendEmail(to, subject, text, html);
    console.log("Email sent:", result);
});
exports.MailService = {
    handleSendEmail,
};
