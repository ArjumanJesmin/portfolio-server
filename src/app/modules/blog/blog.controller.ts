import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { BlogService } from "./blog.service";

const createBlogFromDB = catchAsync(async (req, res) => {
  const result = await BlogService.createBlogFromDB(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Blog created successfully !",
    data: result,
  });
});
const GetAllBlogFromDB = catchAsync(async (req, res) => {
  const result = await BlogService.GetAllBlogFromDB();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Get All Blog successfully !",
    data: result,
  });
});

export const BlogController = {
  createBlogFromDB,
  GetAllBlogFromDB,
};
