import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const search = async (req: Request, res: Response): Promise<void> => {
  const { query } = req.query;

  try {
    const tasks = await prisma.task.findMany({
      where: {
        OR: [
          {
            title: {
              contains: String(query),
              mode: 'insensitive',
            },
          },
          {
            description: {
              contains: String(query),
              mode: 'insensitive',
            },
          },
          {
            tags: {
              contains: String(query),
              mode: 'insensitive',
            },
          },
        ],
      },
    });

    const projects = await prisma.project.findMany({
      where: {
        OR: [
          {
            name: {
              contains: String(query),
              mode: 'insensitive',
            },
          },
          {
            description: {
              contains: String(query),
              mode: 'insensitive',
            },
          },
        ],
      },
    });

    const users = await prisma.user.findMany({
      where: {
        OR: [
          {
            username: {
              contains: String(query),
              mode: 'insensitive',
            },
          },
        ],
      },
    });

    res.status(200).json({ tasks, projects, users });
  } catch (error: any) {
    console.log(error);
    res
      .status(500)
      .json({ message: `Error performing search: ${error.message}` });
  }
};
