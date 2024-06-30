import { Project } from "@prisma/client";
import prisma from "../../../shared/prisma";

const createProjectFromDB = async (payload: Project): Promise<Project> => {
  return await prisma.project.create({
    data: payload,
  });
};

const GetAllProjectFromDB = async (): Promise<Project[]> => {
  return await prisma.project.findMany();
};

const getProjectById = async (id: string): Promise<Project | null> => {
  return await prisma.project.findUnique({
    where: { id },
  });
};

export const ProjectService = {
  createProjectFromDB,
  GetAllProjectFromDB,
  getProjectById,
};
