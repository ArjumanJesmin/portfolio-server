import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { MailService } from "./mail.service";

const handleSendEmail = catchAsync(async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { to, subject, message } = req.body;

  if (!to || !subject || !message) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const result = await MailService.handleSendEmail(to, subject, message);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Email sent successfully",
    data: result,
  });
});

export const MailController = {
  handleSendEmail,
};
