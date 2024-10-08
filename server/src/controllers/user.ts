import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error: any) {
    console.log(error);
    res
      .status(500)
      .json({ message: `Error retrieving users: ${error.message}` });
  }
};

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const {
    username,
    cognitoId,
    profilePictureUrl = 'profile-test.jpeg',
    teamId = 1,
  } = req.body;

  const userAlreadyExists = await prisma.user.findFirst({
    where: {
      cognitoId,
    },
  });

  if (userAlreadyExists) {
    res.status(400).json({ message: 'User already exists' });
    return;
  }

  const newUser = prisma.user.create({
    data: {
      username,
      cognitoId,
      profilePictureUrl,
      teamId,
    },
  });

  res.status(201).json({
    message: 'User created successfully',
    user: newUser,
  });
};
