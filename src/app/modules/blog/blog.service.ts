import { Blog, Project } from "@prisma/client";
import prisma from "../../../shared/prisma";

const createBlogFromDB = async (payload: Blog): Promise<Blog> => {
  return await prisma.blog.create({
    data: payload,
  });
};

const GetAllBlogFromDB = async (): Promise<Blog[]> => {
  return await prisma.blog.findMany();
};

export const BlogService = {
  createBlogFromDB,
  GetAllBlogFromDB,
};
