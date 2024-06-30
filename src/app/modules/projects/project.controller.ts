import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { ProjectService } from "./project.service";

const createProjectFromDB = catchAsync(async (req, res) => {
  const result = await ProjectService.createProjectFromDB(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Project created successfully !",
    data: result,
  });
});
const GetAllProjectFromDB = catchAsync(async (req, res) => {
  const result = await ProjectService.GetAllProjectFromDB();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Get All Project successfully !",
    data: result,
  });
});

const getProjectById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ProjectService.getProjectById(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Get Project By Id successfully !",
    data: result,
  });
});

export const ProjectController = {
  createProjectFromDB,
  GetAllProjectFromDB,
  getProjectById,
};
